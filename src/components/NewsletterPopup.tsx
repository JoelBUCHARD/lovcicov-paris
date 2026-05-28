import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import lovcicovLogo from '@/assets/lovcicov-logo.png';

const STORAGE_KEY = 'lovcicov_newsletter';

const emailSchema = z.string().trim().email({ message: 'Email invalide' }).max(255);

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'submitted' || stored === 'dismissed') return;
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    if (localStorage.getItem(STORAGE_KEY) !== 'submitted') {
      localStorage.setItem(STORAGE_KEY, 'dismissed');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    localStorage.setItem(STORAGE_KEY, 'submitted');
    toast.success('Bienvenue dans le cercle LOVCICOV');
    setSubmitting(false);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-black text-white p-10 md:p-12 text-center animate-in zoom-in-95 duration-300">
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <img src={lovcicovLogo} alt="LOVCICOV" className="h-8 md:h-10 w-auto mx-auto mb-6 brightness-0 invert" />
        <h2 className="text-brand text-[15px] md:text-[16px] tracking-[0.2em] mb-4">
          REJOINS LE CERCLE
        </h2>
        <p className="text-[12px] md:text-[13px] leading-relaxed text-white/70 mb-8 max-w-xs mx-auto">
          Accédez en avant-première aux nouvelles collections et offres exclusives.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            maxLength={255}
            className="w-full bg-transparent border border-white/30 px-4 py-3 text-[12px] text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-black py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            Je rejoins
          </button>
        </form>

        <button
          onClick={close}
          className="mt-6 text-[10px] text-white/50 hover:text-white/80 underline underline-offset-4 transition-colors tracking-[0.1em]"
        >
          Non merci
        </button>
      </div>
    </div>
  );
};

export default NewsletterPopup;
