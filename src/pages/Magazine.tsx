import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import {
  magazineArticles,
  magazineCategories,
  type MagazineCategoryId,
} from '@/data/magazine';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const Magazine = () => {
  const [activeCat, setActiveCat] = useState<MagazineCategoryId | 'all'>('all');

  const featured = magazineArticles[3] ?? magazineArticles[0]; // "La posture comme vêtement"
  const rest = useMemo(
    () => magazineArticles.filter(a => a.slug !== featured.slug),
    [featured.slug],
  );

  const filtered = useMemo(
    () => (activeCat === 'all' ? rest : rest.filter(a => a.category === activeCat)),
    [activeCat, rest],
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'LOVCICOV Magazine',
    url: 'https://lovcicov.com/magazine',
    description:
      'Éditorial de la maison LOVCICOV Paris — style, symbolisme, pierres naturelles, savoir-faire et portraits.',
    publisher: {
      '@type': 'Organization',
      name: 'LOVCICOV Paris',
      url: 'https://lovcicov.com',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="LOVCICOV Magazine — style, symbolisme et savoir-faire"
        description="Le magazine éditorial de LOVCICOV Paris. Récits, guides et portraits autour du vestiaire, des pierres naturelles et de la posture."
        path="/magazine"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-[73px]">
        {/* Masthead */}
        <section className="border-b border-border">
          <div className="max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-16 md:pt-32 md:pb-20 text-center">
            <p
              className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-muted-foreground mb-6"
              style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
            >
              LOVCICOV Magazine
            </p>
            <h1
              className="italic font-light leading-[1.02] text-foreground"
              style={{
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
                fontSize: 'clamp(40px, 6vw, 84px)',
              }}
            >
              L’écriture d’une maison.
            </h1>
            <p
              className="max-w-xl mx-auto mt-8 text-foreground/70"
              style={{
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
                fontSize: 15,
                lineHeight: 1.75,
              }}
            >
              Un éditorial lent, pensé pour prolonger l’univers de LOVCICOV. Style, symbolisme,
              pierres naturelles, savoir-faire et portraits — à lire sans se presser.
            </p>
          </div>
        </section>

        {/* Featured article */}
        <section className="border-b border-border">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <Link
              to={`/magazine/${featured.slug}`}
              className="group grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            >
              <div
                className="aspect-[4/5] md:aspect-[4/5] w-full transition-opacity group-hover:opacity-90"
                style={{ background: featured.heroBg }}
                aria-hidden="true"
              />
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-5"
                  style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
                >
                  À la une · {magazineCategories.find(c => c.id === featured.category)?.label}
                </p>
                <h2
                  className="italic font-light leading-[1.08] text-foreground mb-6"
                  style={{
                    fontFamily: 'Instrument Sans, system-ui, sans-serif',
                    fontSize: 'clamp(28px, 3.6vw, 46px)',
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  className="text-foreground/75 mb-8 max-w-lg"
                  style={{ fontSize: 15, lineHeight: 1.8 }}
                >
                  {featured.excerpt}
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                  style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
                >
                  {formatDate(featured.publishedAt)} · Lecture {featured.readingTime} min
                </p>
                <span
                  className="mt-8 inline-block text-[10px] uppercase tracking-[0.28em] text-foreground border-b border-foreground pb-1"
                  style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
                >
                  Lire l’article
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Category filter */}
        <section>
          <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-20">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              <button
                onClick={() => setActiveCat('all')}
                className={`text-[10px] uppercase tracking-[0.24em] pb-1 border-b transition-colors ${
                  activeCat === 'all'
                    ? 'text-foreground border-foreground'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
                style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
              >
                Tout
              </button>
              {magazineCategories.map(cat => {
                const has = magazineArticles.some(a => a.category === cat.id);
                if (!has) return null;
                const active = activeCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    className={`text-[10px] uppercase tracking-[0.24em] pb-1 border-b transition-colors ${
                      active
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                    style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filtered.map(article => {
                const cat = magazineCategories.find(c => c.id === article.category);
                return (
                  <Link
                    key={article.slug}
                    to={`/magazine/${article.slug}`}
                    className="group block"
                  >
                    <div
                      className="w-full aspect-[4/5] mb-6 transition-opacity group-hover:opacity-90"
                      style={{ background: article.heroBg }}
                      aria-hidden="true"
                    />
                    <p
                      className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-3"
                      style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
                    >
                      {cat?.label}
                    </p>
                    <h3
                      className="italic font-light text-foreground mb-3 leading-[1.15]"
                      style={{
                        fontFamily: 'Instrument Sans, system-ui, sans-serif',
                        fontSize: 22,
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-foreground/70 mb-4"
                      style={{ fontSize: 14, lineHeight: 1.7 }}
                    >
                      {article.excerpt}
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                      style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
                    >
                      {formatDate(article.publishedAt)} · {article.readingTime} min
                    </p>
                  </Link>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-16">
                De nouveaux articles arrivent bientôt dans cette rubrique.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Magazine;
