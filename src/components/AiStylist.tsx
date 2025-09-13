'use client';

import { useState } from 'react';
import { Bot, Loader2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useBrowsingHistory } from '@/hooks/useBrowsingHistory';
import { getStyleRecommendations } from '@/ai/flows/ai-shopping-assistant';
import { ScrollArea } from './ui/scroll-area';

export default function AiStylist() {
  const { history } = useBrowsingHistory();
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError('');
    setRecommendations('');
    try {
      if (history.length === 0) {
        setRecommendations("You haven't browsed any items yet. Start exploring to get personalized recommendations!");
        return;
      }

      const browsingHistoryText = `User has viewed the following products: ${history.join(', ')}.`;
      const result = await getStyleRecommendations({ browsingHistory: browsingHistoryText });
      setRecommendations(result.recommendations);
    } catch (e) {
      setError('Sorry, our AI stylist is taking a break. Please try again later.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Wand2 className="h-6 w-6" />
              <span className="sr-only">Open AI Stylist</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
                <Bot />
                Your AI Stylist
              </DialogTitle>
              <DialogDescription>
                Get personalized style recommendations based on your browsing history.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isLoading ? (
                <div className="flex min-h-[150px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : recommendations ? (
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <p className="whitespace-pre-wrap text-sm">{recommendations}</p>
                </ScrollArea>
              ) : error ? (
                 <p className="text-destructive">{error}</p>
              ) : (
                <div className="text-center text-sm text-muted-foreground">
                    <p>Click the button below to generate outfit ideas and product pairings.</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleGetRecommendations} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Ideas
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
