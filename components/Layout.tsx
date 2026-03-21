import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './Navbar';
// Lazy load the Footer because it's at the bottom of the page
// Users don't need the Footer code immediately upon landing
const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Optimize scroll listener with passive: true for better mobile performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased">
      {/* Navbar stays at the top */}
      <Navbar isScrolled={isScrolled} />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer is lazy-loaded to reduce the initial JS bundle size */}
      <Suspense fallback={<div className="h-20 bg-gray-50" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
