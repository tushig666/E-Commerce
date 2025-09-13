'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/lib/types';

const MAX_HISTORY_LENGTH = 10;

export function useBrowsingHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedHistory = localStorage.getItem('maison-browsing-history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('maison-browsing-history', JSON.stringify(history));
    }
  }, [history, isMounted]);

  const addProductToHistory = useCallback((product: Product) => {
    setHistory(prevHistory => {
      const newHistory = [product.name, ...prevHistory.filter(p => p !== product.name)];
      return newHistory.slice(0, MAX_HISTORY_LENGTH);
    });
  }, []);

  return { history: isMounted ? history : [], addProductToHistory };
}
