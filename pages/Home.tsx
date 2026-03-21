import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useConfig } from '../context/ConfigContext';

const Home: React.FC = () => {
  const { config } = useConfig();
  
  // Base working URL from your data.ts
  const desktopHero = config.pages.home.heroImage;
  
  // Optimized URL for Mobile
  const mobileHero = "https://res.cloudinary.com/dgwcfarmv/image/upload/c_scale,w_800,f_auto,q_auto/v1774066057/cebu2_znrw8f.webp";

  const testimonials = [
    {
      name: "Janice",
      location: "Verified Google Review",
      text: "I recently used YB Car Rental for a 1-day Cebu tour. The experience was flawless from start to finish. Our driver was incredibly professional.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczM3qD-2V5hpm2V0oaUwNqdGpnM5HBkNa7PCPdqjinBSOs673dzStzqmBq07XiYK53pBH3_1Co2kL7uI-16t-oH4Wxu-RRuYChTv6mLbBUOc8wYw69g=s150-p-k",
      stars: 5
    },
    {
      name: "Taylor",
      location: "Verified Google Review",
      text: "We had a first class experience because our guide Nestor made the day comfortable, friendly and knowledgeable.",
      image: "https://i.pravatar.cc/150?img=38",
      stars: 5
    },
    {
      name: "Nathan",
      location: "Verified Google Review",
      text: "If I could plan my trip all over again I wouldn't have changed anything. Nestor was such a great tour guide.",
      image: "https://i.pravatar.cc/150?img=52",
      stars: 5
    }
  ];

  return (
    <div>
      <SEO 
        title={config.seo.home.title} 
        description={config.seo.home.description}
      />

      {/* Hero Section */}
      {config.design.homeSections.hero && (
        <section className="relative h-[85vh] flex items-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 w-full h-full">
            <picture className="w-full h-full">
              {/* MOBILE: Smaller, faster file */}
              <source 
                media="(max-width: 767px)" 
                srcSet={mobileHero} 
              />
              {/* DESKTOP & FALLBACK: Full quality */}
              <img 
                src={desktopHero} 
                alt="Premium Cebu Car Rental" 
                className="w-full h-full object-cover brightness-[0.45]"
                fetchpriority="high"
                loading="eager"
                onError={(e) => {
                  // Safety mechanism: if mobileHero fails, load desktopHero instead
                  const target = e.target as HTMLImageElement;
                  if (target.src !== desktopHero) {
                    target.src = desktopHero;
                  }
                }}
              />
            </picture>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <span className="inline-block bg-brand text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-brand/30">
                {config.business.tagline}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-2xl text-balance">
                {config.pages.home.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed drop-shadow-md max-w-2xl">
                {config.pages.home.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/services" 
                  className="bg-white text-brand px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all text-center shadow-xl shadow-black/20"
                >
                  Explore Tour Packages
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-brand text-white px-8 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-all text-center shadow-xl shadow-brand/40 border border-white/10"
                >
                  Book with us!
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      {config.design.homeSections.why && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase tracking-tight">Why Choose {config.business.name}?</h2>
              <div className="w-20 h-1.5 bg-brand mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { 
                  title: "Professional Driver & Fuel", 
                  desc: "Don't worry about traffic or gas prices. Our packages include a polite driver and full fuel coverage.",
                  icon: "⛽"
                },
                { 
                  title: "Transparent All-In Pricing", 
                  desc: "No hidden surcharges. The price we quote is the price you pay, making us the most honest car rental in Cebu.",
                  icon: "💰"
                },
                { 
                  title: "Safety First Fleet", 
                  desc: "Our vehicles undergo regular 50-point safety checks to ensure a comfortable and safe journey.",
                  icon: "🛡️"
                }
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all border border-transparent hover:border-gray-100 group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Tours Section */}
      {config.design.homeSections.tours && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase tracking-tight">Affordable Cebu Tour Packages</h2>
                <p className="text-gray-600">The most popular itineraries for local and international tourists.</p>
              </div>
              <Link to="/services" className="hidden md:block text-brand font-bold hover:underline">View All →</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {config.tours.slice(0, 3).map((tour) => (
                <div key={tour.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100">
                  <div className="relative h-60">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-3 text-black uppercase tracking-tight">{tour.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">{tour.description}</p>
                    <Link 
                      to="/contact" 
                      className="block w-full text-center border-2 border-brand text-brand font-bold py-3 rounded-xl hover:bg-brand hover:text-white transition-all uppercase tracking-widest text-xs"
                    >
                      Check Availability
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {config.design.homeSections.reviews && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Trusted by Travelers</h2>
              <div className="w-20 h-1.5 bg-brand mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-3xl">
                  <div className="flex items-center mb-6">
                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-gray-400">{t.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic text-sm leading-relaxed">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {config.design.homeSections.blog && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase tracking-tight">Cebu Travel Insights</h2>
                <p className="text-gray-600">Expert tips and guides for your next trip.</p>
              </div>
              <Link to="/blog" className="hidden md:block text-brand font-bold hover:underline">Read All Articles →</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {config.blog.filter(p => p.published).slice(0, 3).map((post) => (
                <article key={post.slug} className="group cursor-pointer">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative h-48 rounded-3xl overflow-hidden mb-6">
                      <img 
                        src={post.image || 'https://picsum.photos/seed/cebu/800/600'} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-[10px] font-bold text-brand uppercase tracking-widest">
                        <span>{post.category}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-gray-400">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-black group-hover:text-brand transition-colors uppercase tracking-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      {config.design.homeSections.cta && (
        <section className="py-24 bg-brand text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter">Ready for your Cebu Adventure?</h2>
            <div className="flex justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-brand px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all shadow-2xl"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
