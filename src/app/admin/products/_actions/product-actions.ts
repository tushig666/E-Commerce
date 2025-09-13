'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
});

async function uploadImages(images: File[]): Promise<string[]> {
  if (!storage) return [];
  const imageUrls: string[] = [];
  for (const image of images) {
    if (image.size === 0) continue;
    const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    imageUrls.push(url);
  }
  return imageUrls;
}

async function deleteImages(imageUrls: string[]) {
    if (!storage || !imageUrls || imageUrls.length === 0) return;

    const deletePromises = imageUrls.map(async (url) => {
        if (!url || typeof url !== 'string' || !url.startsWith('https://firebasestorage.googleapis.com')) {
            console.warn(`Skipping invalid or non-firebase URL for deletion: ${url}`);
            return;
        }
        try {
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
        } catch (error: any) {
            // storage/object-not-found is a common error if the image was already deleted, so we can safely ignore it.
            if (error.code !== 'storage/object-not-found') {
                console.error(`Failed to delete image at ${url}:`, error);
            }
        }
    });

    await Promise.allSettled(deletePromises);
}

export async function saveProduct(formData: FormData): Promise<{ success: boolean; error?: any; }> {
  if (!db || !storage) {
    return { success: false, error: { _form: ['Firebase is not configured.'] } };
  }
  const id = formData.get('id') as string | null;
  
  const rawData: { [k: string]: any } = {};
  formData.forEach((value, key) => {
    if (key !== 'id' && key !== 'images' && key !== 'existingImages') {
      rawData[key] = value;
    }
  });

  const validation = productSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors };
  }

  const newImageFiles = formData.getAll('images').filter(f => f instanceof File && f.size > 0) as File[];
  const existingImageUrls = formData.getAll('existingImages').filter(f => typeof f === 'string') as string[];
  
  if (existingImageUrls.length === 0 && newImageFiles.length === 0) {
    return { success: false, error: { _form: ['At least one image is required.'] } };
  }

  try {
    const newImageUrls = await uploadImages(newImageFiles);
    
    const productDataForDb: any = {
      ...validation.data,
      images: [...existingImageUrls, ...newImageUrls],
      updatedAt: Timestamp.now(),
    };

    if (id) {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            const originalImages = productSnap.data().images || [];
            const imagesToDelete = originalImages.filter((url: string) => !existingImageUrls.includes(url));
            if (imagesToDelete.length > 0) {
              await deleteImages(imagesToDelete);
            }
        }
        await updateDoc(productRef, productDataForDb);
    } else {
        productDataForDb.createdAt = Timestamp.now();
        await addDoc(collection(db, 'products'), productDataForDb);
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
    if (id) revalidatePath(`/products/${id}`);
    revalidatePath('/');
    
    return { success: true };

  } catch (e: any) {
    console.error("Error in saveProduct:", e);
    return { success: false, error: { _form: [e.message || 'An unknown server error occurred.'] } };
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string; }> {
  if (!db) {
    return { success: false, error: 'Firebase is not configured.' };
  }
  if (!id) {
    return { success: false, error: 'Product ID is missing.' };
  }
  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      if (productData.images && productData.images.length > 0) {
        await deleteImages(productData.images);
      }
      await deleteDoc(productRef);
    } else {
        console.warn(`Attempted to delete a product that does not exist in Firestore: ${id}`);
    }
    
    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
    
    return { success: true };
  } catch (e: any) {
    console.error("Error in deleteProduct:", e);
    return { success: false, error: e.message || 'An unknown server error occurred.' };
  }
}
