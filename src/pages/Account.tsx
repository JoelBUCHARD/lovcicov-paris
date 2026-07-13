import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import type { User } from '@supabase/supabase-js';

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);
      setIsAdmin(!!roles?.some((r) => r.role === 'admin'));
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10 text-center">
        <p className="text-muted-foreground text-sm">Chargement...</p>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Mon compte — LOVCICOV Paris" description="Votre espace personnel LOVCICOV Paris." path="/account" noindex />
      <Navbar />
      <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-brand text-2xl md:text-3xl text-center mb-2 tracking-[0.2em]">
            Mon Compte
          </h1>
          <p className="text-muted-foreground text-sm text-center mb-12">
            Votre espace personnel LOVCICOV.
          </p>

          <div className="border border-border p-6 mb-8">
            <p className="text-brand text-[11px] tracking-[0.1em] text-muted-foreground mb-2">Email</p>
            <p className="text-sm text-foreground">{user?.email}</p>
          </div>

          <div className="border border-border p-6 mb-8">
            <p className="text-brand text-[11px] tracking-[0.1em] text-muted-foreground mb-2">Membre depuis</p>
            <p className="text-sm text-foreground">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
            </p>
          </div>

          {isAdmin && (
            <Link
              to="/admin/products"
              className="block w-full text-center border border-border py-3 mb-4 text-brand text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              Administration — Visibilité produits
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full border border-border py-3 text-brand text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
          >
            Se déconnecter
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
