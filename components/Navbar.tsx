"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../components/ui/button";
import { useAppSelector } from "@/store/hooks";
import LoginButton from "./LoginButton";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Left - Logo */}
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold tracking-tight">
            NEXORA
          </Link>
        </div>

        {/* Center - Navigation */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>

          <Link
            href="/categories"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Categories
          </Link>
        </div>

        {/* Right - Actions */}
        <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
          {/* Search */}
          {isSearchOpen ? (
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="search"
                placeholder="Search products..."
                autoFocus
                className="h-9 w-48 rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search products"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search />
            </Button>
          )}

          {/* Wishlist */}
          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={
              <Link href="/cart" aria-label="Shopping cart">
                <div className="relative">
                  <ShoppingCart />

                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            }
          />

          {/* Theme */}
          <ThemeToggle />

          {/* User */}
          <LoginButton />
        </div>

        {/* Mobile Actions */}
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

      {/* Mobile Menu */}
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
              href="/categories"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
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
