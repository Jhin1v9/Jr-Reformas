'use client';

import { useMemo, useState } from 'react';
import MasonryGrid, { type MasonryItem } from '@/components/shared/MasonryGrid';
import { cn } from '@/lib/utils';

interface FilterLabels {
  all: string;
}

interface LightboxLabels {
  close?: string;
  previous?: string;
  next?: string;
  expanded?: string;
  cta?: string;
  whatsappText?: string;
}

interface Props {
  items: MasonryItem[];
  categories?: string[];
  labels?: FilterLabels & LightboxLabels;
  columns?: 2 | 3 | 4;
  compact?: boolean;
  className?: string;
}

export default function GalleryMasonry({
  items,
  categories = [],
  labels = { all: 'Todos' },
  columns = 3,
  compact = true,
  className,
}: Props) {
  const filterLabel = labels.all ?? 'Todos';
  const lightboxLabels: LightboxLabels = {
    close: labels.close,
    previous: labels.previous,
    next: labels.next,
    expanded: labels.expanded,
    cta: labels.cta,
    whatsappText: labels.whatsappText,
  };
  const [filter, setFilter] = useState<string>('todos');

  // Avoid duplicate "Todos" / "todos" buttons — GalleryMasonry always renders the "all" filter itself.
  const allCategories = useMemo(
    () =>
      categories.length > 0
        ? categories.filter((c) => c.toLowerCase() !== 'todos')
        : [...new Set(items.map((i) => i.category).filter(Boolean))],
    [categories, items]
  );

  const filteredItems = useMemo(
    () => (filter === 'todos' ? items : items.filter((item) => item.category === filter)),
    [items, filter]
  );

  return (
    <div>
      {allCategories.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <FilterButton active={filter === 'todos'} onClick={() => setFilter('todos')}>
            {filterLabel}
          </FilterButton>
          {allCategories.map((cat) => (
            <FilterButton key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
              {cat}
            </FilterButton>
          ))}
        </div>
      )}

      <MasonryGrid items={filteredItems} columns={columns} compact={compact} className={className} labels={lightboxLabels} />
    </div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition-all',
        active
          ? 'border-terracota bg-terracota text-offwhite'
          : 'border-border text-text-secondary hover:border-sand hover:text-offwhite'
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
