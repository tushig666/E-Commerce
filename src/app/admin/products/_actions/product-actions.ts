'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
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
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'products'), newProduct);

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
    
    return { success: true, product: { ...newProduct, id: docRef.id, createdAt: newProduct.createdAt.toISOString() } as unknown as Product };
  } catch (e: any) {
    return { success: false, error: { general: [e.message] } };
  }
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) {
    return { success: false, error: { general: ['Product ID is missing.'] } };
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
        return { success: false, error: { general: ['Product not found.'] } };
    }
    const originalProduct = productSnap.data();
    const originalImages = originalProduct.images || [];

    // Identify images to delete
    const imagesToDelete = originalImages.filter((url: string) => !existingImageUrls.includes(url));
    if (imagesToDelete.length > 0) {
      await deleteImages(imagesToDelete);
    }

    let newImageUrls: string[] = [];
    if (newImageFiles.length > 0) {
        newImageUrls = await uploadImages(newImageFiles);
    }
    
    const finalImageUrls = [...existingImageUrls, ...newImageUrls];
    
    const updatedData = { ...validation.data, images: finalImageUrls };
    await updateDoc(productRef, updatedData);

    revalidatePath('/admin/products');
    revalidatePath(`/products/${id}`);
    revalidatePath('/products');
    revalidatePath('/');
    
    const createdAt = originalProduct.createdAt;
    
    return { success: true, product: { ...updatedData, id, createdAt: createdAt.toDate().toISOString() } as unknown as Product };
  } catch (e: any) {
    return { success: false, error: { general: [e.message] } };
  }
}

export async function deleteProduct(id: string) {
  if (!id) {
    return { success: false, error: 'Product ID is missing.' };
  }
  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      // If product doesn't exist, it might be already deleted.
      // Revalidate paths and return success to update UI.
      revalidatePath('/admin/products');
      revalidatePath('/products');
      revalidatePath('/');
      return { success: true };
    }

    const productData = productSnap.data();
    if (productData.images && productData.images.length > 0) {
      await deleteImages(productData.images);
    }
    
    await deleteDoc(productRef);

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
