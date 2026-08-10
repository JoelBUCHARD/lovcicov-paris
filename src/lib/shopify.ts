import { toast } from 'sonner';
import { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } from '@/config/shopify';


export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    productType?: string;
    tags?: string[];
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          currentlyNotInStock?: boolean;
          quantityAvailable?: number | null;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active billing plan.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify error: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }
  return data;
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          productType
          tags
          variants(first: 20) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                currentlyNotInStock
                quantityAvailable
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      productType
      tags
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            currentlyNotInStock
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

export async function fetchShopifyProducts(first = 20, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query });
  return data?.data?.products?.edges || [];
}

export async function fetchShopifyProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.productByHandle || null;
}

// --- Variante Shopify explicite (identifiant venant de products.ts) ---

export interface ShopifyVariantInfo {
  id: string;
  title: string;
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  price: { amount: string; currencyCode: string };
  selectedOptions: Array<{ name: string; value: string }>;
  product: ShopifyProduct['node'];
}

const VARIANT_BY_ID_QUERY = `
  query GetVariant($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
        id
        title
        availableForSale
        currentlyNotInStock
        price { amount currencyCode }
        selectedOptions { name value }
        product {
          id
          title
          description
          handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          productType
          tags
          options { name values }
        }
      }
    }
  }
`;

export async function fetchShopifyVariantById(variantId: string): Promise<ShopifyVariantInfo | null> {
  try {
    const data = await storefrontApiRequest(VARIANT_BY_ID_QUERY, { id: variantId });
    const node = data?.data?.node;
    if (!node?.id) {
      console.error('[Shopify] Variante introuvable:', variantId, data);
      return null;
    }
    return {
      ...node,
      product: { ...node.product, variants: { edges: [] } },
    } as ShopifyVariantInfo;
  } catch (error) {
    console.error('[Shopify] Échec de la lecture de la variante', variantId, error);
    return null;
  }
}
