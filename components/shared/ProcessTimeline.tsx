'use client';

import { useEffect, useRef } from 'react';
import { MapPin, ClipboardList, FileText, Hammer, CheckCircle } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import { gsap } from '@/components/hooks/useGSAP';

const ICONS = [MapPin, ClipboardList, FileText, Hammer, CheckCircle];

interface Props {
  locale: Locale;
  variant?: 'dark' | 'light';
  title?: string;
  description?: string;
}

export default function ProcessTimeline({ locale, variant = 'dark', title, description }: Props) {
  const t = getDictionary(locale);
  const steps = t.process.steps;
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const stepEls = stepsRef.current.filter(Boolean);
    if (!section || !line || stepEls.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate line width on scroll
      gsap.fromTo(
        line,
        { width: '0%' },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center 55%',
            scrub: 0.5,
          },
        }
      );

      // Stagger fade-up steps
      gsap.fromTo(
        stepEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pulse circles sequentially — keeps icon always visible
      gsap.fromTo(
        stepEls.map((el) => el?.querySelector('.process-circle')),
        { scale: 0.85, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper variant={variant} id="proceso">
      <div ref={sectionRef}>
        <SectionHeader
          variant={variant}
          badge={t.process.badge}
          title={title ?? t.process.title}
          description={description ?? t.process.description}
        />

        <div className="relative mt-14 md:mt-20">
          {/* Connector line — desktop */}
          <div className="absolute left-0 right-0 top-[4.5rem] hidden h-0.5 bg-carbon-mid md:block" aria-hidden="true" />
          <div
            ref={lineRef}
            className="absolute left-0 top-[4.5rem] hidden h-0.5 bg-terracota md:block"
            style={{ width: '0%' }}
            aria-hidden="true"
          />

          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {steps.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <li
                  key={step.title}
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                  className="flex gap-5 md:flex-col md:items-center md:text-center"
                >
                  <div className="process-circle relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-terracota bg-carbon shadow-lg shadow-terracota/10 md:mx-auto">
                    <Icon className="relative z-10 h-6 w-6 shrink-0 text-offwhite" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-terracota md:hidden">
                      Paso {i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-offwhite md:mt-6 md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </SectionWrapper>
  );
}
