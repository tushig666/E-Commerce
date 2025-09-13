'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductDialog } from './ProductDialog';
import { DeleteProductDialog } from './DeleteProductDialog';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { saveProduct, deleteProduct } from '../_actions/product-actions';

interface ProductsDataTableProps {
  initialProducts: Product[];
}

export function ProductsDataTable({ initialProducts }: ProductsDataTableProps) {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenDialog = (product: Product | null) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Delay resetting to allow for closing animation
      setTimeout(() => setSelectedProduct(null), 150);
    }
  };

  const handleSaveProduct = async (formData: FormData) => {
    const isEditing = !!formData.get('id');
    const result = await saveProduct(formData);

    if (result.success && result.product) {
      const savedProduct = result.product;
      setProducts(prev => {
        if (isEditing) {
          return prev.map(p => p.id === savedProduct.id ? savedProduct : p);
        }
        return [savedProduct, ...prev];
      });
      toast({ title: 'Success', description: `Product ${isEditing ? 'updated' : 'added'} successfully.` });
      handleDialogClose(false);
    }
    // Error is handled inside the dialog via toast
    return result;
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    const result = await deleteProduct(selectedProduct.id);

    if (result.success) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      toast({ title: 'Success', description: 'Product deleted successfully.' });
      setIsDeleteDialogOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error deleting product',
        description: result.error,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => handleOpenDialog(null)}>
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
                      <DropdownMenuItem onSelect={() => handleOpenDialog(product)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleOpenDeleteDialog(product)} className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
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
        onOpenChange={handleDialogClose}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
      
      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={(isOpen) => {
            setIsDeleteDialogOpen(isOpen);
            if (!isOpen) {
                setTimeout(() => setSelectedProduct(null), 150);
            }
        }}
        onConfirm={handleDeleteConfirm}
        productName={selectedProduct?.name}
      />
    </>
  );
}
