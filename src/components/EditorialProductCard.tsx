import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resolveProductImage } from '@/lib/productImage';
import { prefetchRoute, prefetchImage } from '@/lib/prefetch';

export interface EditorialProduct {
  id: string;
  name: string;
  price: number | string;
  image: string;
  hover?: string;
}

interface Props {
  product: EditorialProduct;
  index?: number;
  eager?: boolean;
}

const EditorialProductCard = ({ product, index = 0, eager = false }: Props) => {
  const location = useLocation();
  const from = `${location.pathname}${location.search}`;
  const mainImage = resolveProductImage(product.image);
  const hoverImage = product.hover ? resolveProductImage(product.hover) : null;

  const priceLabel =
    typeof product.price === 'number' ? `€${product.price}` : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: eager ? 0 : Math.min(index, 6) * 0.05 }}
      className="h-full w-full"
    >
      <Link
        to={`/shop/${product.id}`}
        state={{ from }}
        onMouseEnter={() => {
          prefetchRoute('/shop/item');
          prefetchImage(mainImage);
          if (hoverImage) prefetchImage(hoverImage);
        }}
        onTouchStart={() => prefetchRoute('/shop/item')}
        className="group flex flex-col h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F0EDE7]">
          <img
            src={mainImage}
            alt={product.name}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={eager ? 'high' : 'auto'}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hoverImage
                ? 'group-hover:opacity-0'
                : 'group-hover:scale-[1.035]'
            }`}
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
            />
          )}
        </div>

        <div className="pt-5 md:pt-6 pb-2 text-center">
          <h3
            className="text-[#1A1A1A] font-light"
            style={{
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              lineHeight: 1.4,
            }}
          >
            {product.name}
          </h3>
          <p
            className="mt-2 text-[#5F5E5A] font-light"
            style={{ fontSize: 12, letterSpacing: '0.06em' }}
          >
            {priceLabel}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default EditorialProductCard;
