import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const BG = '#FAF7F2';
const INK = '#1A1A1A';
const ACCENT = '#8B6A4A';
const ACCENT_HOVER = '#6B4A2E';

// Palette des cuirs (placeholder — remplacer par vraies photos couleur en septembre)
const COLORS: { name: string; hex: string; product: 'big-lov' | 'small-lov' }[] = [
  { name: 'Noir',     hex: '#1A1A1A', product: 'big-lov' },
  { name: 'Camel',    hex: '#B47B4A', product: 'small-lov' },
  { name: 'Crème',    hex: '#E8DCC8', product: 'big-lov' },
  { name: 'Cognac',   hex: '#8B4A2E', product: 'small-lov' },
  { name: 'Rouge',    hex: '#A02828', product: 'big-lov' },
  { name: 'Chocolat', hex: '#3F2818', product: 'small-lov' },
];

const ARTICLES = [
  {
    category: 'Savoir-faire',
    title: 'Le geste du cuir tressé',
    excerpt: "Un héritage de main, un cuir pleine fleur, et beaucoup de patience.",
    to: '/journal/sacs-cuir-tresse',
    bg: 'linear-gradient(135deg, #6B4A2E 0%, #2E1F10 100%)',
  },
  {
    category: 'Style',
    title: 'Comment choisir sa couleur',
    excerpt: 'Six teintes, six humeurs. Un petit guide pour trouver sa signature.',
    to: '/journal/sacs-choisir-couleur',
    bg: 'linear-gradient(135deg, #C8463A 0%, #E8DCC8 100%)',
  },
  {
    category: 'Récit',
    title: "L'histoire du Big LOV",
    excerpt: "Comment un sac est devenu, pour la maison, une manière de parler de présence.",
    to: '/journal/sacs-histoire-big-lov',
    bg: 'linear-gradient(135deg, #2E1F10 0%, #6B4A2E 100%)',
  },
];

