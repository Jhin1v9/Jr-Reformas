import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowRight } from 'lucide-react';
import { LOCALES, SITE, type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata, articleSchema } from '@/lib/seo';
import { ALL_POSTS, getPost } from '@/lib/blog';
import { getService } from '@/lib/services';
import { getLocality } from '@/lib/localities';
import { fotoUrl } from '@/lib/photos';
import { formatDate } from '@/lib/utils';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTAButton from '@/components/shared/CTAButton';
import JsonLd from '@/components/shared/JsonLd';
import { BlogCard } from '@/components/sections/BlogPreview';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  return LOCALES.flatMap((locale) => ALL_POSTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${post.slug}/`,
    title: post.metaTitle,
    description: post.metaDesc,
    keywords: post.keywords,
    image: `/fotos/${post.image}`,
    type: 'article',
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const post = getPost(slug);
  if (!post) notFound();
  const t = getDictionary(locale);

  const related = ALL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const locality = getLocality(post.relatedLocality);

  return (
    <>
      <JsonLd data={articleSchema(post, locale)} />
      <SectionWrapper variant="light">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb locale={locale} variant="light" items={[{ name: t.nav.blog, path: '/blog/' }, { name: post.title, path: `/blog/${post.slug}/` }]} />
          <span className="inline-block rounded-full bg-terracota px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-offwhite">
            {post.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-carbon md:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-carbon/60">
            <span>{SITE.name}</span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingTime} {t.blogPreview.minRead}
            </span>
          </div>
          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
            <Image src={fotoUrl(post.image)} alt={`${post.title} — Junior Reformas`} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>

          {/* TL;DR box for GEO / AI citations */}
          <aside className="mt-8 rounded-xl border-l-4 border-terracota bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-terracota">TL;DR</p>
            <p className="mt-2 leading-relaxed text-carbon/80">{post.tldr}</p>
          </aside>

          <article className="prose-jr mt-8">
            {post.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {s.list ? (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li.slice(0, 40)}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>

          {/* Internal linking */}
          <nav aria-label={t.related.title} className="mt-10 rounded-xl border border-carbon/10 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-carbon">{t.related.title}</h2>
            <ul className="mt-4 space-y-2">
              {post.relatedServices.map((slug) => {
                const s = getService(slug);
                return s ? (
                  <li key={slug}>
                    <Link href={localePath(locale, `/servicios/${slug}`)} className="inline-flex items-center gap-2 text-terracota hover:underline">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      {s.title}
                    </Link>
                  </li>
                ) : null;
              })}
              {locality ? (
                <li>
                  <Link href={localePath(locale, `/localidades/${locality.slug}`)} className="inline-flex items-center gap-2 text-terracota hover:underline">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    {locale === 'es' ? `Reformas en ${locality.name}` : locale === 'pt' ? `Reformas em ${locality.name}` : `Renovations in ${locality.name}`}
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>

          <div className="mt-10 rounded-xl bg-carbon p-8 text-center">
            <p className="font-display text-2xl font-bold text-offwhite">{t.budgetForm.h1}</p>
            <p className="mt-2 text-text-secondary">{t.budgetForm.sub}</p>
            <div className="mt-6">
              <CTAButton variant="primary" href={localePath(locale, '/presupuesto')}>
                {t.ctaFinal.ctaPrimary}
              </CTAButton>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <h2 className="mb-8 font-display text-2xl font-bold text-offwhite">{t.related.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} locale={locale} readMore={t.blogPreview.readMore} minRead={t.blogPreview.minRead} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
