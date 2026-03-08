
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SchemaMarkup from './SchemaMarkup';
import { useConfig } from '../context/ConfigContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config } = useConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaMarkup />
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex flex-col group">
              <span className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter leading-none group-hover:text-brand transition-colors">
                {config.business.name}
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-brand uppercase tracking-[0.2em] mt-1">
                {config.business.tagline}
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8 items-center">
              {config.navigation.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors hover:text-brand ${
                    location.pathname === link.path ? 'text-brand' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-brand text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-brand/20 hover:opacity-90 transition-all"
              >
                Book Now
              </Link>
            </nav>

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-4 py-6 space-y-4">
              {config.navigation.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-base font-semibold text-gray-700 hover:text-brand"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block w-full text-center bg-brand text-white px-5 py-3 rounded-xl font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Floating Messenger Button */}
      <a
        href={`https://m.me/${config.business.messenger}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us"
        className="fixed bottom-6 right-6 z-[60] bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.501 3.734 7.245.195.148.312.378.312.626 0 .23-.058.462-.172.68l-.837 1.674c-.114.228.115.485.344.401l2.064-.75c.214-.078.448-.07.654.024 1.2.55 2.535.858 3.9.858 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.006 12.834l-2.584-2.753-5.045 2.753 5.545-5.89 2.584 2.753 5.045-2.753-5.545 5.89z" />
        </svg>
      </a>

      <footer className="bg-black text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">{config.business.name}</h3>
              <p className="text-sm leading-relaxed">{config.business.tagline}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Explore</h4>
              <ul className="space-y-3 text-sm">
                {config.navigation.map((link) => (
                  <li key={link.path}><Link to={link.path} className="hover:text-white transition-colors">{link.name}</Link></li>
                ))}
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                {config.tours.slice(0, 4).map(tour => (
                  <li key={tour.id}><Link to="/services" className="hover:text-white transition-colors">{tour.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>📞 {config.business.phone}</li>
                <li>📍 {config.business.address}</li>
                <li>💬 Messenger: @{config.business.messenger}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} {config.business.name}</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/admin" className="opacity-30 hover:opacity-100">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
