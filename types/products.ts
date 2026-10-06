export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  // Optional: populated when the data source provides them (DummyJSON does).
  // Kept optional so nothing that already consumes Product breaks.
  rating?: number;
  stock?: number;
}

export interface Category {
  slug: string;
  name: string;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
