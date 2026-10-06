import type { Category, Product } from "@/types/products";

/**
 * Thin client for DummyJSON (https://dummyjson.com), chosen because it's
 * noticeably faster and more reliable than fakestoreapi.com, which this
 * project used previously.
 *
 * Every function here maps DummyJSON's response shape onto this project's
 * existing `Product` type (DummyJSON's `thumbnail` -> our `image`, etc.), so
 * every component that already consumes `Product` keeps working unchanged.
 * If the data source changes again later, only this file should need to.
 */

const BASE_URL = "https://dummyjson.com";

// Revalidate periodically rather than refetching on every request - this is
// catalog data, it doesn't need to be live-fresh on every page view.
const REVALIDATE_SECONDS = 60;

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

interface DummyJsonProductListResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface DummyJsonCategory {
  slug: string;
  name: string;
  url: string;
}

function mapProduct(raw: DummyJsonProduct): Product {
  return {
    id: raw.id,
    title: raw.title,
    price: raw.price,
    description: raw.description,
    category: raw.category,
    image: raw.thumbnail,
    rating: raw.rating,
    stock: raw.stock,
  };
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(limit = 20): Promise<Product[]> {
  const data = await fetchJson<DummyJsonProductListResponse>(
    `/products?limit=${limit}`,
  );
  return data.products.map(mapProduct);
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const data = await fetchJson<DummyJsonProductListResponse>(
    `/products/category/${encodeURIComponent(categorySlug)}`,
  );
  return data.products.map(mapProduct);
}

export async function getProductById(id: string | number): Promise<Product> {
  const data = await fetchJson<DummyJsonProduct>(
    `/products/${encodeURIComponent(String(id))}`,
  );
  return mapProduct(data);
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<DummyJsonCategory[]>("/products/categories");
  return data.map((c) => ({ slug: c.slug, name: c.name }));
}
