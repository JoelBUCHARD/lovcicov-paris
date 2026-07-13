import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ShopifyProduct } from '@/lib/shopify';
import { prefetchRoute, prefetchImage } from '@/lib/prefetch';
import { products } from '@/data/products';

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

const getImage = (key?: string | null) => {
  if (!key) return '';
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const getLocalVisuals = (product: ShopifyProduct['node']) => {
  const localProduct = products.find((item) => item.shopifyHandle === product.handle);
  if (localProduct) {
    return {
      mainImage: getImage(localProduct.image),
      hoverImage: getImage(localProduct.gallery?.[0]),
    };
  }

  const normalizedTitle = normalize(product.title);
  if (normalizedTitle === 't-shirt powerlov') {
    return {
      mainImage: getImage('powerlov-hero-new'),
      hoverImage: getImage('powerlov-grid-bold-badass-street'),
    };
  }

  return {
    mainImage: '',
    hoverImage: '',
  };
};

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
  preferLocalVisuals?: boolean;
}

const ShopifyProductCard = ({ product, index = 0, preferLocalVisuals = false }: ShopifyProductCardProps) => {
  const location = useLocation();
  const node = product.node;
  const storefrontMainImage = node.images.edges[0]?.node.url;
  const storefrontHoverImage = node.images.edges[1]?.node.url;
  const localVisuals = getLocalVisuals(node);
  const mainImage = preferLocalVisuals ? localVisuals.mainImage || storefrontMainImage : storefrontMainImage || localVisuals.mainImage;
  const hoverImage = preferLocalVisuals ? localVisuals.hoverImage || storefrontHoverImage : storefrontHoverImage || localVisuals.hoverImage;
  const price = parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0);
  const currency = node.priceRange.minVariantPrice.currencyCode === 'EUR' ? '€' : node.priceRange.minVariantPrice.currencyCode;
  const from = `${location.pathname}${location.search}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full w-full"
    >
      <Link
        to={`/product/${node.handle}`}
        state={{ from }}
        onMouseEnter={() => { prefetchRoute('/product'); prefetchImage(storefrontMainImage); prefetchImage(storefrontHoverImage); }}
        onTouchStart={() => { prefetchRoute('/product'); }}
        className="group flex flex-col h-full bg-white rounded-[4px] border-[0.5px] border-solid border-[#E8D8C8] shadow-none overflow-hidden"
      >
        <div className="aspect-[3/4] overflow-hidden bg-secondary mb-4 relative shrink-0">
          {mainImage ? (
            <img
              src={mainImage}
              alt={node.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform duration-700'
              }`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
              Pas d'image
            </div>
          )}
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${node.title} — vue alternative`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className="space-y-1 text-center pb-4 px-3 mt-auto">
          <h3 className="text-brand text-[11px]">{node.title}</h3>
          <p className="text-sm font-sans text-muted-foreground">{currency}{price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ShopifyProductCard;
