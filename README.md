# redux_practice

A mini e-commerce storefront built to practise Redux Toolkit inside a Next.js App Router project.

Product data comes from [Fake Store API](https://fakestoreapi.com). The home page renders two grids on purpose so the same data flow can be compared side by side: one fetched with local `useState`/`useEffect`, and one fetched through a Redux `createAsyncThunk`.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Redux Toolkit** + **react-redux**
- **Tailwind CSS v4** with **shadcn** components (built on **Base UI**)
- **next-themes** for light/dark mode

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Project layout

```
app/
  layout.tsx              root layout — ThemeProvider + ReduxProvider
  page.tsx                home page
components/
  Navbar.tsx              nav, theme toggle, mobile menu
  Hero.tsx                landing section
  Product.tsx             product grid via useState/useEffect
  ReduxProducts.tsx       product grid via Redux thunk
  ProductCard.tsx         single product card
  ReduxProvider.tsx       react-redux <Provider> (client component)
  ThemeProvider.tsx       next-themes provider (client component)
  ui/                     shadcn components
store/
  store.ts                configureStore, RootState, AppDispatch
  slices/productsSlice.ts electronics thunk + loading/error state
types/
  products.ts             Product, ProductsState
```

## Redux flow

`store/slices/productsSlice.ts` exposes `fetchCategoryData`, a thunk that loads
`https://fakestoreapi.com/products/category/electronics`. The slice tracks
`products`, `loading` and `error`, updated from the thunk's `pending` /
`fulfilled` / `rejected` cases. `ReduxProducts` dispatches it on mount and reads
the state with `useSelector`.

## Notes

- External images are allowed through `images.remotePatterns` in
  [`next.config.ts`](next.config.ts) — Next.js blocks unlisted hosts by design.
- The shadcn `Button` here is built on Base UI, which uses a `render` prop
  rather than Radix's `asChild`.
