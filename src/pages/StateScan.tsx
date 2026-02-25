import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { scanQuestions, stateDescriptions, products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StateScan = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (state: string) => {
    const newAnswers = [...answers, state];
    setAnswers(newAnswers);

    if (currentQuestion < scanQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowEmailForm(true);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Count states
    const counts: Record<string, number> = {};
    answers.forEach((a) => {
      counts[a] = (counts[a] || 0) + 1;
    });
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    setResult(dominant);
  };

  const recommendedProducts = result
    ? products.filter((p) => p.state === result).slice(0, 3)
    : [];

  const progress = ((currentQuestion + 1) / scanQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-6 md:px-12 min-h-screen">
        <AnimatePresence mode="wait">
          {!showEmailForm && !result && (
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto pt-12 md:pt-24"
            >
              <div className="mb-12">
                <div className="w-full h-px bg-border mb-2">
                  <div
                    className="h-px bg-foreground transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {currentQuestion + 1} / {scanQuestions.length}
                </p>
              </div>

              <h1 className="text-2xl md:text-3xl font-serif font-light mb-12">
                {scanQuestions[currentQuestion].question}
              </h1>

              <div className="space-y-4">
                {scanQuestions[currentQuestion].options.map((option) => (
                  <button
                    key={option.text}
                    onClick={() => handleAnswer(option.state)}
                    className="w-full text-left px-6 py-5 border border-border hover:border-foreground transition-colors text-sm"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {showEmailForm && !result && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto pt-12 md:pt-24 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-light mb-4">
                Your result is ready.
              </h2>
              <p className="text-muted-foreground text-sm mb-10">
                Enter your email to discover your state.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-8 py-4 text-brand text-xs hover:opacity-80 transition-opacity"
                >
                  Reveal my state
                </button>
              </form>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto pt-12 md:pt-24"
            >
              <div className="text-center mb-20">
                <p className="text-brand text-xs mb-4 opacity-50">Your state</p>
                <h1 className="text-5xl md:text-7xl font-serif font-light mb-6">
                  {stateDescriptions[result].title}
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
                  {stateDescriptions[result].description}
                </p>
              </div>

              {recommendedProducts.length > 0 && (
                <div>
                  <h2 className="text-xl font-serif font-light mb-8">Recommended for you</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendedProducts.map((product, i) => (
                      <ProductCard key={product.id} product={product} index={i} />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-16 text-center">
                <Link
                  to="/shop"
                  className="inline-block border border-foreground px-8 py-3 text-brand text-xs hover:bg-foreground hover:text-background transition-all"
                >
                  Browse All
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default StateScan;
