import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Phone, Clock, BadgeCheck } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { isLocale, getDictionary } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SmartBudgetForm from '@/components/forms/SmartBudgetForm';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Solicita tu presupuesto gratis | Junior Reformas',
    description: 'Pide presupuesto de reforma en Sabadell, Barcelona, Terrassa y Mataró en 7 pasos. Respuesta el mismo día y visita técnica gratuita. Sin compromiso.',
  },
  en: {
    title: 'Request your free quote | Junior Reformas',
    description: 'Request a renovation quote in Sabadell, Barcelona, Terrassa and Mataró in 7 steps. Same-day response and free technical visit. No obligation.',
  },
  pt: {
    title: 'Peça o seu orçamento grátis | Junior Reformas',
    description: 'Peça orçamento de reforma em Sabadell, Barcelona, Terrassa e Mataró em 7 passos. Resposta no mesmo dia e visita técnica gratuita. Sem compromisso.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/presupuesto/', ...META[locale], keywords: ['presupuesto reforma sabadell', 'presupuesto reforma integral barcelona'] });
}

export default async function PresupuestoPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  return (
    <SectionWrapper variant="dark">
      <Breadcrumb locale={locale} items={[{ name: t.nav.budget, path: '/presupuesto/' }]} />
      <SectionHeader as="h1" badge={t.common.freeVisit} title={t.budgetForm.h1} description={t.budgetForm.sub} />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <SmartBudgetForm
          labels={{
            steps: t.budgetForm.steps,
            s1title: t.budgetForm.s1title,
            s2title: t.budgetForm.s2title,
            postalCode: t.budgetForm.postalCode,
            city: t.budgetForm.city,
            cityOther: t.budgetForm.cityOther,
            s3title: t.budgetForm.s3title,
            s3hint: t.budgetForm.s3hint,
            s3unknown: t.budgetForm.s3unknown,
            s4title: t.budgetForm.s4title,
            s4disclaimer: t.budgetForm.s4disclaimer,
            s5title: t.budgetForm.s5title,
            s5placeholder: t.budgetForm.s5placeholder,
            s6title: t.budgetForm.s6title,
            s6options: t.budgetForm.s6options,
            s7title: t.budgetForm.s7title,
            name: t.forms.name,
            namePlaceholder: t.forms.namePlaceholder,
            phone: t.forms.phone,
            phonePlaceholder: t.forms.phonePlaceholder,
            email: t.forms.email,
            emailPlaceholder: t.forms.emailPlaceholder,
            contactPref: t.budgetForm.contactPref,
            prefWhatsapp: t.budgetForm.prefWhatsapp,
            prefCall: t.budgetForm.prefCall,
            prefEmail: t.budgetForm.prefEmail,
            gdpr: t.forms.gdpr,
            marketing: t.forms.marketing,
            summary: t.budgetForm.summary,
            submit: t.budgetForm.submit,
            sending: t.forms.sending,
            next: t.forms.next,
            back: t.forms.back,
            edit: t.forms.edit,
            stepOf: t.forms.stepOf,
            errorRequired: t.forms.errorRequired,
            errorPhone: t.forms.errorPhone,
            errorEmail: t.forms.errorEmail,
            errorPostal: t.forms.errorPostal,
            errorGdpr: t.forms.errorGdpr,
            types: { ...t.calculator.types },
            finishes: {
              estandar: t.calculator.finishes.estandar,
              premium: t.calculator.finishes.premium,
              alto: t.calculator.finishes.alto,
            },
            finishesDesc: {
              estandar: t.calculator.finishes.estandarDesc,
              premium: t.calculator.finishes.premiumDesc,
              alto: t.calculator.finishes.altoDesc,
            },
            priceHint: t.budgetForm.priceHint,
            sqm: t.calculator.sqm,
            thanksHref: `/${locale}/gracias/`,
          }}
        />
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-carbon-light p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-sand">{t.contact.direct}</h2>
            <a href={`tel:${SITE.phoneRaw}`} className="mt-4 flex items-center gap-3 text-xl font-semibold text-terracota hover:text-terracota-light">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <a href={`${SITE.whatsapp}?text=${encodeURIComponent(t.whatsapp.message)}`} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-3 text-sm font-semibold text-whatsapp hover:underline">
              WhatsApp — {t.contact.response}
            </a>
          </div>
          <ul className="space-y-3">
            {[t.common.freeVisit, t.common.sameDay, t.hero.badge1].map((s) => (
              <li key={s} className="flex items-center gap-3 rounded-xl border border-border bg-carbon-light p-4 text-sm text-text-secondary">
                <BadgeCheck className="h-5 w-5 shrink-0 text-olive" aria-hidden="true" />
                {s}
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-xl border border-border bg-carbon-light p-4 text-sm text-text-secondary">
              <Clock className="h-5 w-5 shrink-0 text-olive" aria-hidden="true" />
              {t.footer.hours}
            </li>
          </ul>
        </aside>
      </div>
    </SectionWrapper>
  );
}
