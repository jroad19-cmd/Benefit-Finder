import './globals.css';

export const metadata = {
  title: 'Benefit Finder',
  description: 'Senior and disability benefit finder'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
