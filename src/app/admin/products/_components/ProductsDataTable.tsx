'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductDialog } from './ProductDialog';
import { DeleteProductDialog } from './DeleteProductDialog';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { addProduct, updateProduct, deleteProduct } from '../_actions/product-actions';

export function ProductsDataTable({ initialProducts }: { initialProducts: Product[] }) {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const handleSaveChanges = async (productData: FormData) => {
    const action = editingProduct ? updateProduct : addProduct;
    if (editingProduct) {
        productData.append('id', editingProduct.id);
    }
    const result = await action(productData);

    if (result.success && result.product) {
      if (editingProduct) {
        setProducts(products.map(p => (p.id === result.product!.id ? result.product! : p)));
        toast({ title: 'Success', description: 'Product updated successfully.' });
      } else {
        setProducts([result.product!, ...products]);
        toast({ title: 'Success', description: 'Product added successfully.' });
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
    } else {
       const errorMsg = typeof result.error === 'string' 
        ? result.error 
        : (result.error && Object.values(result.error as any).flat().join(', '));
        
      toast({
        variant: 'destructive',
        title: 'Error saving product',
        description: errorMsg || 'An unknown error occurred.',
      });
    }
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;

    const result = await deleteProduct(deletingProduct.id);

    if (result.success) {
      setProducts(products.filter(p => p.id !== deletingProduct.id));
      toast({ title: 'Success', description: 'Product deleted successfully.' });
      setIsDeleteDialogOpen(false);
      setDeletingProduct(null);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error deleting product',
        description: result.error,
      });
    }
  };

  const openDialogForEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };
  
  const openDialogForAdd = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };
  
  const openDeleteDialog = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={openDialogForAdd}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Product
        </Button>
      </div>

      <div className="mt-6 rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    alt={product.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.images[0] || '/placeholder.svg'}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => openDialogForEdit(product)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => openDeleteDialog(product)} className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <ProductDialog
        isOpen={isDialogOpen}
        onOpenChange={(isOpen) => {
          if (!isDialogOpen) return;
          setIsDialogOpen(isOpen);
          if (!isOpen) {
             setTimeout(() => {
                setEditingProduct(null);
            }, 500);
          }
        }}
        onSave={handleSaveChanges}
        product={editingProduct}
      />
      
      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        productName={deletingProduct?.name}
      />
    </>
  );
}
