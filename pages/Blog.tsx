
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useConfig } from '../context/ConfigContext';

const Blog: React.FC = () => {
  const { config } = useConfig();
  const publishedPosts = config.blog.filter(post => post.published);

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title={config.seo.blog.title} 
        description={config.seo.blog.description}
        keywords="Cebu travel blog, Cebu travel tips, Cebu itinerary guide, Cebu car rental blog"
      />

      <section className="py-20 bg-black text-white relative">
        <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-red-900/40 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tight">Cebu Travel Guide</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Insights, stories, and expert tips for your Queen City of the South journey.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {publishedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {publishedPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group flex flex-col h-full border border-gray-100">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={post.image || 'https://picsum.photos/seed/cebu/800/600'} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-400 mb-4 space-x-4">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>By {post.author}</span>
                    </div>
                    <h2 className="text-xl font-bold text-black mb-4 leading-tight group-hover:text-red-600 transition-colors uppercase tracking-tight">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="text-red-600 font-bold text-sm uppercase tracking-widest hover:text-red-700 inline-flex items-center"
                      >
                        Read Full Article
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-tight">No articles published yet.</h2>
              <p className="text-gray-400 mt-2">Check back soon for more travel guides!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
