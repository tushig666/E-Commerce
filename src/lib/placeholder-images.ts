import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// This file is now mostly a fallback or for static images like the hero banner.
// Product images are now stored in Firestore.
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
