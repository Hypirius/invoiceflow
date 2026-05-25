import "./globals.css";
import { geist } from "../fonts/geist";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} w-full h-screen`}>{children}</body>
    </html>
  );
}
