'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, X } from 'lucide-react';
import type { Product } from '@/lib/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  images: z.any(), // We'll handle image validation manually
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: FormData) => Promise<void>;
  product: Product | null;
}

export function ProductDialog({ isOpen, onOpenChange, onSave, product }: ProductDialogProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      images: undefined,
    },
  });
  const { formState: { isSubmitting }, setValue, trigger, clearErrors } = form;

  const [imagePreviews, setImagePreviews] = useState<Array<{url: string, file?: File}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // This effect now correctly resets the entire form state when the dialog opens or the product changes.
    if (isOpen) {
        if (product) {
            form.reset({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
            });
            setImagePreviews(product.images.map(url => ({ url })));
        } else {
            form.reset({ name: '', description: '', price: 0, category: '', images: undefined });
            setImagePreviews([]);
        }
        clearErrors();
        // Always clear the file input when the dialog opens
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
  }, [product, isOpen, form, clearErrors]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    
    const newPreviews = files.map(file => ({
        url: URL.createObjectURL(file),
        file
    }));

    setImagePreviews(prev => [...prev, ...newPreviews]);
    if (files.length > 0) {
        clearErrors("images");
    }
  };

  const removeImage = (urlToRemove: string) => {
    setImagePreviews(prev => {
        const newPreviews = prev.filter(img => img.url !== urlToRemove);
        // Revoke object URL to prevent memory leaks for new files
        const removedPreview = prev.find(img => img.url === urlToRemove);
        if (removedPreview && removedPreview.file) {
            URL.revokeObjectURL(urlToRemove);
        }
        return newPreviews;
    });
  };
  
  const onSubmit = async (values: ProductFormValues) => {
    const hasImages = imagePreviews.length > 0;
    if (!hasImages) {
        form.setError("images", { type: "manual", message: "At least one image is required." });
        return;
    }

    const formData = new FormData();
    if (product) {
      formData.append('id', product.id);
    }
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price.toString());
    formData.append('category', values.category);
    
    imagePreviews.forEach(img => {
      if (img.file) {
        formData.append('images', img.file);
      } else {
        formData.append('existingImages', img.url);
      }
    });
    
    await onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!isSubmitting) {
            onOpenChange(open);
        }
    }}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {product ? 'Update the details for this product.' : 'Fill in the details for the new product.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
               <FormItem>
                <FormLabel>Images</FormLabel>
                 <FormControl>
                   <div className="flex items-center gap-4">
                     <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Images
                    </Button>
                    <Input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                   </div>
                </FormControl>
                <FormMessage>{form.formState.errors.images?.message as string}</FormMessage>
              </FormItem>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                    {imagePreviews.map((img) => (
                        <div key={img.url} className="relative aspect-square w-full">
                            <Image src={img.url} alt="Product preview" fill className="rounded-md object-cover" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={() => removeImage(img.url)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
              )}
            </div>

            <div className="space-y-4 md:col-start-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                        <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                        <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
            </div>
            
            <DialogFooter className="md:col-span-2">
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
