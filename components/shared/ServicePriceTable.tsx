import type { ServicePriceRow } from '@/lib/serviceContent';

interface Props {
  title: string;
  disclaimer: string;
  rows: ServicePriceRow[];
}

export default function ServicePriceTable({ title, disclaimer, rows }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-carbon/10 bg-white shadow-sm">
      <div className="border-b border-carbon/10 bg-carbon/5 px-6 py-4">
        <h3 className="font-display text-xl font-semibold text-carbon">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-carbon/5 text-xs uppercase tracking-wider text-carbon/70">
            <tr>
              <th className="px-6 py-3 font-medium">Concepto</th>
              <th className="px-6 py-3 font-medium">Precio orientativo</th>
              <th className="px-6 py-3 font-medium">Nota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-carbon/10">
            {rows.map((row, i) => (
              <tr key={i} className="text-carbon/80">
                <td className="px-6 py-4 font-medium text-carbon">{row.concept}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-terracota">{row.price}</td>
                <td className="px-6 py-4 text-carbon/60">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-carbon/10 bg-carbon/5 px-6 py-3 text-xs italic text-carbon/60">
        {disclaimer}
      </p>
    </div>
  );
}
