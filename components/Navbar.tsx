"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="text-lg font-bold">
          My Store
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium">
            Products
          </Link>
          <Link href="/cart" className="text-sm font-medium">
            Cart
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingCart />
              </Link>
            }
          />

          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="border-t px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              href="/cart"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
