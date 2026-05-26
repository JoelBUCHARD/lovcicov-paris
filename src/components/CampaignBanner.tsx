import { Link } from 'react-router-dom';
import { usePowerLovSalesCount } from '@/hooks/usePowerLovSalesCount';

const CampaignBanner = () => {
  const { sold, target } = usePowerLovSalesCount();

  return (
    <div
      className="sticky top-0 z-40 w-full flex items-center justify-center px-4"
      style={{ backgroundColor: '#1A1A1A', height: 48, fontFamily: 'Arial, sans-serif' }}
    >
      {/* Mobile */}
      <div className="flex md:hidden items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white">
        <span>Un sac à gagner</span>
        <span style={{ color: '#C4714A' }}>·</span>
        <Link to="/campagne-sac" className="text-white hover:underline">
          Participer →
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4 text-[11px] uppercase">
        <span className="text-white" style={{ letterSpacing: '0.15em' }}>
          Un sac Saint Laurent à gagner
        </span>
        <span style={{ color: '#C4714A' }}>·</span>
        <span style={{ color: '#C4714A', letterSpacing: '0.1em' }}>
          {sold} / {target} T-shirts vendus
        </span>
        <span style={{ color: '#C4714A' }}>·</span>
        <Link
          to="/campagne-sac"
          className="text-white hover:underline"
          style={{ letterSpacing: '0.15em' }}
        >
          Participer →
        </Link>
      </div>
    </div>
  );
};

export default CampaignBanner;
