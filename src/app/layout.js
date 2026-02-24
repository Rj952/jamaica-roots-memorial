export const metadata = {
  title: "Jamaica Roots \u2014 A Digital Heritage Sanctuary",
  description: "A sacred space to honor, remember, and preserve the lives of those who shaped us \u2014 rooted in Jamaican heritage, reaching across the diaspora.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
