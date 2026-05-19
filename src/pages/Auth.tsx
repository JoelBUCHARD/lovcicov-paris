import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/account');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/account');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) setError(error.message);
      else setMessage('Vérifiez votre email pour confirmer votre inscription.');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/account' },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-sm mx-auto"
        >
          <h1 className="text-brand text-2xl md:text-3xl text-center mb-2 tracking-[0.2em]">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h1>
          <p className="text-muted-foreground text-sm text-center mb-10">
            {isLogin ? 'Accédez à votre espace personnel.' : 'Créez votre compte LOVCICOV.'}
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-secondary text-foreground text-sm px-4 py-3 mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-brand text-[11px] tracking-[0.1em] text-muted-foreground block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <label className="text-brand text-[11px] tracking-[0.1em] text-muted-foreground block mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-3 text-brand text-[11px] tracking-[0.15em] hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              {loading ? '...' : isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-[11px] tracking-[0.1em]">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full border border-border py-3 text-brand text-[11px] tracking-[0.1em] hover:bg-secondary/50 transition-colors flex items-center justify-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </button>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
              className="ml-2 text-foreground underline hover:opacity-60 transition-opacity"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
