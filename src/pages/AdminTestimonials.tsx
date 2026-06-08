import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/sonner';
import type { User } from '@supabase/supabase-js';

type Testimonial = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};

const testimonialSchema = z.object({
  author: z
    .string()
    .trim()
    .min(1, 'Le nom de l\'auteur est requis')
    .max(100, 'Maximum 100 caractères'),
  content: z
    .string()
    .trim()
    .min(1, 'Le commentaire est requis')
    .max(500, 'Maximum 500 caractères'),
});

const AdminTestimonials = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Testimonial[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      const admin = !!roleData;
      setIsAdmin(admin);

      if (admin) {
        await loadTestimonials();
      }
      setLoading(false);
    };

    init();
  }, [navigate]);

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setItems(data as Testimonial[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = testimonialSchema.safeParse({ author, content });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase
      .from('testimonials')
      .insert([parsed.data]);
    setSubmitting(false);
    if (error) {
      toast.error('Erreur : ' + error.message);
      return;
    }
    toast.success('Témoignage ajouté');
    setAuthor('');
    setContent('');
    await loadTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
      toast.error('Erreur : ' + error.message);
      return;
    }
    toast.success('Supprimé');
    await loadTestimonials();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <Navbar />
        <div className="pt-40 text-center text-[12px] tracking-[0.2em] text-[#B4A99A] uppercase">
          Chargement…
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <Navbar />
        <div className="pt-40 px-6 text-center max-w-md mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#B4A99A] mb-3">
            Accès refusé
          </p>
          <p className="text-[14px] text-[#3A3A3A]">
            Cette page est réservée aux administrateurs.
          </p>
          <p className="text-[12px] text-[#888780] mt-6">
            Connecté en tant que {user?.email}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <div className="pt-32 md:pt-40 pb-20 px-6 max-w-3xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#B4A99A] mb-3 text-center">
          Administration
        </p>
        <h1 className="text-[24px] font-light text-[#1A1A1A] text-center mb-12 tracking-[0.05em]">
          Gestion des témoignages
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 mb-12 space-y-4 border border-[#EFE9DF]">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#888780] mb-2">
              Auteur
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={100}
              className="w-full border border-[#E0DBD2] px-3 py-2 text-[14px] bg-[#FAF7F2] focus:outline-none focus:border-[#1A1A1A]"
              placeholder="Marie L."
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#888780] mb-2">
              Témoignage ({content.length}/500)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
              rows={4}
              className="w-full border border-[#E0DBD2] px-3 py-2 text-[14px] bg-[#FAF7F2] focus:outline-none focus:border-[#1A1A1A] resize-none"
              placeholder="Une expérience unique..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.15em] uppercase py-3 hover:bg-[#333333] transition-colors disabled:opacity-50"
          >
            {submitting ? 'Ajout…' : 'Ajouter le témoignage'}
          </button>
        </form>

        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#888780] mb-4">
            {items.length} témoignage{items.length > 1 ? 's' : ''}
          </p>
          {items.map((t) => (
            <div key={t.id} className="bg-white p-5 border border-[#EFE9DF] flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="italic text-[14px] text-[#3A3A3A] mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  « {t.content} »
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#888780]">
                  — {t.author}
                </p>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-[10px] uppercase tracking-[0.15em] text-[#C94A4A] hover:underline shrink-0"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminTestimonials;
