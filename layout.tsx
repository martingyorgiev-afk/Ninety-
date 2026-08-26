
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NINETY",
  description: "Road to 90 transformation system",
  appleWebApp: {
    capable: true,
    title: "NINETY",
    statusBarStyle: "default"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
