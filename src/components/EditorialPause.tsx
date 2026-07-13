import { motion } from 'framer-motion';

interface Props {
  kicker?: string;
  line1: string;
  line2?: string;
  accent?: string;
}

const EditorialPause = ({ kicker, line1, line2, accent = '#8B7D6B' }: Props) => {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-2 md:col-span-4 py-16 md:py-24 px-6 text-center"
    >
      {kicker && (
        <p
          className="uppercase font-light mb-8"
          style={{ fontSize: 10, letterSpacing: '0.32em', color: accent }}
        >
          {kicker}
        </p>
      )}
      <p
        className="italic font-light text-[#1A1A1A] mx-auto"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(24px, 2.8vw, 34px)',
          lineHeight: 1.35,
          letterSpacing: '-0.005em',
          maxWidth: 640,
        }}
      >
        {line1}
        {line2 && (
          <>
            <br />
            {line2}
          </>
        )}
      </p>
    </motion.aside>
  );
};

export default EditorialPause;
