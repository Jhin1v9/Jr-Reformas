'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Bath, ChefHat, Home, Grid3x3, Store, HelpCircle, ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { budgetSchema, REFORM_TYPES, FINISH_LEVELS, CONTACT_PREFS, FINISH_PRICE_HINT, type BudgetFormData } from '@/lib/validation';
import { LOCALITIES } from '@/lib/localities';

interface Labels {
  steps: string[];
  s1title: string;
  s2title: string;
  postalCode: string;
  city: string;
  cityOther: string;
  s3title: string;
  s3hint: string;
  s3unknown: string;
  s4title: string;
  s4disclaimer: string;
  s5title: string;
  s5placeholder: string;
  s6title: string;
  s6options: string[];
  s7title: string;
  name: string;
  namePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  contactPref: string;
  prefWhatsapp: string;
  prefCall: string;
  prefEmail: string;
  gdpr: string;
  marketing: string;
  summary: string;
  submit: string;
  sending: string;
  next: string;
  back: string;
  edit: string;
  stepOf: string;
  errorRequired: string;
  errorPhone: string;
  errorEmail: string;
  errorPostal: string;
  errorGdpr: string;
  types: Record<string, string>;
  finishes: Record<string, string>;
  finishesDesc: Record<string, string>;
  priceHint: string;
  sqm: string;
  thanksHref: string;
}

const TYPE_ICONS = { bano: Bath, cocina: ChefHat, piso: Home, suelo: Grid3x3, local: Store, otro: HelpCircle } as const;
const STORAGE_KEY = 'jr-budget-form-v1';
const TOTAL_STEPS = 7;

const inputCls =
  'w-full rounded-lg border border-carbon-mid bg-carbon px-4 py-3 text-offwhite placeholder:text-text-muted focus:border-terracota focus:outline-none focus:ring-2 focus:ring-terracota/20';

const STEP_FIELDS: (keyof BudgetFormData)[][] = [
  ['reformType'],
  ['postalCode', 'city'],
  ['sqm'],
  ['finish'],
  ['goals'],
  ['timeline'],
  ['name', 'phone', 'email', 'contactPref', 'gdpr'],
];

