import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LegalPageProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

const LegalPage = ({ eyebrow, title, children }: LegalPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand text-[11px] text-muted-foreground mb-6 tracking-[0.2em]">
              {eyebrow}
            </p>
            <h1 className="text-2xl md:text-3xl font-medium text-foreground">{title}</h1>
          </div>
          <div className="legal-content space-y-8 text-sm md:text-[15px] leading-relaxed text-foreground/85">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
