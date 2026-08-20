'use client';

import { useMemo, useState } from 'react';
import MasonryGrid, { type MasonryItem } from '@/components/shared/MasonryGrid';
import { cn } from '@/lib/utils';

interface FilterLabels {
  all: string;
}

interface Props {
  items: MasonryItem[];
  categories?: string[];
  labels?: FilterLabels;
  columns?: 2 | 3 | 4;
}

export default function GalleryMasonry({
  items,
  categories = [],
  labels = { all: 'Todos' },
  columns = 3,
}: Props) {
  const [filter, setFilter] = useState<string>('todos');

  const allCategories = useMemo(
    () => (categories.length > 0 ? categories : [...new Set(items.map((i) => i.category).filter(Boolean))]),
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
            {labels.all}
          </FilterButton>
          {allCategories.map((cat) => (
            <FilterButton key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
              {cat}
            </FilterButton>
          ))}
        </div>
      )}

      <MasonryGrid items={filteredItems} columns={columns} />
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
