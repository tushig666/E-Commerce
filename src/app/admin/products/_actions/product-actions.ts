'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Product } from '@/lib/types';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
});

async function uploadImages(images: File[]): Promise<string[]> {
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
    for (const url of imageUrls) {
        if (!url || typeof url !== 'string' || !url.startsWith('https://firebasestorage.googleapis.com')) continue;
        try {
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
        } catch (error: any) {
            // It's okay if the object doesn't exist, it might have been already deleted.
            if (error.code !== 'storage/object-not-found') {
                console.error(`Failed to delete image: ${url}`, error);
            }
        }
    }
}

export async function addProduct(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validation = productSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors };
  }

  const images = formData.getAll('images') as File[];
  if (images.length === 0 || images.every(f => f.size === 0)) {
      return { success: false, error: { images: ['At least one image is required.'] } };
  }
  
  try {
    const imageUrls = await uploadImages(images.filter(f => f.size > 0));

    const newProduct = {
      ...validation.data,
      images: imageUrls,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'products'), newProduct);

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
    
    // Convert Timestamp to a serializable format (ISO string) for the client
    const productForClient: Product = {
      ...validation.data,
      id: docRef.id,
      images: imageUrls,
      createdAt: newProduct.createdAt.toDate().toISOString(),
    };
    
    return { success: true, product: productForClient };
  } catch (e: any) {
    console.error("Error in addProduct:", e);
    return { success: false, error: { _form: [e.message || 'An unknown server error occurred.'] } };
  }
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) {
    return { success: false, error: { _form: ['Product ID is missing.'] } };
  }

  const rawData = Object.fromEntries(formData);
  const validation = productSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors };
  }
  
  const newImageFiles = formData.getAll('images').filter(f => f instanceof File && f.size > 0) as File[];
  const existingImageUrls = formData.getAll('existingImages').filter(f => typeof f === 'string') as string[];

  if (existingImageUrls.length === 0 && newImageFiles.length === 0) {
    return { success: false, error: { images: ['At least one image is required.'] }};
  }

  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);
    if (!productSnap.exists()) {
        return { success: false, error: { _form: ['Product not found.'] } };
    }
    const originalProduct = productSnap.data();
    const originalImages = originalProduct.images || [];

    const imagesToDelete = originalImages.filter((url: string) => !existingImageUrls.includes(url));
    await deleteImages(imagesToDelete);

    const newImageUrls = await uploadImages(newImageFiles);
    const finalImageUrls = [...existingImageUrls, ...newImageUrls];
    
    const updatedData = { 
        ...validation.data, 
        images: finalImageUrls,
        createdAt: originalProduct.createdAt,
    };
    await updateDoc(productRef, updatedData);

    revalidatePath('/admin/products');
    revalidatePath(`/products/${id}`);
    revalidatePath('/products');
    revalidatePath('/');
        
    const productForClient: Product = {
      ...validation.data,
      id,
      images: finalImageUrls,
      createdAt: (originalProduct.createdAt as Timestamp).toDate().toISOString(),
    };

    return { success: true, product: productForClient };
  } catch (e: any)
   {
    console.error("Error in updateProduct:", e);
    return { success: false, error: { _form: [e.message || 'An unknown server error occurred.'] } };
  }
}

export async function deleteProduct(id: string) {
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
