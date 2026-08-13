import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pushDataLayer } from '@/lib/tracking';

/** Pousse un pageview SPA à chaque changement de route. Ne rend rien. */
const TrackingRouter = () => {
  const location = useLocation();

  useEffect(() => {
    pushDataLayer({
      event: 'spa_pageview',
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default TrackingRouter;
