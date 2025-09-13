'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc, Timestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Product } from '@/lib/types';
import { mapDocToProduct } from '@/lib/firebase-service';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
});

async function uploadImages(images: File[]): Promise<string[]> {
  const imageUrls: string[] = [];
  for (const image of images) {
    // This check is important, although client-side filtering should also happen.
    if (image.size === 0) continue;
    const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    imageUrls.push(url);
  }
  return imageUrls;
}

async function deleteImages(imageUrls: string[]) {
    if (!imageUrls || imageUrls.length === 0) return;

    const deletePromises = imageUrls.map(async (url) => {
        // A more robust check for valid Firebase Storage URLs
        if (!url || typeof url !== 'string' || !url.startsWith('https://firebasestorage.googleapis.com')) {
            console.warn(`Skipping invalid or non-firebase URL for deletion: ${url}`);
            return;
        }
        try {
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
        } catch (error: any) {
            // It's common to try deleting an image that's already gone.
            // We log other errors but don't re-throw, to not fail the whole operation.
            if (error.code !== 'storage/object-not-found') {
                console.error(`Failed to delete image at ${url}:`, error);
            }
        }
    });

    await Promise.allSettled(deletePromises);
}

// Unified function for adding and updating
export async function saveProduct(formData: FormData) {
  const id = formData.get('id') as string | null;
  const rawData = Object.fromEntries(formData);
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
    let finalProductId = id;
    const productDataForDb: any = {
      ...validation.data,
      updatedAt: Timestamp.now(), // Add/update timestamp
    };
    
    // Handle image updates
    const newImageUrls = await uploadImages(newImageFiles);
    productDataForDb.images = [...existingImageUrls, ...newImageUrls];

    if (id) {
        // UPDATE existing product
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);
        const originalImages = productSnap.exists() ? productSnap.data().images || [] : [];
        
        const imagesToDelete = originalImages.filter((url: string) => !existingImageUrls.includes(url));
        await deleteImages(imagesToDelete);

        await updateDoc(productRef, productDataForDb);

    } else {
        // ADD new product
        productDataForDb.createdAt = Timestamp.now();
        const docRef = await addDoc(collection(db, 'products'), productDataForDb);
        finalProductId = docRef.id;
    }

    if (!finalProductId) {
        throw new Error("Could not determine product ID after save operation.");
    }
    
    // Re-fetch the saved product to ensure we have the latest, properly formatted data
    const savedProductSnap = await getDoc(doc(db, 'products', finalProductId));
    if (!savedProductSnap.exists()) {
        throw new Error('Failed to fetch the product after saving.');
    }
    const savedProduct = mapDocToProduct(savedProductSnap);

    // Revalidate paths
    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath(`/products/${finalProductId}`);
    revalidatePath('/');
    
    return { success: true, product: savedProduct };

  } catch (e: any) {
    console.error("Error in saveProduct:", e);
    // Return a generic error message to the client
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
      await deleteImages(productData.images || []);
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
