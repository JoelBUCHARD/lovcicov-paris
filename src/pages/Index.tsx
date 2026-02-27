import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-main.jpg';
import signatureImage from '@/assets/signature-tshirt.jpg';
import mysticImage from '@/assets/mystic-collection.jpg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Campagne éditoriale LOVCICOV"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-background/20" />
        </div>
        <div className="relative z-10 px-6 md:px-12 pb-16 md:pb-24 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-4 text-foreground">
              Des vêtements qui changent ce que vous ressentez.
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-md">
              Conçus pour influencer la posture, la présence et la confiance.
            </p>
            <div className="flex gap-4">
              <Link
                to="/shop"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 text-brand text-xs hover:opacity-80 transition-opacity"
              >
                Découvrir la Signature
              </Link>
              <Link
                to="/scan"
                className="inline-block border border-foreground px-8 py-3 text-brand text-xs hover:bg-foreground hover:text-background transition-all"
              >
                Découvrir votre état
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={signatureImage}
                alt="Le T-Shirt Signature"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
              Le T‑Shirt Signature
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Coton lourd. Silhouette structurée. Conçu pour se sentir bien.
            </p>
            <Link
              to="/shop/signature-tee-black"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 text-brand text-xs hover:opacity-80 transition-opacity"
            >
              Acheter
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Emotional Intelligence */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-secondary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-8">
            Conçu avec intention.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-10">
            Ce que vous portez influence la façon dont vous bougez, vous asseyez et vous présentez.
            Chaque pièce est conçue autour de trois états : Ancré. Présent. Confiant.
          </p>
          <Link
            to="/scan"
            className="inline-block border border-foreground px-8 py-3 text-brand text-xs hover:bg-foreground hover:text-background transition-all"
          >
            Faire le Scan d'État
          </Link>
        </motion.div>
      </section>

      {/* Mystic Lov */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-sm order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
              Mystic Lov
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Une ligne symbolique au sein de la maison LOVCICOV.
              Formes minimales. Sens subtil. Conçue pour soutenir ce que vous ressentez.
            </p>
            <Link
              to="/shop?collection=mystic"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 text-brand text-xs hover:opacity-80 transition-opacity"
            >
              Explorer la Collection
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={mysticImage}
                alt="Collection Mystic Lov"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
