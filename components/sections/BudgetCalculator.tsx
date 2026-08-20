'use client';

import { useState } from 'react';
import { Bath, ChefHat, Home, Grid3x3, Store, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { estimateBudget, FINISH_LEVELS, REFORM_TYPES, type REFORM_TYPES as RT, type FINISH_LEVELS as FL } from '@/lib/validation';
import { formatPriceRange } from '@/lib/utils';

type ReformType = (typeof RT)[number];
type Finish = (typeof FL)[number];

interface Labels {
  step1: string;
  step2: string;
  step3: string;
  types: Record<ReformType, string>;
  finishes: Record<Finish, string>;
  finishesDesc: Record<Finish, string>;
  result: string;
  disclaimer: string;
  cta: string;
  sqm: string;
  ctaHref: string;
}

const TYPE_ICONS: Record<ReformType, typeof Bath> = {
  bano: Bath,
  cocina: ChefHat,
  piso: Home,
  suelo: Grid3x3,
  local: Store,
  otro: HelpCircle,
};

export default function BudgetCalculator({ labels }: { labels: Labels }) {
  const [type, setType] = useState<ReformType>('piso');
  const [sqm, setSqm] = useState(80);
  const [finish, setFinish] = useState<Finish>('estandar');
  const est = estimateBudget(type, sqm, finish);

  return (
    <div className="rounded-2xl border border-border bg-carbon-light p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-widest text-sand">{labels.step1}</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {REFORM_TYPES.map((rt) => {
                const Icon = TYPE_ICONS[rt];
                const active = type === rt;
                return (
                  <button
                    key={rt}
                    type="button"
                    onClick={() => setType(rt)}
                    aria-pressed={active}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-all ${
                      active
                        ? 'border-terracota bg-terracota/10 text-offwhite'
                        : 'border-border bg-carbon text-text-secondary hover:border-sand'
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${active ? 'text-terracota' : 'text-text-muted'}`} aria-hidden="true" />
                    {labels.types[rt]}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div>
            <label htmlFor="calc-sqm" className="mb-3 block text-sm font-semibold uppercase tracking-widest text-sand">
              {labels.step2}: <span className="text-terracota">{sqm} {labels.sqm}</span>
            </label>
            <input
              id="calc-sqm"
              type="range"
              min={10}
              max={200}
              step={5}
              value={sqm}
              onChange={(e) => setSqm(Number(e.target.value))}
              className="w-full accent-terracota"
            />
            <div className="mt-1 flex justify-between text-xs text-text-muted">
              <span>10 {labels.sqm}</span>
              <span>200 {labels.sqm}</span>
            </div>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-widest text-sand">{labels.step3}</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {FINISH_LEVELS.map((fl) => {
                const active = finish === fl;
                return (
                  <button
                    key={fl}
                    type="button"
                    onClick={() => setFinish(fl)}
                    aria-pressed={active}
                    className={`rounded-lg border p-4 text-left transition-all ${
                      active ? 'border-terracota bg-terracota/10' : 'border-border bg-carbon hover:border-sand'
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${active ? 'text-terracota' : 'text-offwhite'}`}>
                      {labels.finishes[fl]}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-text-muted">{labels.finishesDesc[fl]}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-terracota/30 bg-carbon p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-text-muted">{labels.result}</p>
          <p className="mt-3 font-display text-3xl md:text-4xl font-bold text-terracota">
            {formatPriceRange(est.min, est.max)}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-text-muted">{labels.disclaimer}</p>
          <Link
            href={labels.ctaHref}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-terracota px-6 py-3.5 text-sm font-semibold text-offwhite transition-all hover:bg-terracota-light"
          >
            {labels.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
