import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useConfig } from '../context/ConfigContext';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { config } = useConfig();
  const post = config.blog.find((p) => p.slug === slug);

  if (!post || (!post.published && !window.location.href.includes('admin'))) {
    return <Navigate to="/blog" replace />;
  }

  // Create highly optimized unique title and description
  const optimizedTitle = `${post.title} - Cebu Travel Guide`;
  const optimizedDescription = post.excerpt.length > 160 
    ? post.excerpt.substring(0, 157) + "..." 
    : post.excerpt;

  // Generate structured data for the blog post
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "datePublished": new Date(post.date).toISOString().split('T')[0],
    "author": [{
      "@type": "Person",
      "name": post.author,
      "url": "https://ybcarrentaltours.com/#/about"
    }],
    "publisher": {
      "@type": "Organization",
      "name": config.business.name,
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1542125387-c71274d94f0a?auto=format&fit=crop&q=80&w=1200"
      }
    },
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={optimizedTitle} 
        description={optimizedDescription} 
        keywords={`${post.category}, Cebu travel tips, ${post.title.split(' ').join(', ')}, YB Car Rental`}
        image={post.image}
      />
      
      {/* Structured Data Script */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Header Image */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover brightness-[0.7]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl px-4 text-center">
             <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none drop-shadow-2xl">
                {post.title}
              </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-8 mb-12">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold mr-4">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-black uppercase tracking-tight">{post.author}</p>
              <p className="text-xs text-gray-400">Published on {post.date}</p>
            </div>
          </div>
          <Link 
            to="/blog" 
            className="text-gray-400 hover:text-red-600 text-sm font-bold uppercase tracking-widest flex items-center transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>

        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {post.content.map((paragraph, idx) => {
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={idx} className="text-2xl md:text-3xl font-black text-black mt-12 mb-6 uppercase tracking-tight">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            return (
              <p key={idx} className="mb-6 text-lg">
                {paragraph}
              </p>
            );
          })}
        </article>

        <div className="mt-20 p-10 bg-gray-50 rounded-3xl border border-gray-100 text-center">
          <h3 className="text-2xl font-bold text-black mb-4 uppercase tracking-tight">Interested in visiting these places?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">We provide the most reliable car rental services in Cebu with free driver and fuel included.</p>
          <Link 
            to="/contact" 
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-100"
          >
            Inquire for a Tour
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;