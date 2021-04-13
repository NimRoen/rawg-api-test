import { useState } from 'react';

export const usePagination = ({
  fetchItems,
  setItems,
  scrollableAnchor,
}) => {
  const [pages, setPages] = useState({ prev: 0, next: 3 });

  const loadPrevPage = async () => {
    const { prev, next } = pages;

    if (prev < 1) return;

    const { results } = await fetchItems(prev);

    setPages({
      prev: prev - 1,
      next: next ? next - 1 : prev + 3,
    });

    setItems(({ prev, next }) => ({
      next: prev || next,
      prev: results || prev,
    }));

    setTimeout(() => scrollableAnchor.current?.scrollIntoView(), 0);
  };

  const loadNextPage = async () => {
    const { prev, next } = pages;

    if (!next) return;

    const items = await fetchItems(next);
    
    if (!items.results.length) return;

    setPages({
      prev: prev + 1,
      next: items.next ? next + 1 : null,
    });

    setItems(({ prev, next }) => ({
      next: items.results || next,
      prev: next || prev,
    }));

    setTimeout(() => scrollableAnchor.current?.scrollIntoView(false), 0);
  };

  return {
    loadPrevPage,
    loadNextPage,
  };
};
