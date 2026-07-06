import "./globals.css";

export const metadata = {
  title: "PicTrack",
  description:
    "Icon and voice-first vaccine & milestone tracker for low-literacy caregivers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
