import { db } from './firebase';
import { collection, getDocs, doc, getDoc, orderBy, query } from 'firebase/firestore';
import type { Product } from './types';
import { staticProducts } from './products'; // Fallback data

export async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, orderBy('createdAt', 'desc'));
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    return productList.length > 0 ? productList : staticProducts;
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
      return { id: productSnap.id, ...productSnap.data() } as Product;
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
