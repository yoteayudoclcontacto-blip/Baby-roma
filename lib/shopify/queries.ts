import { cartFragment, productFragment } from "./fragments";

export const getShopInfoQuery = /* GraphQL */ `
  query ShopInfo {
    shop {
      name
      description
      primaryDomain {
        url
      }
    }
  }
`;

export const getProductsQuery = /* GraphQL */ `
  query Products($first: Int = 24, $sortKey: ProductSortKeys = BEST_SELLING, $query: String) {
    products(first: $first, sortKey: $sortKey, query: $query) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductByHandleQuery = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const getCartQuery = /* GraphQL */ `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${cartFragment}
`;
