import { Roboto } from "next/font/google";
import "./globals.css";
import { AppHeader, Container } from "@/components";
import StoreProvider from "./StoreProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Pokedex V2",
  description: "The pokedex on your hands",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={roboto.className}>
          <AppHeader />
          <Container maxWidth="xl">{children}</Container>
        </body>
      </StoreProvider>
    </html>
  );
}
