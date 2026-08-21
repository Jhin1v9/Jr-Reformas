import { ShieldCheck } from 'lucide-react';
import type { ServiceMaterials as ServiceMaterialsType } from '@/lib/serviceContent';

interface Props {
  materials: ServiceMaterialsType;
}

export default function ServiceMaterials({ materials }: Props) {
  return (
    <div className="rounded-2xl border border-carbon/10 bg-white p-6 shadow-sm md:p-8">
      <h3 className="font-display text-xl font-semibold text-carbon">{materials.title}</h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {materials.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-carbon/80">
            <ShieldCheck className="h-5 w-5 shrink-0 text-olive" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-olive/30 bg-olive/5 p-4 text-sm text-carbon/80">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-olive" aria-hidden="true" />
        {materials.warranty}
      </div>
    </div>
  );
}
