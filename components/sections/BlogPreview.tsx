import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { fotoUrl } from '@/lib/photos';
import { ALL_POSTS, type BlogPost } from '@/lib/blog';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';

export function BlogCard({ post, locale, readMore, minRead }: { post: BlogPost; locale: Locale; readMore: string; minRead: string }) {
  return (
    <Link
      href={localePath(locale, `/blog/${post.slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-carbon-light transition-all hover:border-terracota/40"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={fotoUrl(post.image)}
          alt={`${post.title} — Junior Reformas`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-terracota px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-offwhite">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-offwhite group-hover:text-terracota">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
          <span>{formatDate(post.date, locale)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTime} {minRead}
          </span>
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-terracota">
          {readMore}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

interface Props {
  locale: Locale;
}

export default function BlogPreview({ locale }: Props) {
  const t = getDictionary(locale);
  const posts = ALL_POSTS.slice(0, 3);
  return (
    <SectionWrapper variant="dark" id="blog">
      <SectionHeader badge={t.blogPreview.badge} title={t.blogPreview.title} description={t.blogPreview.description} />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <BlogCard post={p} locale={locale} readMore={t.blogPreview.readMore} minRead={t.blogPreview.minRead} />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <CTAButton variant="secondary" href={localePath(locale, '/blog')}>
          {t.blogPreview.cta}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
