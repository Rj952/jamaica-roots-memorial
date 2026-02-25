import "./globals.css";

export const metadata = {
  title: "Jamaica Roots — A Digital Heritage Sanctuary",
  description:
    "A sacred space to honor, remember, and preserve the lives of those who shaped us — rooted in Jamaican heritage, reaching across the diaspora.",
  keywords: [
    "Jamaica",
    "memorial",
    "heritage",
    "diaspora",
    "remembrance",
    "digital sanctuary",
    "Jamaican culture",
  ],
  openGraph: {
    title: "Jamaica Roots — Where Memory Becomes Legacy",
    description:
      "A digital heritage sanctuary to honor and preserve the memories of loved ones, rooted in Jamaican heritage.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamaica Roots — Where Memory Becomes Legacy",
    description:
      "A sacred space to honor, remember, and preserve the lives of those who shaped us.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
