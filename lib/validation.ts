import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^(\+34)?[\s]?[6789]\d{2}[\s]?\d{2}[\s]?\d{2}[\s]?\d{2}$/, 'phone'),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().min(10),
  gdpr: z.literal(true),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const REFORM_TYPES = ['bano', 'cocina', 'piso', 'suelo', 'local', 'otro'] as const;
export const FINISH_LEVELS = ['estandar', 'premium', 'alto'] as const;
export const CONTACT_PREFS = ['whatsapp', 'llamada', 'email'] as const;

export const budgetSchema = z.object({
  reformType: z.enum(REFORM_TYPES),
  postalCode: z.string().regex(/^\d{5}$/, 'postal'),
  city: z.string().min(2),
  sqm: z.number().min(10).max(200),
  sqmUnknown: z.boolean(),
  finish: z.enum(FINISH_LEVELS),
  goals: z.string().max(2000).optional(),
  timeline: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().regex(/^(\+34)?[\s]?[6789]\d{2}[\s]?\d{2}[\s]?\d{2}[\s]?\d{2}$/, 'phone'),
  email: z.string().email().optional().or(z.literal('')),
  contactPref: z.enum(CONTACT_PREFS),
  gdpr: z.literal(true),
  marketing: z.boolean(),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;

/** Calculator pricing: €/m² base per type multiplied by finish factor. */
const TYPE_RATE: Record<(typeof REFORM_TYPES)[number], [number, number]> = {
  bano: [700, 1200],
  cocina: [550, 1000],
  piso: [400, 700],
  suelo: [35, 80],
  local: [350, 650],
  otro: [300, 600],
};
const FINISH_FACTOR: Record<(typeof FINISH_LEVELS)[number], [number, number]> = {
  estandar: [0.9, 1.1],
  premium: [1.2, 1.5],
  alto: [1.6, 2.2],
};

export function estimateBudget(
  reformType: (typeof REFORM_TYPES)[number],
  sqm: number,
  finish: (typeof FINISH_LEVELS)[number]
): { min: number; max: number } {
  const [rMin, rMax] = TYPE_RATE[reformType];
  const [fMin, fMax] = FINISH_FACTOR[finish];
  const min = Math.round((rMin * sqm * fMin) / 100) * 100;
  const max = Math.round((rMax * sqm * fMax) / 100) * 100;
  // Bathrooms have a practical floor price even for small sizes
  const floor = reformType === 'bano' ? 3000 : reformType === 'cocina' ? 5000 : 1000;
  return { min: Math.max(min, floor), max: Math.max(max, floor * 2) };
}

export const FINISH_PRICE_HINT: Record<(typeof FINISH_LEVELS)[number], string> = {
  estandar: '400-600 €/m²',
  premium: '600-900 €/m²',
  alto: '900-1.500 €/m²',
};
