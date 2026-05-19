import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ShopifyProduct } from '@/lib/shopify';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

const ShopifyProductCard = ({ product, index = 0 }: ShopifyProductCardProps) => {
  const node = product.node;
  const mainImage = node.images.edges[0]?.node.url;
  const hoverImage = node.images.edges[1]?.node.url;
  const price = parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0);
  const currency = node.priceRange.minVariantPrice.currencyCode === 'EUR' ? '€' : node.priceRange.minVariantPrice.currencyCode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link to={`/product/${node.handle}`} className="group block bg-white rounded-[4px] border-[0.5px] border-solid border-[#E8D8C8] shadow-none overflow-hidden">
        <div className="aspect-[3/4] overflow-hidden bg-secondary mb-4 relative">
          {mainImage ? (
            <img
              src={mainImage}
              alt={node.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform duration-700'
              }`}
              loading="lazy"
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
            />
          )}
        </div>
        <div className="space-y-1 text-center pb-4 px-3">
          <h3 className="text-brand text-[11px]">{node.title}</h3>
          <p className="text-sm font-sans text-muted-foreground">{currency}{price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ShopifyProductCard;
