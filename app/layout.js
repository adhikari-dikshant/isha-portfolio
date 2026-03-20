import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Otis Valen | CG MWT — Codegrid",
  icons: {
    icon: "/images/global/site-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisScroll>
          <PageTransition />
          <Navbar />
          {children}
        </LenisScroll>
      </body>
    </html>
  );
}
