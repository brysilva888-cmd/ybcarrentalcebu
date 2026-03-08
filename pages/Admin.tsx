
import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { BlogPost } from '../constants/blog';

const BlogManager: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'edit'>('list');

  const filteredPosts = config.blog.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (post: BlogPost) => {
    const updatedBlog = config.blog.map(p => p.slug === post.slug ? post : p);
    // If it's a new post (slug might have changed or it's not in the list yet)
    const exists = config.blog.some(p => p.slug === post.slug);
    if (!exists) {
      updateConfig({ blog: [post, ...config.blog] });
    } else {
      updateConfig({ blog: updatedBlog });
    }
    setView('list');
    setEditingPost(null);
  };

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      updateConfig({ blog: config.blog.filter(p => p.slug !== slug) });
    }
  };

  const createNewPost = () => {
    const newPost: BlogPost = {
      slug: `new-post-${Date.now()}`,
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: 'YB Team',
      image: '',
      category: 'Travel Guide',
      content: [],
      published: false,
      updatedAt: new Date().toISOString()
    };
    setEditingPost(newPost);
    setView('edit');
  };

  if (view === 'edit' && editingPost) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setView('list')}
            className="text-gray-400 hover:text-black font-bold uppercase tracking-widest text-xs flex items-center"
          >
            ← Back to List
          </button>
          <div className="flex space-x-4">
            <button 
              onClick={() => handleSave(editingPost)}
              className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Editor Side */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-black uppercase tracking-tight">Content Editor</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Article Title</label>
                  <input 
                    className="w-full text-2xl font-black uppercase tracking-tight outline-none border-b-2 border-gray-50 focus:border-black transition-colors py-2"
                    placeholder="Enter catchy title..."
                    value={editingPost.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                      setEditingPost({ ...editingPost, title, slug });
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
                    <input 
                      className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black"
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Author</label>
                    <input 
                      className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black"
                      value={editingPost.author}
                      onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Featured Image URL</label>
                  <input 
                    className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black font-mono text-xs"
                    placeholder="https://..."
                    value={editingPost.image}
                    onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Excerpt</label>
                  <textarea 
                    rows={3}
                    className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black text-sm"
                    placeholder="Short summary for the list view..."
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Body Content</label>
                    <span className="text-[10px] text-gray-300 font-mono">Use ## for headings</span>
                  </div>
                  <textarea 
                    rows={15}
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black text-sm font-mono leading-relaxed"
                    placeholder="Write your story here... Each line is a paragraph."
                    value={editingPost.content.join('\n')}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value.split('\n') })}
                  />
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={editingPost.published}
                        onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${editingPost.published ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${editingPost.published ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                    <span className="ml-3 text-xs font-bold uppercase tracking-widest text-gray-600">
                      {editingPost.published ? 'Published' : 'Draft'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Side */}
          <div className="space-y-8 sticky top-8 h-fit">
            <h2 className="text-xl font-black uppercase tracking-tight text-gray-400">Live Preview</h2>
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 scale-95 origin-top">
              <div className="relative h-48">
                <img 
                  src={editingPost.image || 'https://picsum.photos/seed/placeholder/800/400'} 
                  className="w-full h-full object-cover" 
                  alt="Preview"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                    {editingPost.category || 'Category'}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center text-[10px] text-gray-400 space-x-3">
                  <span>{editingPost.date}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span>By {editingPost.author}</span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight leading-tight">
                  {editingPost.title || 'Your Article Title'}
                </h3>
                <div className="space-y-2">
                  {editingPost.content.slice(0, 3).map((line, i) => (
                    <p key={i} className={`text-xs text-gray-500 line-clamp-2 ${line.startsWith('##') ? 'font-bold text-black' : ''}`}>
                      {line.replace('## ', '')}
                    </p>
                  ))}
                  {editingPost.content.length > 3 && <p className="text-xs text-gray-300">...</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight">Blog Articles</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Manage your stories and travel guides</p>
        </div>
        <button 
          onClick={createNewPost}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity flex items-center space-x-2"
        >
          <span>+</span>
          <span>Create New Post</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
          <div className="relative w-72">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-none text-sm outline-none focus:ring-2 focus:ring-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Total: {config.blog.length}</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <span>Published: {config.blog.filter(p => p.published).length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-50">
                <th className="px-8 py-4">Article</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPosts.map((post) => (
                <tr key={post.slug} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={post.image || 'https://picsum.photos/seed/placeholder/100/100'} 
                          className="w-full h-full object-cover" 
                          alt=""
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase tracking-tight group-hover:text-blue-600 transition-colors">{post.title}</p>
                        <p className="text-[10px] font-mono text-gray-400">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 rounded-md text-gray-500">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${post.published ? 'text-green-600' : 'text-amber-600'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {post.date}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => {
                          setEditingPost(post);
                          setView('edit');
                        }}
                        className="p-2 hover:bg-black hover:text-white rounded-lg transition-all text-gray-400"
                        title="Edit Post"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(post.slug)}
                        className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all text-gray-400"
                        title="Delete Post"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type TabType = 'blog' | 'tours' | 'pages' | 'design' | 'navigation' | 'seo' | 'business';

const Admin: React.FC = () => {
  const { config, updateConfig, resetToDefault } = useConfig();
  const [activeTab, setActiveTab] = useState<TabType>('business');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for demo
      setIsAuthorized(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl">
          <h1 className="text-2xl font-black text-center mb-8 uppercase tracking-tighter">Site Manager Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
              Open Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const SidebarButton = ({ tab, label, icon }: { tab: TabType, label: string, icon: string }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`w-full text-left px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all flex items-center space-x-3 ${
        activeTab === tab ? 'bg-white text-black shadow-lg shadow-black/5' : 'text-gray-400 hover:text-white hover:bg-white/10'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* CMS Sidebar */}
      <div className="w-72 bg-black text-white p-6 flex flex-col fixed h-full z-20">
        <div className="mb-10 px-4">
          <h2 className="text-xl font-black uppercase tracking-tighter">YB CMS</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">v2.0 Management Suite</p>
        </div>
        
        <nav className="space-y-2 flex-grow overflow-y-auto">
          <SidebarButton tab="business" label="Business Info" icon="🏢" />
          <SidebarButton tab="design" label="Appearance" icon="🎨" />
          <SidebarButton tab="navigation" label="Navigation" icon="🔗" />
          <SidebarButton tab="pages" label="Page Content" icon="📄" />
          <SidebarButton tab="tours" label="Tour Packages" icon="🚐" />
          <SidebarButton tab="blog" label="Blog Posts" icon="✍️" />
          <SidebarButton tab="seo" label="SEO Settings" icon="🔍" />
        </nav>

        <div className="pt-6 border-t border-white/10 space-y-4">
          <button 
            onClick={resetToDefault}
            className="w-full text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-400 py-2"
          >
            Reset Everything
          </button>
          <div className="text-[10px] text-gray-600 font-mono text-center">
            Local Storage Persistence Active
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow ml-72 p-12 overflow-y-auto">
        <div className="max-w-4xl">
          
          {activeTab === 'business' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h1 className="text-4xl font-black uppercase tracking-tight">Business Profile</h1>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Business Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black outline-none"
                      value={config.business.name}
                      onChange={(e) => updateConfig({ business: { ...config.business, name: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tagline</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black outline-none"
                      value={config.business.tagline}
                      onChange={(e) => updateConfig({ business: { ...config.business, tagline: e.target.value } })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Phone / WhatsApp</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black outline-none"
                    value={config.business.phone}
                    onChange={(e) => updateConfig({ business: { ...config.business, phone: e.target.value, whatsapp: e.target.value.replace(/\D/g, '') } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Messenger Username</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black outline-none"
                    value={config.business.messenger}
                    onChange={(e) => updateConfig({ business: { ...config.business, messenger: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h1 className="text-4xl font-black uppercase tracking-tight">Appearance</h1>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-tight">Theme Colors</h3>
                  <div className="flex items-center space-x-6">
                    <input 
                      type="color" 
                      className="w-16 h-16 rounded-xl cursor-pointer border-none p-0"
                      value={config.design.primaryColor}
                      onChange={(e) => updateConfig({ design: { ...config.design, primaryColor: e.target.value } })}
                    />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-widest">Primary Accent</p>
                      <p className="text-xs text-gray-400">Controls buttons, icons, and highlights across the site.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-tight">Typography</h3>
                  <select 
                    className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black outline-none"
                    value={config.design.fontFamily}
                    onChange={(e) => updateConfig({ design: { ...config.design, fontFamily: e.target.value } })}
                  >
                    <option value="'Plus Jakarta Sans', sans-serif">Ultra-Modern (Plus Jakarta Sans)</option>
                    <option value="'Inter', sans-serif">Modern & Clean (Inter)</option>
                    <option value="'Montserrat', sans-serif">Bold & Professional (Montserrat)</option>
                    <option value="'Playfair Display', serif">Luxury & Elegant (Playfair)</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-tight">Homepage Sections</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(config.design.homeSections).map((section) => (
                      <label key={section} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={(config.design.homeSections as any)[section]}
                          onChange={(e) => updateConfig({ 
                            design: { 
                              ...config.design, 
                              homeSections: { ...config.design.homeSections, [section]: e.target.checked } 
                            } 
                          })}
                        />
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-600">{section}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h1 className="text-4xl font-black uppercase tracking-tight">Home Page Editor</h1>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Hero Title</label>
                  <textarea 
                    rows={2}
                    className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black outline-none text-xl font-bold"
                    value={config.pages.home.heroTitle}
                    onChange={(e) => updateConfig({ 
                      pages: { ...config.pages, home: { ...config.pages.home, heroTitle: e.target.value } } 
                    })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Hero Subtitle</label>
                  <textarea 
                    rows={3}
                    className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black outline-none"
                    value={config.pages.home.heroSubtitle}
                    onChange={(e) => updateConfig({ 
                      pages: { ...config.pages, home: { ...config.pages.home, heroSubtitle: e.target.value } } 
                    })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Hero Image URL</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black outline-none"
                    value={config.pages.home.heroImage}
                    onChange={(e) => updateConfig({ 
                      pages: { ...config.pages, home: { ...config.pages.home, heroImage: e.target.value } } 
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tours' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-end">
                <h1 className="text-4xl font-black uppercase tracking-tight">Tour Packages</h1>
                <button 
                  onClick={() => {
                    const newTour = { 
                      id: `tour-${Date.now()}`, 
                      title: 'New Package', 
                      description: 'Enter description...', 
                      image: '', 
                      highlights: ['Feature 1'] 
                    };
                    updateConfig({ tours: [newTour, ...config.tours] });
                  }}
                  className="bg-black text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                  + Add Tour
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {config.tours.map((tour, index) => (
                  <div key={tour.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative group">
                    <button 
                      onClick={() => updateConfig({ tours: config.tours.filter((_, i) => i !== index) })}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </button>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <input 
                          className="w-full text-xl font-bold uppercase tracking-tight outline-none border-b-2 border-transparent focus:border-black"
                          value={tour.title}
                          onChange={(e) => {
                            const newTours = [...config.tours];
                            newTours[index].title = e.target.value;
                            updateConfig({ tours: newTours });
                          }}
                        />
                        <textarea 
                          className="w-full text-sm text-gray-500 outline-none border-none bg-gray-50 p-3 rounded-xl"
                          rows={3}
                          value={tour.description}
                          onChange={(e) => {
                            const newTours = [...config.tours];
                            newTours[index].description = e.target.value;
                            updateConfig({ tours: newTours });
                          }}
                        />
                        <input 
                          className="w-full text-xs text-gray-400 outline-none bg-gray-50 p-2 rounded-lg"
                          placeholder="Image URL"
                          value={tour.image}
                          onChange={(e) => {
                            const newTours = [...config.tours];
                            newTours[index].image = e.target.value;
                            updateConfig({ tours: newTours });
                          }}
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Highlights</p>
                        <textarea 
                          className="w-full text-sm outline-none bg-gray-50 p-3 rounded-xl"
                          rows={4}
                          placeholder="One per line..."
                          value={tour.highlights.join('\n')}
                          onChange={(e) => {
                            const newTours = [...config.tours];
                            newTours[index].highlights = e.target.value.split('\n');
                            updateConfig({ tours: newTours });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <BlogManager />
          )}

          {activeTab === 'navigation' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h1 className="text-4xl font-black uppercase tracking-tight">Main Navigation</h1>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                {config.navigation.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <input 
                      className="flex-grow p-2 font-bold uppercase tracking-tight bg-transparent outline-none focus:text-blue-600"
                      value={item.name}
                      onChange={(e) => {
                        const newNav = [...config.navigation];
                        newNav[index].name = e.target.value;
                        updateConfig({ navigation: newNav });
                      }}
                    />
                    <input 
                      className="w-1/3 p-2 text-xs font-mono text-gray-400 bg-transparent outline-none"
                      value={item.path}
                      onChange={(e) => {
                        const newNav = [...config.navigation];
                        newNav[index].path = e.target.value;
                        updateConfig({ navigation: newNav });
                      }}
                    />
                    <button 
                      onClick={() => updateConfig({ navigation: config.navigation.filter((_, i) => i !== index) })}
                      className="text-gray-300 hover:text-red-500 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => updateConfig({ navigation: [...config.navigation, { name: 'New Link', path: '#' }] })}
                  className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:border-gray-200 transition-colors"
                >
                  + Add Menu Item
                </button>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h1 className="text-4xl font-black uppercase tracking-tight">SEO Metadata</h1>
              <div className="space-y-6">
                {(Object.entries(config.seo) as [string, { title: string; description: string }][]).map(([page, data]) => (
                  <div key={page} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                    <h3 className="text-lg font-bold uppercase tracking-tight text-black border-b border-gray-50 pb-2">{page} Page</h3>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Page Title</label>
                      <input 
                        type="text" 
                        className="w-full p-2 bg-gray-50 rounded-lg outline-none focus:ring-1 focus:ring-black"
                        value={data.title}
                        onChange={(e) => updateConfig({ 
                          seo: { ...config.seo, [page]: { ...data, title: e.target.value } } 
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Meta Description</label>
                      <textarea 
                        rows={2}
                        className="w-full p-2 bg-gray-50 rounded-lg outline-none focus:ring-1 focus:ring-black text-sm"
                        value={data.description}
                        onChange={(e) => updateConfig({ 
                          seo: { ...config.seo, [page]: { ...data, description: e.target.value } } 
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Admin;
