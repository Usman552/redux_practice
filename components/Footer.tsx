export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight">NEXORA</h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Modern essentials designed for everyday life with style comfort and
            confidence
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Shop</h3>

          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>New arrivals</li>
            <li>Women</li>
            <li>Men</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Support</h3>

          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>Contact us</li>
            <li>Shipping & returns</li>
            <li>Privacy policy</li>
            <li>Terms & conditions</li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 NEXORA. All rights reserved</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}