import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { TOURS, SERVICE_LIST, BUSINESS_INFO } from '../constants/data';

const Services: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'copying' | 'redirecting'>('idle');

  const formatMessage = (tourTitle: string) => {
    return `BOOKING INQUIRY FOR YB CAR RENTAL:
------------------------------
• TOUR: ${tourTitle}
------------------------------
I'm interested in this tour package. Please check availability for my group!`;
  };

  const handleMessengerAction = async (tourTitle: string) => {
    const textToCopy = formatMessage(tourTitle);
    setStatus('copying');

    try {
      await navigator.clipboard.writeText(textToCopy);
      setStatus('redirecting');
      
      setTimeout(() => {
        window.open(`https://m.me/${BUSINESS_INFO.messenger}`, '_blank');
        setStatus('idle');
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      window.open(`https://m.me/${BUSINESS_INFO.messenger}`, '_blank');
      setStatus('idle');
    }
  };

  const handleWhatsAppAction = (tourTitle: string) => {
    const text = formatMessage(tourTitle);
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <SEO 
        title="Cebu Car Rental Services | Airport Transfer & Private Tours" 
        description="Browse our wide range of Cebu tour packages. From South Cebu canyoneering to North Cebu wildlife safaris, all include free driver and fuel."
        keywords="Cebu tour car rental, Cebu city tour car rental, airport transfer Cebu, Cebu canyoneering package."
      />

      {/* Redirecting Overlay for Messenger */}
      {status === 'redirecting' && (
        <div className="fixed inset-0 z-[100] bg-blue-600/95 backdrop-blur-md flex items-center justify-center text-white text-center p-6">
          <div className="max-w-md">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">Inquiry Copied!</h2>
            <p className="text-xl mb-8 opacity-90">We are opening Messenger now. <br/><strong>Just Paste (Ctrl+V)</strong> into the chat box!</p>
            <div className="bg-white/10 p-4 rounded-xl text-xs font-mono break-all border border-white/20">
              Redirecting to m.me/{BUSINESS_INFO.messenger}...
            </div>
          </div>
        </div>
      )}

      <section className="py-20 bg-black text-white relative">
        <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-red-900/40 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tight">Tours & Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Explore the best of Cebu with our curated itineraries and professional transportation services.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-8 border-l-8 border-red-600 pl-6 uppercase tracking-tight">Our Tour Packages</h2>
            <div className="grid grid-cols-1 gap-12">
              {TOURS.map((tour, idx) => (
                <div key={tour.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100`}>
                  <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-black uppercase tracking-tight">{tour.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      {tour.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                      {tour.highlights.map((h, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-700 font-medium">
                          <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                          {h}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-red-600 font-bold mb-8 uppercase tracking-widest bg-red-50 py-2 px-4 rounded-lg inline-flex self-start">
                      <span>✨ Driver & Fuel Included</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleWhatsAppAction(tour.title)}
                        className="bg-green-600 text-white text-center px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg flex items-center justify-center space-x-2 uppercase tracking-widest text-xs"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>Book on WhatsApp</span>
                      </button>
                      <button 
                        onClick={() => handleMessengerAction(tour.title)}
                        className="bg-blue-600 text-white text-center px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center space-x-2 uppercase tracking-widest text-xs"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.501 3.734 7.245.195.148.312.378.312.626 0 .23-.058.462-.172.68l-.837 1.674c-.114.228.115.485.344.401l2.064-.75c.214-.078.448-.07.654.024 1.2.55 2.535.858 3.9.858 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.006 12.834l-2.584-2.753-5.045 2.753 5.545-5.89 2.584 2.753 5.045-2.753-5.545 5.89z" />
                        </svg>
                        <span>Book on Messenger</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-24 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-black mb-12 text-center uppercase tracking-tight">Other Premium Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICE_LIST.map((service, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-md text-center border border-gray-100 hover:border-red-200 transition-all flex flex-col items-center">
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-tight">{service.title}</h3>
                  <p className="text-gray-600 mb-8 flex-grow">{service.description}</p>
                  <div className="w-full">
                    <Link 
                      to="/contact" 
                      className="block w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all uppercase tracking-widest text-xs text-center shadow-lg shadow-red-100"
                    >
                      Inquire Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
