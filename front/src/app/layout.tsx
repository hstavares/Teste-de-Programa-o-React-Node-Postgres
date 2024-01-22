import "./globals.css";

export const metadata = {
  title: "Facilita Juridico - Hugo Tavares"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="container mx-auto py-4 px-4">{children}</body>
    </html>
  );
}
