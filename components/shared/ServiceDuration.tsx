import { Clock } from 'lucide-react';
import type { ServiceDuration as ServiceDurationType } from '@/lib/serviceContent';

interface Props {
  title: string;
  duration: ServiceDurationType;
}

export default function ServiceDuration({ title, duration }: Props) {
  return (
    <div className="rounded-2xl border border-carbon/10 bg-white p-6 shadow-sm md:p-8">
      <h3 className="font-display text-xl font-semibold text-carbon">{title}</h3>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-terracota/10 text-terracota">
          <Clock className="h-8 w-8" aria-hidden="true" />
        </div>
        <div>
          <p className="font-display text-4xl font-bold text-carbon">{duration.typical}</p>
          <p className="text-sm text-carbon/60">{duration.range}</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm font-semibold text-carbon">Factores que pueden afectar el plazo:</p>
        <ul className="mt-3 space-y-2">
          {duration.factors.map((factor, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-carbon/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracota" />
              {factor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
