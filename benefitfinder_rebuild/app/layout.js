import './globals.css';

export const metadata = {
  title: 'Benefit Finder Verified PA',
  description: 'Verified Pennsylvania benefits and support finder starter'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
