// src/app/layout.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

// 2. Configure the font (This was likely missing)
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  variable: '--font-montserrat',         
});

export const metadata = {
  title: 'AICTE IdeaLab - PDEU',
  description: 'Innovation and Fabrication Lab',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased" className={montserrat.className}>
        <Navbar />
        <main style={{ minHeight: '100vh' }}>
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
