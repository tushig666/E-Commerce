import { db } from './firebase';
import { collection, getDocs, doc, getDoc, orderBy, query, Timestamp, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import type { Product } from './types';
import { staticProducts } from './products'; // Fallback data

export function mapDocToProduct(doc: DocumentSnapshot<DocumentData>): Product {
    const data = doc.data();
    if (!data) {
        // This case should ideally not be hit if we check exists() before calling
        throw new Error(`Document data is empty for doc ID: ${doc.id}`);
    }

    // Convert Firestore Timestamps to ISO strings, handling cases where they might be missing.
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : null;
    const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : null;

    return {
        id: doc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images || [],
        category: data.category,
        createdAt: createdAt,
        updatedAt: updatedAt,
    };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, orderBy('createdAt', 'desc'));
    const productSnapshot = await getDocs(q);

    const firestoreProducts = productSnapshot.docs.map(mapDocToProduct);

    // If there are very few products in Firestore, merge with static products
    // to make the store look populated initially.
    if (firestoreProducts.length < 10) {
      const firestoreProductIds = new Set(firestoreProducts.map(p => p.id));
      const additionalStaticProducts = staticProducts.filter(
        p => !firestoreProductIds.has(p.id)
      );
      // Prioritize products from Firestore by putting them first
      return [...firestoreProducts, ...additionalStaticProducts];
    }
    
    return firestoreProducts;

  } catch (error) {
    console.error("Error fetching products from Firestore, returning static data: ", error);
     return staticProducts;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return mapDocToProduct(productSnap);
    } else {
      console.warn(`Product with id ${id} not found in Firestore. Falling back to static data.`);
      // Fallback to static data if not found in Firestore
      const staticProduct = staticProducts.find(p => p.id === id);
       if (staticProduct) {
        return staticProduct;
      }
      console.warn(`Product with id ${id} also not found in static data.`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product ${id}, falling back to static data: `, error);
    const staticProduct = staticProducts.find(p => p.id === id);
    if (staticProduct) {
        return staticProduct;
    }
    return null;
  }
}
