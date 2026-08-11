import { products } from '@/data/products';
import { resolveProductImage } from '@/lib/productImage';
console.log('total local', products.length);
for (const p of products) {
  const imgs = [p.image, ...(p.gallery ?? [])].filter(Boolean);
  const unresolved = imgs.filter(k => !resolveProductImage(k));
  console.log([p.id, p.shopifyHandle ?? '-', imgs.length, unresolved.length ? 'UNRESOLVED:'+unresolved.join(',') : 'ok'].join(' | '));
}
