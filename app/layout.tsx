import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cagada Remunerada — quanto rende seu tempo no trono?",
  description:
    "Uma calculadora bem-humorada para estimar quanto do seu salário corresponde ao tempo no banheiro durante o expediente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
