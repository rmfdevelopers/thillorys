import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-heading' 
});

const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Thillorys | Bespoke Fashion Atelier',
  description: 'The Art of Softly Spoken Style. Ibadan premier atelier specializing in bespoke bridal, couture, and high-glamour designs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased selection:bg-accent selection:text-white`}>
        {children}
      </body>
    </html>
  );
}