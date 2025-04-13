// ecommerce-tests/helpers/apiHelpers.ts

import { APIRequestContext } from '@playwright/test';

export async function getFirstProductId(request: APIRequestContext): Promise<number> {
  const response = await request.get('/products');
  if (response.status() !== 200) {
    throw new Error(`Failed to fetch products. Status: ${response.status()}`);
  }

  const products = await response.json();
  if (!products.length) {
    throw new Error('No products found in the database.');
  }

  return products[0].id;
}
