import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

type Testimonial = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};

const Testimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12)
      .then(({ data }) => {
        if (data) setItems(data as Testimonial[]);
      });
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 bg-[#FAF7F2] border-t border-[#EFE9DF]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#B4A99A] mb-3">
          Témoignages
        </p>
        <h2 className="text-[20px] md:text-[24px] font-light text-[#1A1A1A] mb-12 tracking-[0.05em]">
          Elles parlent de Lovcicov
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {items.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="text-center px-4"
            >
              <p
                className="italic text-[14px] md:text-[15px] text-[#3A3A3A] leading-relaxed mb-5"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                « {t.content} »
              </p>
              <div className="w-8 h-px bg-[#C4A77A] mx-auto mb-4 opacity-60" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#888780]">
                {t.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
