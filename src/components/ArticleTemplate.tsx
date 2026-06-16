import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

interface ArticleTemplateProps {
  category: string;
  title: string;
  intro: string;
  heroBg?: string;
  sections: ArticleSection[];
  ctaLabel?: string;
  ctaTo?: string;
}

const ArticleTemplate = ({
  category,
  title,
  intro,
  heroBg = 'linear-gradient(135deg, #E8DCC8 0%, #C9B59A 100%)',
  sections,
  ctaLabel = 'Découvrir les sacs',
  ctaTo = '/sacs',
}: ArticleTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-[73px]">
        {/* HERO */}
        <section
          className="w-full h-[50vh] md:h-[70vh] flex items-end justify-center text-center px-6 pb-16 md:pb-24"
          style={{ background: heroBg }}
        >
          <div className="max-w-3xl">
            <p
              className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] mb-5 text-white/85"
              style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
            >
              {category}
            </p>
            <h1
              className="text-white italic font-light leading-[1.05]"
              style={{
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
                fontSize: 'clamp(32px, 5vw, 64px)',
              }}
            >
              {title}
            </h1>
          </div>
        </section>

        {/* BODY */}
        <article className="max-w-2xl mx-auto px-6 md:px-0 py-20 md:py-28">
          <p
            className="text-center italic mb-16 text-foreground/80"
            style={{
              fontFamily: 'Instrument Sans, system-ui, sans-serif',
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            {intro}
          </p>

          {sections.map((sec, i) => (
            <section key={i} className="mb-14">
              {sec.heading && (
                <h2
                  className="uppercase mb-6 text-foreground"
                  style={{
                    fontFamily: 'Instrument Sans, system-ui, sans-serif',
                    fontSize: 12,
                    letterSpacing: '0.22em',
                  }}
                >
                  {sec.heading}
                </h2>
              )}
              <div className="space-y-5 text-foreground/85" style={{ fontSize: 15, lineHeight: 1.85 }}>
                {sec.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-20 pt-12 border-t border-border text-center">
            <Link
              to={ctaTo}
              className="inline-block px-10 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.22em] hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
            >
              {ctaLabel}
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleTemplate;
