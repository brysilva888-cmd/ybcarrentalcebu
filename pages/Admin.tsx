
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useConfig } from '../context/ConfigContext';

type TabType = 'tours' | 'pages' | 'design' | 'navigation' | 'seo' | 'business';

const Admin: React.FC = () => {
  const { config, updateConfig, resetToDefault } = useConfig();
  const [activeTab, setActiveTab] = useState<TabType>('pages');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [globalSaveStatus, setGlobalSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const triggerSave = () => {
    setGlobalSaveStatus('saving');
    setTimeout(() => {
      setGlobalSaveStatus('success');
      setTimeout(() => setGlobalSaveStatus('idle'), 2000);
    }, 500);
  };

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
      <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1] px-4">
        <div className="max-w-sm w-full bg-white p-8 border border-[#ccd0d4] shadow-sm">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-[#23282d] rounded-full flex items-center justify-center text-white text-4xl font-bold">W</div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#72777c] mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-[#ddd] focus:border-[#5b9dd9] focus:shadow-[0_0_2px_rgba(30,140,190,0.8)] outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button className="w-full bg-[#0071a1] text-white py-2 rounded text-sm font-semibold hover:bg-[#006799] shadow-[0_1px_0_#006799]">
              Log In
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-[#0071a1] text-xs hover:text-[#00a0d2]">← Go to {config.business.name}</a>
          </div>
        </div>
      </div>
    );
  }

  const SidebarButton = ({ tab, label, icon }: { tab: TabType, label: string, icon: string }) => (
    <button 
      onClick={() => {
        setActiveTab(tab);
      }}
      className={`w-full text-left px-4 py-2 text-sm transition-all flex items-center space-x-3 ${
        activeTab === tab 
          ? 'bg-[#0071a1] text-white' 
          : 'text-[#eee] hover:bg-[#32373c] hover:text-[#00b0ff]'
      }`}
    >
      <span className="text-lg opacity-70">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f1f1f1] flex flex-col">
      {/* WordPress Top Bar */}
      <div className="h-8 bg-[#23282d] text-[#eee] flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-[100] text-sm">
        <div className="flex items-center space-x-4">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:bg-[#32373c] px-2 h-full cursor-pointer transition-colors">
            <span className="text-lg">🏠</span>
            <span className="font-semibold">{config.business.name}</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 hover:bg-[#32373c] px-2 h-full cursor-pointer transition-colors">
            <span>Howdy, Admin</span>
            <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center text-[10px]">👤</div>
          </div>
        </div>
      </div>

      <div className="flex flex-grow pt-8">
        {/* WordPress Sidebar */}
        <div className="w-40 bg-[#23282d] flex flex-col fixed h-full z-20">
          <nav className="mt-4">
            <SidebarButton tab="pages" label="Pages" icon="📄" />
            <SidebarButton tab="tours" label="Tours" icon="🚐" />
            <SidebarButton tab="design" label="Appearance" icon="🎨" />
            <SidebarButton tab="navigation" label="Menus" icon="🔗" />
            <SidebarButton tab="business" label="Settings" icon="⚙️" />
            <SidebarButton tab="seo" label="SEO" icon="🔍" />
          </nav>

          <div className="mt-auto p-4 border-t border-white/10">
            <button 
              onClick={resetToDefault}
              className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-300"
            >
              Reset Data
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow ml-40 p-8 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto">
            
            {activeTab === 'business' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl font-normal text-[#23282d]">General Settings</h1>
                <div className="bg-white p-6 border border-[#ccd0d4] shadow-sm space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <label className="w-full md:w-1/4 text-sm font-semibold text-[#23282d]">Site Title</label>
                      <input 
                        type="text" 
                        className="flex-grow p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.business.name}
                        onChange={(e) => updateConfig({ business: { ...config.business, name: e.target.value } })}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <label className="w-full md:w-1/4 text-sm font-semibold text-[#23282d]">Tagline</label>
                      <input 
                        type="text" 
                        className="flex-grow p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.business.tagline}
                        onChange={(e) => updateConfig({ business: { ...config.business, tagline: e.target.value } })}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <label className="w-full md:w-1/4 text-sm font-semibold text-[#23282d]">Phone / WhatsApp</label>
                      <input 
                        type="text" 
                        className="flex-grow p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.business.phone}
                        onChange={(e) => updateConfig({ business: { ...config.business, phone: e.target.value, whatsapp: e.target.value.replace(/\D/g, '') } })}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <label className="w-full md:w-1/4 text-sm font-semibold text-[#23282d]">Messenger Username</label>
                      <input 
                        type="text" 
                        className="flex-grow p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.business.messenger}
                        onChange={(e) => updateConfig({ business: { ...config.business, messenger: e.target.value } })}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <label className="w-full md:w-1/4 text-sm font-semibold text-[#23282d]">Facebook Link</label>
                      <input 
                        type="text" 
                        className="flex-grow p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.business.socials.facebook}
                        onChange={(e) => updateConfig({ 
                          business: { 
                            ...config.business, 
                            socials: { ...config.business.socials, facebook: e.target.value } 
                          } 
                        })}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <label className="w-full md:w-1/4 text-sm font-semibold text-[#23282d]">TikTok Link</label>
                      <input 
                        type="text" 
                        className="flex-grow p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.business.socials.tiktok}
                        onChange={(e) => updateConfig({ 
                          business: { 
                            ...config.business, 
                            socials: { ...config.business.socials, tiktok: e.target.value } 
                          } 
                        })}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <label className="w-full md:w-1/4 text-sm font-semibold text-[#23282d]">Instagram Link</label>
                      <input 
                        type="text" 
                        className="flex-grow p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.business.socials.instagram}
                        onChange={(e) => updateConfig({ 
                          business: { 
                            ...config.business, 
                            socials: { ...config.business.socials, instagram: e.target.value } 
                          } 
                        })}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={triggerSave}
                      className="px-4 py-2 bg-[#0071a1] text-white rounded text-sm font-semibold hover:bg-[#006799] shadow-[0_1px_0_#006799] flex items-center"
                    >
                      {globalSaveStatus === 'saving' ? 'Saving...' : globalSaveStatus === 'success' ? '✓ Saved' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl font-normal text-[#23282d]">Appearance Settings</h1>
                
                <div className="bg-white p-6 border border-[#ccd0d4] shadow-sm space-y-8">
                  <div>
                    <h3 className="text-sm font-bold mb-4 text-[#23282d]">Theme Colors</h3>
                    <div className="flex items-center space-x-6">
                      <input 
                        type="color" 
                        className="w-12 h-12 rounded cursor-pointer border border-[#ddd] p-1"
                        value={config.design.primaryColor}
                        onChange={(e) => updateConfig({ design: { ...config.design, primaryColor: e.target.value } })}
                      />
                      <div>
                        <p className="font-semibold text-sm text-[#23282d]">Primary Accent Color</p>
                        <p className="text-xs text-gray-500">Used for buttons, links, and highlights.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold mb-4 text-[#23282d]">Typography</h3>
                    <select 
                      className="w-full max-w-md p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
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
                    <h3 className="text-sm font-bold mb-4 text-[#23282d]">Homepage Sections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                      {Object.keys(config.design.homeSections).map((section) => (
                        <label key={section} className="flex items-center space-x-3 p-3 bg-[#f9f9f9] border border-[#ddd] cursor-pointer hover:bg-white transition-colors">
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
                          <span className="text-sm text-[#23282d] capitalize">{section}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl font-normal text-[#23282d]">Home Page Content</h1>
                <div className="bg-white p-6 border border-[#ccd0d4] shadow-sm space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#23282d] mb-2">Hero Title</label>
                    <textarea 
                      rows={2}
                      className="w-full p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-base"
                      value={config.pages.home.heroTitle}
                      onChange={(e) => updateConfig({ 
                        pages: { ...config.pages, home: { ...config.pages.home, heroTitle: e.target.value } } 
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#23282d] mb-2">Hero Subtitle</label>
                    <textarea 
                      rows={3}
                      className="w-full p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                      value={config.pages.home.heroSubtitle}
                      onChange={(e) => updateConfig({ 
                        pages: { ...config.pages, home: { ...config.pages.home, heroSubtitle: e.target.value } } 
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#23282d] mb-2">Hero Image (Desktop)</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.pages.home.heroImage}
                        onChange={(e) => updateConfig({ 
                          pages: { ...config.pages, home: { ...config.pages.home, heroImage: e.target.value } } 
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#23282d] mb-2">Hero Image (Mobile)</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                        value={config.pages.home.heroImageMobile}
                        onChange={(e) => updateConfig({ 
                          pages: { ...config.pages, home: { ...config.pages.home, heroImageMobile: e.target.value } } 
                        })}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={triggerSave}
                      className="px-4 py-2 bg-[#0071a1] text-white rounded text-sm font-semibold hover:bg-[#006799] shadow-[0_1px_0_#006799] flex items-center"
                    >
                      {globalSaveStatus === 'saving' ? 'Saving...' : globalSaveStatus === 'success' ? '✓ Saved' : 'Update Page'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tours' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-normal text-[#23282d]">Tour Packages</h1>
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
                    className="px-3 py-1 border border-[#ccc] rounded bg-[#f7f7f7] text-[#0071a1] text-xs font-semibold hover:bg-[#eee]"
                  >
                    Add New Tour
                  </button>
                </div>

                <div className="space-y-4">
                  {config.tours.map((tour, index) => (
                    <div key={tour.id} className="bg-white p-6 border border-[#ccd0d4] shadow-sm relative group">
                      <button 
                        onClick={() => updateConfig({ tours: config.tours.filter((_, i) => i !== index) })}
                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <input 
                            className="w-full text-lg font-bold text-[#23282d] outline-none border-b border-transparent focus:border-[#5b9dd9]"
                            value={tour.title}
                            onChange={(e) => {
                              const newTours = [...config.tours];
                              newTours[index].title = e.target.value;
                              updateConfig({ tours: newTours });
                            }}
                          />
                          <textarea 
                            className="w-full text-sm text-[#555] outline-none border border-[#ddd] p-2 focus:border-[#5b9dd9]"
                            rows={3}
                            value={tour.description}
                            onChange={(e) => {
                              const newTours = [...config.tours];
                              newTours[index].description = e.target.value;
                              updateConfig({ tours: newTours });
                            }}
                          />
                          <input 
                            className="w-full text-xs text-gray-400 outline-none border border-[#ddd] p-2 focus:border-[#5b9dd9]"
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
                          <p className="text-xs font-bold uppercase text-gray-400">Highlights (one per line)</p>
                          <textarea 
                            className="w-full text-sm outline-none border border-[#ddd] p-2 focus:border-[#5b9dd9]"
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

            {activeTab === 'navigation' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl font-normal text-[#23282d]">Menu Management</h1>
                <div className="bg-white p-6 border border-[#ccd0d4] shadow-sm space-y-4">
                  {config.navigation.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-[#f9f9f9] border border-[#ddd]">
                      <input 
                        className="flex-grow p-1 font-semibold text-[#23282d] bg-transparent outline-none focus:text-[#0071a1]"
                        value={item.name}
                        onChange={(e) => {
                          const newNav = [...config.navigation];
                          newNav[index].name = e.target.value;
                          updateConfig({ navigation: newNav });
                        }}
                      />
                      <input 
                        className="w-1/3 p-1 text-xs font-mono text-gray-400 bg-transparent outline-none"
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
                    className="w-full py-3 border-2 border-dashed border-[#ccd0d4] text-xs font-bold text-gray-400 uppercase hover:border-[#0071a1] hover:text-[#0071a1] transition-colors"
                  >
                    + Add Menu Item
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl font-normal text-[#23282d]">SEO & Metadata</h1>
                <div className="space-y-6">
                  {(Object.entries(config.seo) as [string, { title: string; description: string }][]).map(([page, data]) => (
                    <div key={page} className="bg-white p-6 border border-[#ccd0d4] shadow-sm space-y-4">
                      <h3 className="text-sm font-bold text-[#23282d] border-b border-[#f1f1f1] pb-2 capitalize">{page} Page</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Meta Title</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-[#ddd] outline-none focus:border-[#5b9dd9] text-sm"
                            value={data.title}
                            onChange={(e) => updateConfig({ 
                              seo: { ...config.seo, [page]: { ...data, title: e.target.value } } 
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Meta Description</label>
                          <textarea 
                            rows={2}
                            className="w-full p-2 border border-[#ddd] outline-none focus:border-[#5b9dd9] text-sm"
                            value={data.description}
                            onChange={(e) => updateConfig({ 
                              seo: { ...config.seo, [page]: { ...data, description: e.target.value } } 
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
