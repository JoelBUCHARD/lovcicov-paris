import { Link, useParams, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { getArticle, getCategory, magazineArticles } from '@/data/magazine';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const MagazineArticle = () => {
  const { slug = '' } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return <Navigate to="/magazine" replace />;
  }

  const category = getCategory(article.category);
  const related = (article.related || [])
    .map(s => magazineArticles.find(a => a.slug === s))
    .filter(Boolean)
    .slice(0, 3) as typeof magazineArticles;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: 'LOVCICOV Paris' },
    publisher: {
      '@type': 'Organization',
      name: 'LOVCICOV Paris',
      url: 'https://lovcicov.com',
    },
    mainEntityOfPage: `https://lovcicov.com/magazine/${article.slug}`,
    articleSection: category.label,
  };

  const seoTitle = article.seoTitle || `${article.title} — LOVCICOV Magazine`;
  const seoDescription = article.seoDescription || article.excerpt;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/magazine/${article.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-[73px]">
        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-6 md:px-0 pt-10 md:pt-14">
          <nav
            aria-label="Fil d’Ariane"
            className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground text-center"
            style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
          >
            <Link to="/magazine" className="hover:text-foreground transition-colors">
              Magazine
            </Link>
            <span aria-hidden className="mx-3">·</span>
            <span>{category.label}</span>
          </nav>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 md:px-0 pt-10 md:pt-14 pb-14 md:pb-20 text-center">
          <h1
            className="italic font-light leading-[1.05] text-foreground mb-8"
            style={{
              fontFamily: 'Instrument Sans, system-ui, sans-serif',
              fontSize: 'clamp(34px, 5vw, 62px)',
            }}
          >
            {article.title}
          </h1>
          <p
            className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
            style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
          >
            {formatDate(article.publishedAt)} · Lecture {article.readingTime} min
          </p>
        </header>

        {/* Hero image */}
        <div
          className="w-full h-[60vh] md:h-[80vh]"
          style={{ background: article.heroBg }}
          aria-hidden="true"
        />

        {/* Body */}
        <article className="max-w-[640px] mx-auto px-6 md:px-0 py-20 md:py-28">
          <p
            className="text-center italic mb-16 text-foreground/85"
            style={{
              fontFamily: 'Instrument Sans, system-ui, sans-serif',
              fontSize: 20,
              lineHeight: 1.65,
            }}
          >
            {article.intro}
          </p>

          {article.sections.map((sec, i) => (
            <section key={i} className="mb-16">
              {sec.heading && (
                <h2
                  className="uppercase mb-6 text-foreground text-center"
                  style={{
                    fontFamily: 'Instrument Sans, system-ui, sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.28em',
                  }}
                >
                  {sec.heading}
                </h2>
              )}
              <div
                className="space-y-6 text-foreground/85"
                style={{ fontSize: 16, lineHeight: 1.9, fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
              >
                {sec.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {/* Signature */}
          <div className="mt-20 pt-10 border-t border-border text-center">
            <p
              className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground mb-8"
              style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
            >
              — La rédaction LOVCICOV
            </p>

            {article.ctaTo && (
              <Link
                to={article.ctaTo}
                className="inline-block px-10 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.28em] hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
              >
                {article.ctaLabel || 'Explorer la maison'}
              </Link>
            )}
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-24">
              <p
                className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground text-center mb-14"
                style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
              >
                À lire ensuite
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
                {related.map(r => {
                  const rCat = getCategory(r.category);
                  return (
                    <Link key={r.slug} to={`/magazine/${r.slug}`} className="group block">
                      <div
                        className="w-full aspect-[4/5] mb-5 transition-opacity group-hover:opacity-90"
                        style={{ background: r.heroBg }}
                        aria-hidden="true"
                      />
                      <p
                        className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                        style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
                      >
                        {rCat.label}
                      </p>
                      <h3
                        className="italic font-light text-foreground leading-[1.15]"
                        style={{
                          fontFamily: 'Instrument Sans, system-ui, sans-serif',
                          fontSize: 20,
                        }}
                      >
                        {r.title}
                      </h3>
                    </Link>
                  );
                })}
              </div>

              <div className="text-center mt-16">
                <Link
                  to="/magazine"
                  className="text-[10px] uppercase tracking-[0.28em] text-foreground border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
                >
                  Retour au Magazine
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MagazineArticle;
