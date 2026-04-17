import { Metal_Mania, EB_Garamond } from 'next/font/google';
import './globals.css';

const heading = Metal_Mania({ 
  weight: '400',
  subsets: ['latin'], 
  variable: '--font-heading' 
});

const body = EB_Garamond({ 
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