const Sacs = () => {
  return (
    <div style={{ backgroundColor: BG }} className="min-h-screen">
      <SEO
        title="Sacs LOVCICOV — Cuir tressé pleine fleur | LOVCICOV Paris"
        description="Les sacs LOVCICOV Paris : cuir pleine fleur tressé à la main. Big LOV et Small LOV, six teintes signatures."
        path="/sacs"
      />
      <Navbar />

      <div className="pt-[73px]">

        {/* HERO */}
        <section
          className="relative w-screen h-[58svh] md:h-screen overflow-hidden mt-0 mb-5 md:my-5 flex items-end"
          style={{
            background:
              'linear-gradient(135deg, #6B4A2E 0%, #A0623E 35%, #C8463A 70%, #E8DCC8 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55) 90%)' }}
          />
          <div className="relative z-10 w-full px-6 md:px-12 pb-10 md:pb-16">
            <p
              className="mb-3 text-[8px] md:text-[11px] uppercase text-white/85"
              style={{ letterSpacing: '0.22em', fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
            >
              Nouveau — Big LOV & Small LOV
            </p>
            <h1
              className="text-white italic mb-4 font-light leading-[1.05]"
              style={{
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
                fontSize: 'clamp(36px, 6vw, 80px)',
                maxWidth: 720,
              }}
            >
              Une silhouette,<br />une palette d'émotions.
            </h1>
            <Link
              to="/shop/big-lov"
              className="inline-block mt-4 md:mt-6 uppercase transition-colors text-[8px] md:text-[11px] px-3.5 py-1.5 md:px-7 md:py-3"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                letterSpacing: '0.2em',
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F0F0F0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
            >
              Découvrir la collection
            </Link>
          </div>
        </section>

        {/* INTRO */}
        <section className="w-full px-6 md:px-10 py-12 md:py-20" style={{ backgroundColor: BG }}>
          <div className="max-w-[640px] mx-auto text-center">
            <p
              className="mb-5 text-[11px] uppercase"
              style={{
                color: 'rgba(26,26,26,0.48)',
                letterSpacing: '0.22em',
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
              }}
            >
              La collection
            </p>
            <p
              style={{
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
                fontSize: 15,
                color: 'rgba(26,26,26,0.78)',
                margin: '0 auto',
                lineHeight: 1.9,
              }}
            >
              Big LOV et Small LOV sont nos premiers sacs en cuir tressé à la main.
              <br /><br />
              Une silhouette pensée comme une signature, déclinée dans une palette de couleurs choisies comme autant d'humeurs.
              Pièces faites pour durer, à porter chaque jour, à patiner avec le temps.
            </p>
          </div>
        </section>

        {/* GALERIE COULEURS */}
        <section className="w-full px-6 md:px-10 pb-12 md:pb-20" style={{ backgroundColor: BG }}>
          <div className="max-w-6xl mx-auto">
            <p
              className="text-center mb-10 text-[11px] uppercase"
              style={{
                color: 'rgba(26,26,26,0.48)',
                letterSpacing: '0.22em',
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
              }}
            >
              Six teintes
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {COLORS.map((c) => (
                <Link
                  key={c.name}
                  to={`/shop/${c.product}`}
                  className="group block relative overflow-hidden"
                  style={{ aspectRatio: '4 / 5', backgroundColor: c.hex }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between">
                    <span
                      className="text-[10px] md:text-[11px] uppercase"
                      style={{
                        color: c.hex === '#E8DCC8' || c.hex === '#B47B4A' ? '#1A1A1A' : '#FFFFFF',
                        letterSpacing: '0.2em',
                        fontFamily: 'Instrument Sans, system-ui, sans-serif',
                      }}
                    >
                      {c.name}
                    </span>
                    <span
                      className="text-[9px] md:text-[10px] uppercase opacity-70"
                      style={{
                        color: c.hex === '#E8DCC8' || c.hex === '#B47B4A' ? '#1A1A1A' : '#FFFFFF',
                        letterSpacing: '0.2em',
                        fontFamily: 'Instrument Sans, system-ui, sans-serif',
                      }}
                    >
                      {c.product === 'big-lov' ? 'Big LOV' : 'Small LOV'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* RÉCIT PLEINE LARGEUR */}
        <section
          className="w-full px-6 md:px-10 py-20 md:py-32"
          style={{ backgroundColor: '#F6F1EB' }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="mb-8 text-[11px] uppercase"
              style={{
                color: 'rgba(26,26,26,0.48)',
                letterSpacing: '0.22em',
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
              }}
            >
              L'intention
            </p>
            <p
              className="italic mb-10"
              style={{
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
                fontSize: 22,
                color: '#1A1A1A',
                lineHeight: 1.5,
                fontWeight: 300,
              }}
            >
              «&nbsp;Un sac qu'on garde dix ans. Qu'on porte le matin et le soir.
              Qu'on prête, qu'on retrouve, qu'on patine.&nbsp;»
            </p>
            <div
              className="text-left md:text-center space-y-5"
              style={{
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
                fontSize: 15,
                color: 'rgba(26,26,26,0.78)',
                lineHeight: 1.9,
              }}
            >
              <p>
                Le cuir tressé appartient à une lignée ancienne d'objets faits main.
                Chez LOVCICOV, nous l'avons choisi parce qu'il porte une promesse simple :
                celle d'un objet qui se bonifie avec le temps.
              </p>
              <p>
                Chaque sac est assemblé à la main, lanière après lanière. Le tressage n'est pas
                un détail décoratif — c'est la structure même du sac. C'est ce qui lui donne
                sa tenue, sa souplesse, son caractère.
              </p>
              <p>
                Les couleurs ont été choisies comme on choisit une humeur : un Noir radical,
                un Camel intemporel, un Rouge de caractère, un Crème lumineux, un Cognac de saison,
                un Chocolat de transition. Six teintes, six manières d'entrer dans une journée.
              </p>
            </div>
          </div>
        </section>

        {/* CTA PRODUIT */}
        <section
          className="w-full px-6 md:px-10 py-20 md:py-28 text-center"
          style={{ backgroundColor: BG }}
        >
          <p
            className="mb-6 text-[11px] uppercase"
            style={{
              color: 'rgba(26,26,26,0.48)',
              letterSpacing: '0.22em',
              fontFamily: 'Instrument Sans, system-ui, sans-serif',
            }}
          >
            Disponibles dès maintenant
          </p>
          <h2
            className="italic mb-10 font-light"
            style={{
              fontFamily: 'Instrument Sans, system-ui, sans-serif',
              fontSize: 'clamp(30px, 4.5vw, 56px)',
              color: '#1A1A1A',
              lineHeight: 1.1,
            }}
          >
            Big LOV. Small LOV.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/shop/big-lov"
              className="inline-block px-10 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.22em] hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
            >
              Découvrir Big LOV
            </Link>
            <Link
              to="/shop/small-lov"
              className="inline-block px-10 py-4 border border-foreground text-foreground text-[10px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
              style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
            >
              Découvrir Small LOV
            </Link>
          </div>
        </section>

        {/* ARTICLES */}
        <section
          className="w-full px-6 md:px-10 py-20 md:py-28 border-t border-border"
          style={{ backgroundColor: BG }}
        >
          <div className="max-w-6xl mx-auto">
            <p
              className="text-center mb-3 text-[11px] uppercase"
              style={{
                color: 'rgba(26,26,26,0.48)',
                letterSpacing: '0.22em',
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
              }}
            >
              Le Journal
            </p>
            <h2
              className="text-center italic mb-14 font-light"
              style={{
                fontFamily: 'Instrument Sans, system-ui, sans-serif',
                fontSize: 'clamp(24px, 3.5vw, 40px)',
                color: '#1A1A1A',
              }}
            >
              Autour des sacs.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {ARTICLES.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className="group block"
                >
                  <div
                    className="w-full mb-5 overflow-hidden"
                    style={{ aspectRatio: '4 / 5', background: a.bg }}
                  >
                    <div className="w-full h-full group-hover:scale-[1.03] transition-transform duration-[600ms] ease-out" />
                  </div>
                  <p
                    className="mb-2 text-[10px] uppercase text-muted-foreground"
                    style={{
                      letterSpacing: '0.2em',
                      fontFamily: 'Instrument Sans, system-ui, sans-serif',
                    }}
                  >
                    {a.category}
                  </p>
                  <h3
                    className="mb-2 group-hover:underline"
                    style={{
                      fontFamily: 'Instrument Sans, system-ui, sans-serif',
                      fontSize: 18,
                      color: '#1A1A1A',
                      lineHeight: 1.3,
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    className="text-muted-foreground"
                    style={{
                      fontFamily: 'Instrument Sans, system-ui, sans-serif',
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {a.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Sacs;
