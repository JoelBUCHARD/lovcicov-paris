import { motion } from 'framer-motion';

interface Props {
  kicker: string;
  title: string;
  intro?: string;
  accent?: string;
}

const CollectionHeader = ({ kicker, title, intro, accent = '#8B7D6B' }: Props) => {
  return (
    <header className="px-6 md:px-10 pt-2 md:pt-4 pb-8 md:pb-12">
      <div className="mx-auto max-w-[720px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase font-light"
          style={{
            fontSize: 10,
            letterSpacing: '0.32em',
            color: accent,
          }}
        >
          {kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 md:mt-5 italic font-light text-[#1A1A1A]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(44px, 6.4vw, 88px)',
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </motion.h1>

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mx-auto mt-5 md:mt-6 text-[#5F5E5A] font-light"
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              maxWidth: 520,
              letterSpacing: '0.005em',
            }}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </header>
  );
};

export default CollectionHeader;
