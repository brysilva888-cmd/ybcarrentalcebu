import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';

const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { config } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased">
      {/* Integrated Header/Navbar to prevent "File Not Found" errors */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-brand' : 'text-white'}`}>
            {config.business.name}
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Services', 'Blog', 'Contact'].map((item) => (
              <Link 
                key={item} 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className={`font-bold ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            <div className={`w-6 h-0.5 mb-1.5 ${isScrolled ? 'bg-black' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 mb-1.5 ${isScrolled ? 'bg-black' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 ${isScrolled ? 'bg-black' : 'bg-white'}`}></div>
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white w-full py-4 flex flex-col items-center space-y-4 shadow-xl">
            {['Home', 'Services', 'Blog', 'Contact'].map((item) => (
              <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-black font-bold">
                {item}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <Suspense fallback={<div className="h-20 bg-gray-50" />}>
        {/* Only keep this if Footer.tsx actually exists in your components folder */}
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
