import { MapPin } from 'lucide-react';
import type { ServiceArea } from '@/lib/serviceContent';

interface Props {
  title: string;
  intro: string;
  areas: ServiceArea[];
}

export default function ServiceAreas({ title, intro, areas }: Props) {
  return (
    <div className="rounded-2xl border border-carbon/10 bg-white p-6 shadow-sm md:p-8">
      <h3 className="font-display text-xl font-semibold text-carbon">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-carbon/70">{intro}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {areas.map((area) => (
          <span
            key={area.name}
            className="inline-flex items-center gap-1.5 rounded-full border border-carbon/10 bg-carbon/5 px-3 py-1.5 text-sm text-carbon/80"
          >
            <MapPin className="h-3.5 w-3.5 text-terracota" aria-hidden="true" />
            {area.name}
          </span>
        ))}
      </div>
    </div>
  );
}
