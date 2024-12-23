import "@/styles/globals.css";
import { Providers } from "./Provider";

export const metadata = {
  title: "Mantra POS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="light antialiased min-h-screen">
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}
