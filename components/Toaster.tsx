"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Wraps sonner's Toaster so toast colors follow the site's light/dark theme
 * instead of defaulting to light only.
 */
export function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps["theme"]}
      position="bottom-right"
      richColors
      closeButton
      {...props}
    />
  );
}
