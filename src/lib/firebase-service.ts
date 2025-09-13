import { db } from './firebase';
import { collection, getDocs, doc, getDoc, orderBy, query, Timestamp } from 'firebase/firestore';
import type { Product } from './types';
import { staticProducts } from './products'; // Fallback data

function mapDocToProduct(doc: any): Product {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to ISO string for client-side consumption
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
    } as Product;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, orderBy('createdAt', 'desc'));
    const productSnapshot = await getDocs(q);

    if (productSnapshot.empty) {
        console.warn("No products found in Firestore, returning static data.");
        return staticProducts;
    }
    
    const productList = productSnapshot.docs.map(mapDocToProduct);
    return productList;
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
      console.warn(`Product with id ${id} not found in Firestore.`);
      // Fallback to static data if not found in Firestore
      const staticProduct = staticProducts.find(p => p.id === id);
      return staticProduct || null;
    }
  } catch (error) {
    console.error(`Error fetching product ${id}, returning static data: `, error);
    const staticProduct = staticProducts.find(p => p.id === id);
    return staticProduct || null;
  }
}
