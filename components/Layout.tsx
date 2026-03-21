import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';

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
      {/* INTEGRATED HEADER - NO EXTERNAL FILES NEEDED */}
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
                className={`font-bold transition-colors ${isScrolled ? 'text-gray-700 hover:text-brand' : 'text-white hover:text-gray-200'}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-black' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-black' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-black' : 'bg-white'}`}></div>
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white w-full py-6 flex flex-col items-center space-y-4 shadow-2xl">
            {['Home', 'Services', 'Blog', 'Contact'].map((item) => (
              <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-black font-bold text-lg">
                {item}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        {children}
      </main>

      {/* INTEGRATED FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-4">{config.business.name}</h2>
          <p className="text-gray-400 text-sm mb-6">Premium Cebu Car Rental & Tours</p>
          <div className="text-gray-500 text-xs">
            © {new Date().getFullYear()} {config.business.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
