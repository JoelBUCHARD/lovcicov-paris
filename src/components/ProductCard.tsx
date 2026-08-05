import { formatPrice } from '@/lib/price';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';
import { prefetchRoute, prefetchImage } from '@/lib/prefetch';
import { displayProductName } from '@/lib/productDisplayName';

const imageModulesJpg = import.meta.glob('@/assets/**/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesJpeg = import.meta.glob('@/assets/**/*.jpeg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/**/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesPng = import.meta.glob('@/assets/**/*.png', { eager: true, import: 'default' }) as Record<string, string>;
const assetJsonModules = import.meta.glob('@/assets/**/*.asset.json', { eager: true }) as Record<string, { url?: string; default?: { url?: string } }>;

const assetJsonAsImages: Record<string, string> = {};
for (const [path, mod] of Object.entries(assetJsonModules)) {
  const url = mod?.url ?? mod?.default?.url;
  if (url) assetJsonAsImages[path.replace(/\.asset\.json$/, '')] = url;
}

const imageModules = { ...imageModulesJpg, ...imageModulesJpeg, ...imageModulesWebp, ...imageModulesPng, ...assetJsonAsImages };

const getImage = (key: string) => {
  // Visuels servis depuis /public (ex. /images/sacs/LOV-BIG-01_01.jpg)
  if (!key) return '';
  if (key.startsWith('/') || /^https?:\/\//i.test(key)) return key;
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

const getBadgeStyles = (collection: string, badge?: string) => {
  if (!badge) return '';
  const normalizedBadge = badge.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (collection === 'standard' && normalizedBadge.includes('UNISEX')) {
    return 'bg-[#F5F3EE] text-[#1A1A1A] border border-[#1A1A1A]';
  }

  return '';
};

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const location = useLocation();
  const mainImage = getImage(product.image);
  const hoverImage = product.gallery?.[0] ? getImage(product.gallery[0]) : null;
  const from = `${location.pathname}${location.search}`;
  // Les sacs tressés ont leur propre route de fiche produit
  const to = product.collection === 'sacs' ? `/sacs/${product.id}` : `/shop/${product.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full w-full"
    >
      <Link
        to={to}
        state={{ from }}
        onMouseEnter={() => { prefetchRoute('/shop/item'); prefetchImage(mainImage); prefetchImage(hoverImage); }}
        onTouchStart={() => { prefetchRoute('/shop/item'); }}
        className="group flex flex-col h-full bg-white rounded-[4px] border-[0.5px] border-solid border-[#E8D8C8] shadow-none overflow-hidden"
      >
        <div className="aspect-[3/4] overflow-hidden bg-secondary mb-3 relative shrink-0">
          <img
            src={mainImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform duration-700'
            }`}
            loading="lazy"
            decoding="async"
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${product.name} — vue alternative`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className="space-y-1 text-center pb-3 px-2 mt-auto">
          <h3 className="text-brand text-[11px] uppercase tracking-[0.12em] product-card-title">{displayProductName(product.name)}</h3>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#1A1A1A' }}>{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
