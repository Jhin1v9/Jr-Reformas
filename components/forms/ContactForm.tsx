'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { contactSchema, type ContactFormData } from '@/lib/validation';

interface Labels {
  name: string;
  namePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  gdpr: string;
  send: string;
  sending: string;
  success: string;
  errorRequired: string;
  errorPhone: string;
  errorEmail: string;
  errorGdpr: string;
  thanksHref: string;
}

const inputCls =
  'w-full rounded-lg border border-carbon-mid bg-carbon px-4 py-3 text-offwhite placeholder:text-text-muted focus:border-terracota focus:outline-none focus:ring-2 focus:ring-terracota/20';

export default function ContactForm({ labels }: { labels: Labels }) {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), mode: 'onBlur' });

  const onSubmit = async (_data: ContactFormData): Promise<void> => {
    // Placeholder submit: ready for API/CRM integration
    await new Promise((r) => setTimeout(r, 400));
    setSent(true);
    router.push(labels.thanksHref);
  };

  const err = (key: keyof ContactFormData): string | undefined => {
    const e = errors[key];
    if (!e) return undefined;
    if (key === 'phone') return labels.errorPhone;
    if (key === 'email') return labels.errorEmail;
    if (key === 'gdpr') return labels.errorGdpr;
    return labels.errorRequired;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-sand">
          {labels.name} *
        </label>
        <input id="cf-name" type="text" autoComplete="name" placeholder={labels.namePlaceholder} className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} {...register('name')} />
        {errors.name ? <p id="cf-name-err" role="alert" className="mt-1 text-sm text-terracota">{err('name')}</p> : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-sand">
            {labels.phone} *
          </label>
          <input id="cf-phone" type="tel" autoComplete="tel" placeholder={labels.phonePlaceholder} className={inputCls} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'cf-phone-err' : undefined} {...register('phone')} />
          {errors.phone ? <p id="cf-phone-err" role="alert" className="mt-1 text-sm text-terracota">{err('phone')}</p> : null}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-sand">
            {labels.email}
          </label>
          <input id="cf-email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} className={inputCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} {...register('email')} />
          {errors.email ? <p id="cf-email-err" role="alert" className="mt-1 text-sm text-terracota">{err('email')}</p> : null}
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-sand">
          {labels.message} *
        </label>
        <textarea id="cf-message" rows={5} placeholder={labels.messagePlaceholder} className={inputCls} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-msg-err' : undefined} {...register('message')} />
        {errors.message ? <p id="cf-msg-err" role="alert" className="mt-1 text-sm text-terracota">{err('message')}</p> : null}
      </div>
      <div className="flex items-start gap-3">
        <input id="cf-gdpr" type="checkbox" className="mt-1 h-4 w-4 accent-terracota" aria-invalid={!!errors.gdpr} aria-describedby={errors.gdpr ? 'cf-gdpr-err' : undefined} {...register('gdpr')} />
        <label htmlFor="cf-gdpr" className="text-sm text-text-secondary">
          {labels.gdpr} *
        </label>
      </div>
      {errors.gdpr ? <p id="cf-gdpr-err" role="alert" className="text-sm text-terracota">{err('gdpr')}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-terracota px-8 py-4 text-base font-semibold text-offwhite transition-all hover:bg-terracota-light disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? labels.sending : labels.send}
      </button>
      {sent ? <p role="status" className="text-sm font-medium text-olive">{labels.success}</p> : null}
    </form>
  );
}
