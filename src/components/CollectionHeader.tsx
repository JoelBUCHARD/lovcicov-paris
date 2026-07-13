import { motion } from 'framer-motion';

interface Props {
  kicker: string;
  title: string;
  intro?: string;
  accent?: string;
}

const CollectionHeader = ({ kicker, title, intro, accent = '#8B7D6B' }: Props) => {
  return (
    <header className="px-6 md:px-10 pt-4 md:pt-8 pb-14 md:pb-20">
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
          className="mt-6 md:mt-7 italic font-light text-[#1A1A1A]"
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
            className="mx-auto mt-8 md:mt-10 text-[#5F5E5A] font-light"
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

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mt-12 h-px w-16 origin-center"
          style={{ backgroundColor: accent, opacity: 0.5 }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
};

export default CollectionHeader;
