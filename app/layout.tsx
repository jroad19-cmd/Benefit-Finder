import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BenefitFinder Pro Stronger',
  description: 'Senior and disabled grant and benefit finder starter app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
