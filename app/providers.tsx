"use client";

import { ThemeProvider } from "next-themes";
import { ConvexClientProvider } from "@/lib/convex/convex-client-provider";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ThemeProvider>
  );
}
