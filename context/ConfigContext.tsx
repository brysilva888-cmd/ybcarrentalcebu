
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUSINESS_INFO, TOURS, SERVICE_LIST } from '../constants/data';
import { BLOG_POSTS } from '../constants/blog';

const DEFAULT_CONFIG = {
  business: { ...BUSINESS_INFO },
  tours: [...TOURS],
  services: [...SERVICE_LIST],
  blog: [...BLOG_POSTS],
  navigation: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services & Tours', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ],
  design: {
    primaryColor: '#dc2626', // Tailwind red-600
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    homeSections: {
      hero: true,
      why: true,
      tours: true,
      reviews: true,
      blog: true,
      cta: true
    }
  },
  seo: {
    home: { title: 'Car Rental Cebu | Best Tour Car Rental', description: 'Looking for the best car rental in Cebu? YB Car Rental offers premium tour packages.' },
    about: { title: 'About Us', description: 'Learn more about YB Car Rental and Tour.' },
    services: { title: 'Cebu Tour Packages & Car Services', description: 'Browse our wide range of Cebu tour packages.' },
    contact: { title: 'Contact Us | Book Your Cebu Car Rental', description: 'Book your Cebu car rental today.' },
    blog: { title: 'Travel Blog & Guides', description: 'Read the latest travel guides and safety tips.' }
  },
  pages: {
    home: {
      heroTitle: "Premium Cebu Car Rental with FREE Driver & Fuel.",
      heroSubtitle: "Explore the scenic roads and hidden gems of Cebu with our stress-free, all-inclusive tour packages.",
      heroImage: "https://res.cloudinary.com/dgwcfarmv/image/upload/v1774066057/cebu2_znrw8f.webp"
    }
  }
};

type ConfigType = typeof DEFAULT_CONFIG;

const ConfigContext = createContext<{
  config: ConfigType;
  updateConfig: (newConfig: Partial<ConfigType>) => void;
  resetToDefault: () => void;
} | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ConfigType>(() => {
    const saved = localStorage.getItem('yb_car_rental_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('yb_car_rental_config', JSON.stringify(config));
    
    // Apply dynamic theme
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', config.design.primaryColor);
    root.style.setProperty('--font-family', config.design.fontFamily);
  }, [config]);

  const updateConfig = (newConfig: Partial<ConfigType>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all site content and design to defaults?')) {
      setConfig(DEFAULT_CONFIG);
    }
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetToDefault }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within a ConfigProvider');
  return context;
};
