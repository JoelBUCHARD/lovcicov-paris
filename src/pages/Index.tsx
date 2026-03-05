import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-main.jpg';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15 },
  }),
};

const signatures = [
  'La présence parle avant les mots',
  'Pas conçu pour se fondre dans la masse',
  'Les standards définissent la réalité',
  'Choisi, jamais suivi',
];

const Index = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1. HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Campagne LOVCICOV"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-brand-lg text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-6"
          >
            LOVCICOV
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-editorial text-xl md:text-2xl text-primary-foreground/90 mb-12"
          >
            Pas une tendance. Un standard.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-10 py-4 text-brand text-xs hover:bg-primary-foreground/90 transition-all"
            >
              Découvrir la collection
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. MANIFESTE */}
      <section className="px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-3xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-brand text-xs text-muted-foreground mb-10"
          >
            Le Manifeste
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-14"
          >
            Le Standard
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>
              Il existe un moment dans la vie où l'on comprend que le monde que l'on nous a présenté n'est pas le seul possible.
            </p>
            <p>
              Un moment où quelque chose en nous refuse les limites ordinaires.
            </p>
            <p>
              Pour Georgiana Lovcicov, ce moment est devenu une philosophie.
            </p>
            <p>
              La conviction que la vie que l'on construit dépend des standards que l'on accepte.
            </p>
            <p>
              LOVCICOV est née de cette idée.
            </p>
            <p>
              Pas simplement comme une marque de vêtements,<br />
              mais comme une signature.
            </p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic mt-10">
              Un rappel que la présence se ressent bien avant les mots.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. COLLECTION */}
      <section className="bg-secondary px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-brand text-xs text-muted-foreground mb-8"
          >
            Collection I
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-10"
          >
            Le Standard
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-14 space-y-3"
          >
            <p>Une collection pensée comme un uniforme moderne pour ceux qui choisissent leur propre direction.</p>
            <p>Des silhouettes minimalistes. Des lignes précises. Des tons intemporels.</p>
            <p>Chaque pièce reflète clarté, confiance et intention.</p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-brand text-xs hover:opacity-85 transition-opacity"
            >
              Voir la collection
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. PIÈCES PHARES */}
      <section className="px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-brand text-xs text-muted-foreground mb-8"
          >
            Pièces Phares
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 border border-foreground px-10 py-4 text-brand text-xs hover:bg-foreground hover:text-background transition-all"
            >
              Voir tous les produits
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. LA FONDATRICE */}
      <section className="bg-secondary px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-3xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-brand text-xs text-muted-foreground mb-10"
          >
            L'histoire
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-14"
          >
            La Fondatrice
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>
              LOVCICOV a été fondée par Georgiana Lovcicov avec une vision simple mais puissante.
            </p>
            <p>
              Créer des vêtements qui reflètent un état d'esprit.
            </p>
            <p>
              Pas des pièces qui suivent les tendances, mais des créations qui incarnent présence, clarté et ambition.
            </p>
            <p>
              Pour Georgiana, le style n'a jamais été une question de conformité.
            </p>
            <p>
              Il a toujours été une manière d'exprimer la personne que l'on a décidé de devenir.
            </p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic mt-10">
              LOVCICOV est né de cette philosophie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. SIGNATURES */}
      <section className="px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-5xl mx-auto">
          {signatures.map((phrase, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="border-b border-border py-10 md:py-14"
            >
              <p className="text-editorial text-2xl md:text-4xl lg:text-5xl text-foreground">
                {phrase}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. L'UNIVERS LOVCICOV */}
      <section className="bg-foreground text-primary-foreground px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-brand text-xs text-primary-foreground/50 mb-10"
          >
            L'Univers
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-12"
          >
            L'univers LOVCICOV
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-primary-foreground/70 text-base md:text-lg leading-relaxed space-y-4"
          >
            <p>Plus qu'une marque.</p>
            <p>Une perspective.</p>
            <p>
              Une communauté grandissante de personnes qui choisissent des standards plus élevés, une pensée indépendante et une vision claire de la vie qu'elles construisent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-6"
          >
            Rejoindre le cercle
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-muted-foreground text-base leading-relaxed mb-10"
          >
            Soyez les premiers à découvrir les nouvelles collections, les sorties privées et les expériences exclusives.
          </motion.p>
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="flex-1 px-5 py-4 bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-8 py-4 text-brand text-xs hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              S'inscrire
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
