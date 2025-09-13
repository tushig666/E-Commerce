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
    const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    imageUrls.push(url);
  }
  return imageUrls;
}

async function deleteImages(imageUrls: string[]) {
    for (const url of imageUrls) {
        try {
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
        } catch (error: any) {
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
  if (images.length === 0 || images[0].size === 0) {
      return { success: false, error: { images: ['At least one image is required.'] } };
  }
  
  try {
    const imageUrls = await uploadImages(images);

    const newProduct = {
      ...validation.data,
      images: imageUrls,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'products'), newProduct);

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
    
    return { success: true, product: { ...newProduct, id: docRef.id } as Product };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) {
    return { success: false, error: 'Product ID is missing.' };
  }

  const rawData = Object.fromEntries(formData);
  const validation = productSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors };
  }
  
  const newImages = formData.getAll('images').filter(f => f instanceof File && f.size > 0) as File[];
  const existingImages = formData.getAll('existingImages').filter(f => typeof f === 'string') as string[];

  if (existingImages.length === 0 && newImages.length === 0) {
    return { success: false, error: { images: ['At least one image is required.'] }};
  }

  try {
    let imageUrls: string[] = existingImages;
    if (newImages.length > 0) {
        const newImageUrls = await uploadImages(newImages);
        imageUrls = [...imageUrls, ...newImageUrls];
    }
    
    const productRef = doc(db, 'products', id);
    const updatedData = { ...validation.data, images: imageUrls };
    await updateDoc(productRef, updatedData);

    revalidatePath('/admin/products');
    revalidatePath(`/products/${id}`);
    revalidatePath('/products');
    revalidatePath('/');
    
    return { success: true, product: { ...updatedData, id } as Product };
  } catch (e: any) {
    return { success: false, error: e.message };
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
      return { success: false, error: 'Product not found.' };
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