export default function SmartBudgetForm({ labels }: { labels: Labels }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    mode: 'onBlur',
    defaultValues: {
      reformType: undefined,
      postalCode: '',
      city: '',
      sqm: 80,
      sqmUnknown: false,
      finish: undefined,
      goals: '',
      timeline: '',
      name: '',
      phone: '',
      email: '',
      contactPref: 'whatsapp',
      gdpr: undefined,
      marketing: false,
    } as unknown as BudgetFormData,
  });

  const values = watch();

  // Persist progress in localStorage
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<BudgetFormData>;
        Object.entries(parsed).forEach(([k, v]) => {
          setValue(k as keyof BudgetFormData, v as never);
        });
      }
    } catch {
      /* storage unavailable */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      /* storage unavailable */
    }
  }, [values]);

  const goNext = async (): Promise<void> => {
    const ok = await trigger(STEP_FIELDS[step]);
    if (!ok) return;
    if (step === TOTAL_STEPS - 1) {
      setShowSummary(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const onSubmit = async (_data: BudgetFormData): Promise<void> => {
    // Placeholder submit: ready for API/CRM/email integration
    await new Promise((r) => setTimeout(r, 500));
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    router.push(labels.thanksHref);
  };

  const errorFor = (key: keyof BudgetFormData): string | undefined => {
    if (!errors[key]) return undefined;
    if (key === 'phone') return labels.errorPhone;
    if (key === 'email') return labels.errorEmail;
    if (key === 'postalCode') return labels.errorPostal;
    if (key === 'gdpr') return labels.errorGdpr;
    return labels.errorRequired;
  };

  const optionCard = (active: boolean): string =>
    `flex min-h-[48px] items-center gap-3 rounded-lg border p-4 text-left transition-all ${
      active ? 'border-terracota bg-terracota/10 text-offwhite' : 'border-border bg-carbon text-text-secondary hover:border-sand'
    }`;

  const progress = ((showSummary ? TOTAL_STEPS : step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="rounded-2xl border border-border bg-carbon-light p-6 md:p-10">
      {/* Stepper */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
          <span>
            {labels.stepOf.replace('{current}', String(showSummary ? TOTAL_STEPS : step + 1)).replace('{total}', String(TOTAL_STEPS))}
            {' — '}
            {showSummary ? labels.summary : labels.steps[step]}
          </span>
        </div>
        <div className="h-1 w-full rounded-full bg-carbon-mid" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-1 rounded-full bg-gradient-to-r from-terracota to-olive transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {showSummary ? (
          <div>
            <h2 className="font-display text-2xl font-semibold text-offwhite">{labels.summary}</h2>
            <dl className="mt-6 space-y-3 text-sm">
              {[
                [labels.steps[0], labels.types[values.reformType] ?? '—'],
                [labels.steps[1], `${values.postalCode} · ${values.city}`],
                [labels.steps[2], values.sqmUnknown ? labels.s3unknown : `${values.sqm} ${labels.sqm}`],
                [labels.steps[3], labels.finishes[values.finish] ?? '—'],
                [labels.steps[4], values.goals || '—'],
                [labels.steps[5], values.timeline],
                [labels.steps[6], `${values.name} · ${values.phone}${values.email ? ` · ${values.email}` : ''}`],
              ].map(([dt, dd], i) => (
                <div key={String(dt)} className="flex flex-col gap-2 rounded-lg border border-border bg-carbon p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <dt className="font-medium text-text-muted">{dt}</dt>
                  <dd className="text-offwhite sm:flex-1 sm:text-right">{dd}</dd>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSummary(false);
                      setStep(i);
                    }}
                    className="shrink-0 self-start text-xs font-semibold text-terracota hover:underline sm:self-auto"
                  >
                    {labels.edit}
                  </button>
                </div>
              ))}
            </dl>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-terracota px-8 py-3 text-base font-semibold text-offwhite transition-all hover:bg-terracota-light disabled:opacity-60"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
              {isSubmitting ? labels.sending : labels.submit}
            </button>
          </div>
        ) : (
          <>
            {step === 0 ? (
              <fieldset>
                <legend className="font-display text-2xl font-semibold text-offwhite">{labels.s1title}</legend>
                <div className="mt-6 grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 sm:grid-cols-3">
                  {REFORM_TYPES.map((rt) => {
                    const Icon = TYPE_ICONS[rt];
                    return (
                      <button key={rt} type="button" onClick={() => setValue('reformType', rt, { shouldValidate: true })} aria-pressed={values.reformType === rt} className={optionCard(values.reformType === rt) + ' flex-col items-center text-center'}>
                        <Icon className={`h-7 w-7 ${values.reformType === rt ? 'text-terracota' : 'text-text-muted'}`} aria-hidden="true" />
                        <span className="text-sm font-medium">{labels.types[rt]}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.reformType ? <p role="alert" className="mt-2 text-sm text-terracota">{labels.errorRequired}</p> : null}
              </fieldset>
            ) : null}

            {step === 1 ? (
              <fieldset>
                <legend className="font-display text-2xl font-semibold text-offwhite">{labels.s2title}</legend>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bf-cp" className="mb-1.5 block text-sm font-medium text-sand">{labels.postalCode} *</label>
                    <input id="bf-cp" inputMode="numeric" maxLength={5} placeholder="08201" className={inputCls} aria-invalid={!!errors.postalCode} {...register('postalCode')} />
                    {errors.postalCode ? <p role="alert" className="mt-1 text-sm text-terracota">{errorFor('postalCode')}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="bf-city" className="mb-1.5 block text-sm font-medium text-sand">{labels.city} *</label>
                    <input id="bf-city" list="bf-cities" placeholder="Sabadell" className={inputCls} aria-invalid={!!errors.city} {...register('city')} />
                    <datalist id="bf-cities">
                      {LOCALITIES.map((l) => (
                        <option key={l.slug} value={l.name} />
                      ))}
                      <option value={labels.cityOther} />
                    </datalist>
                    {errors.city ? <p role="alert" className="mt-1 text-sm text-terracota">{errorFor('city')}</p> : null}
                  </div>
                </div>
              </fieldset>
            ) : null}

            {step === 2 ? (
              <fieldset>
                <legend className="font-display text-2xl font-semibold text-offwhite">{labels.s3title}</legend>
                <div className="mt-6">
                  <label htmlFor="bf-sqm" className="block text-center font-display text-4xl font-bold text-terracota">
                    {values.sqmUnknown ? '—' : `${values.sqm} ${labels.sqm}`}
                  </label>
                  <input id="bf-sqm" type="range" min={10} max={200} step={5} disabled={values.sqmUnknown} className="mt-6 w-full accent-terracota disabled:opacity-40" {...register('sqm', { valueAsNumber: true })} />
                  <p className="mt-2 text-sm text-text-muted">{labels.s3hint}</p>
                  <label className="mt-4 flex cursor-pointer items-center gap-3 py-1 text-sm text-text-secondary">
                    <input type="checkbox" className="h-5 w-5 min-h-[44px] min-w-[44px] accent-terracota" {...register('sqmUnknown')} />
                    {labels.s3unknown}
                  </label>
                </div>
              </fieldset>
            ) : null}

            {step === 3 ? (
              <fieldset>
                <legend className="font-display text-2xl font-semibold text-offwhite">{labels.s4title}</legend>
                <div className="mt-6 grid gap-3">
                  {FINISH_LEVELS.map((fl) => (
                    <button key={fl} type="button" onClick={() => setValue('finish', fl, { shouldValidate: true })} aria-pressed={values.finish === fl} className={optionCard(values.finish === fl)}>
                      <span className="flex-1">
                        <span className={`block font-semibold ${values.finish === fl ? 'text-terracota' : 'text-offwhite'}`}>{labels.finishes[fl]}</span>
                        <span className="mt-0.5 block text-sm text-text-muted">{labels.finishesDesc[fl]}</span>
                      </span>
                      <span className="shrink-0 rounded-full border border-terracota px-3 py-1 text-xs font-semibold text-terracota">
                        {labels.priceHint}: {FINISH_PRICE_HINT[fl]}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-text-muted">{labels.s4disclaimer}</p>
                {errors.finish ? <p role="alert" className="mt-2 text-sm text-terracota">{labels.errorRequired}</p> : null}
              </fieldset>
            ) : null}

            {step === 4 ? (
              <fieldset>
                <legend className="font-display text-2xl font-semibold text-offwhite">{labels.s5title}</legend>
                <textarea id="bf-goals" rows={6} placeholder={labels.s5placeholder} className={inputCls + ' mt-6'} {...register('goals')} />
              </fieldset>
            ) : null}

            {step === 5 ? (
              <fieldset>
                <legend className="font-display text-2xl font-semibold text-offwhite">{labels.s6title}</legend>
                <div className="mt-6 grid gap-3">
                  {labels.s6options.map((opt) => (
                    <button key={opt} type="button" onClick={() => setValue('timeline', opt, { shouldValidate: true })} aria-pressed={values.timeline === opt} className={optionCard(values.timeline === opt)}>
                      <span className="text-sm font-medium">{opt}</span>
                    </button>
                  ))}
                </div>
                {errors.timeline ? <p role="alert" className="mt-2 text-sm text-terracota">{labels.errorRequired}</p> : null}
              </fieldset>
            ) : null}

            {step === 6 ? (
              <fieldset>
                <legend className="font-display text-2xl font-semibold text-offwhite">{labels.s7title}</legend>
                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="bf-name" className="mb-1.5 block text-sm font-medium text-sand">{labels.name} *</label>
                    <input id="bf-name" autoComplete="name" placeholder={labels.namePlaceholder} className={inputCls} aria-invalid={!!errors.name} {...register('name')} />
                    {errors.name ? <p role="alert" className="mt-1 text-sm text-terracota">{errorFor('name')}</p> : null}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bf-phone" className="mb-1.5 block text-sm font-medium text-sand">{labels.phone} *</label>
                      <input id="bf-phone" type="tel" autoComplete="tel" placeholder={labels.phonePlaceholder} className={inputCls} aria-invalid={!!errors.phone} {...register('phone')} />
                      {errors.phone ? <p role="alert" className="mt-1 text-sm text-terracota">{errorFor('phone')}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="bf-email" className="mb-1.5 block text-sm font-medium text-sand">{labels.email}</label>
                      <input id="bf-email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} className={inputCls} aria-invalid={!!errors.email} {...register('email')} />
                      {errors.email ? <p role="alert" className="mt-1 text-sm text-terracota">{errorFor('email')}</p> : null}
                    </div>
                  </div>
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-sand">{labels.contactPref}</legend>
                    <div className="flex flex-wrap gap-3">
                      {CONTACT_PREFS.map((cp) => (
                        <button key={cp} type="button" onClick={() => setValue('contactPref', cp)} aria-pressed={values.contactPref === cp} className={optionCard(values.contactPref === cp) + ' px-5'}>
                          <span className="text-sm font-medium">{cp === 'whatsapp' ? labels.prefWhatsapp : cp === 'llamada' ? labels.prefCall : labels.prefEmail}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <label htmlFor="bf-gdpr" className="flex cursor-pointer items-start gap-3 py-1">
                    <input id="bf-gdpr" type="checkbox" className="mt-0.5 h-5 w-5 min-h-[44px] min-w-[44px] accent-terracota" aria-invalid={!!errors.gdpr} {...register('gdpr')} />
                    <span className="text-sm text-text-secondary">{labels.gdpr} *</span>
                  </label>
                  {errors.gdpr ? <p role="alert" className="text-sm text-terracota">{errorFor('gdpr')}</p> : null}
                  <label htmlFor="bf-mkt" className="flex cursor-pointer items-start gap-3 py-1">
                    <input id="bf-mkt" type="checkbox" className="mt-0.5 h-5 w-5 min-h-[44px] min-w-[44px] accent-terracota" {...register('marketing')} />
                    <span className="text-sm text-text-secondary">{labels.marketing}</span>
                  </label>
                </div>
              </fieldset>
            ) : null}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-sand transition-colors hover:border-offwhite hover:text-offwhite disabled:opacity-40 sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {labels.back}
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-terracota px-8 py-3.5 text-sm font-semibold text-offwhite transition-all hover:bg-terracota-light sm:w-auto"
              >
                {labels.next}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
