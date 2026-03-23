
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useConfig } from '../context/ConfigContext';
import { BlogPost } from '../constants/blog';

const BlogManager: React.FC<{
  editingPost: BlogPost | null;
  setEditingPost: (post: BlogPost | null) => void;
  view: 'list' | 'edit';
  setView: (view: 'list' | 'edit') => void;
  originalSlug: string | null;
  setOriginalSlug: (slug: string | null) => void;
  createNewPost: () => void;
}> = ({ editingPost, setEditingPost, view, setView, originalSlug, setOriginalSlug, createNewPost }) => {
  const { config, updateConfig } = useConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [editorMode, setEditorMode] = useState<'visual' | 'text'>('visual');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [quickEditingSlug, setQuickEditingSlug] = useState<string | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredPosts = config.blog.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && post.published) ||
                         (statusFilter === 'draft' && !post.published);
    return matchesSearch && matchesStatus;
  });

  const handleSave = (post: BlogPost) => {
    if (!post.title.trim()) {
      alert('Please enter a title before saving.');
      return;
    }

    setSaveStatus('saving');
    
    try {
      let updatedBlog;
      
      // Check if we are updating an existing post
      const isUpdating = originalSlug && !originalSlug.startsWith('new-post');
      
      if (isUpdating) {
        // When updating, we replace the post that matches the original slug
        updatedBlog = config.blog.map(p => p.slug === originalSlug ? post : p);
        updateConfig({ blog: updatedBlog });
      } else {
        // Adding new post
        // Ensure slug is unique for new posts
        let finalSlug = post.slug;
        let counter = 1;
        while (config.blog.some(p => p.slug === finalSlug)) {
          finalSlug = `${post.slug}-${counter}`;
          counter++;
        }
        
        const postToSave = { ...post, slug: finalSlug };
        updateConfig({ blog: [postToSave, ...config.blog] });
      }
      
      setSaveStatus('success');
      setTimeout(() => {
        setView('list');
        setEditingPost(null);
        setOriginalSlug(null);
        setQuickEditingSlug(null);
        setSaveStatus('idle');
      }, 1500);
    } catch (error) {
      console.error('Error saving post:', error);
      setSaveStatus('error');
    }
  };

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to move this post to Trash?')) {
      updateConfig({ blog: config.blog.filter(p => p.slug !== slug) });
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedPosts.length === 0) return;
    
    if (action === 'trash') {
      if (window.confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) {
        updateConfig({ blog: config.blog.filter(p => !selectedPosts.includes(p.slug)) });
        setSelectedPosts([]);
      }
    } else if (action === 'publish') {
      const updatedBlog = config.blog.map(p => 
        selectedPosts.includes(p.slug) ? { ...p, published: true } : p
      );
      updateConfig({ blog: updatedBlog });
      setSelectedPosts([]);
    }
  };

  if (view === 'edit' && editingPost) {
    return (
      <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-normal text-[#23282d]">
              {originalSlug?.startsWith('new-post') ? 'Add New Post' : 'Edit Post'}
            </h1>
            <button 
              onClick={() => handleSave({ ...editingPost, published: true })}
              disabled={saveStatus === 'saving'}
              className={`px-4 py-1.5 rounded text-xs font-semibold shadow-[0_1px_0_#006799] transition-all ${
                saveStatus === 'saving' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0071a1] text-white hover:bg-[#006799]'
              }`}
            >
              {saveStatus === 'saving' ? 'Saving...' : (editingPost.published ? 'Update' : 'Publish')}
            </button>
          </div>
          <button 
            onClick={() => setView('list')}
            className="text-[#0071a1] hover:text-[#00a0d2] text-sm"
          >
            ← Back to All Posts
          </button>
        </div>

        {saveStatus === 'success' && (
          <div className="mb-6 p-3 bg-[#fff] border-l-4 border-[#46b450] shadow-sm text-sm text-[#23282d] animate-in fade-in slide-in-from-left-2">
            Post {editingPost.published ? 'updated' : 'published'}. <button onClick={() => setView('list')} className="text-[#0071a1] underline ml-2">View all posts</button>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="mb-6 p-3 bg-[#fff] border-l-4 border-[#dc3232] shadow-sm text-sm text-[#23282d]">
            An error occurred while saving. Please try again.
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow space-y-6">
            <input 
              className="w-full px-3 py-2 text-lg border border-[#ddd] focus:border-[#5b9dd9] focus:shadow-[0_0_2px_rgba(30,140,190,0.8)] outline-none bg-white placeholder:text-gray-400"
              placeholder="Enter title here"
              value={editingPost.title}
              onChange={(e) => {
                const title = e.target.value;
                // Generate slug but don't force it if it's an existing post (unless they want to change it)
                const slug = title.toLowerCase()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/--+/g, '-')
                  .trim();
                setEditingPost({ ...editingPost, title, slug });
              }}
            />

            <div className="bg-white border border-[#ccd0d4] shadow-sm">
              <div className="px-3 py-2 border-b border-[#ccd0d4] bg-[#f7f7f7] flex items-center justify-between">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setEditorMode('visual')}
                    className={`px-3 py-1 border border-[#ccd0d4] border-b-white -mb-[9px] text-sm font-semibold z-10 ${editorMode === 'visual' ? 'bg-white text-[#23282d]' : 'bg-[#f1f1f1] text-[#0071a1]'}`}
                  >
                    Visual
                  </button>
                  <button 
                    onClick={() => setEditorMode('text')}
                    className={`px-3 py-1 border border-[#ccd0d4] border-b-white -mb-[9px] text-sm font-semibold z-10 ${editorMode === 'text' ? 'bg-white text-[#23282d]' : 'bg-[#f1f1f1] text-[#0071a1]'}`}
                  >
                    Text
                  </button>
                </div>
                <button 
                  onClick={() => setShowMediaModal(true)}
                  className="text-xs text-[#0071a1] hover:text-[#00a0d2] flex items-center"
                >
                  <span className="mr-1">🖼️</span> Add Media
                </button>
              </div>
              <div className="quill-editor-container wordpress-editor">
                {editorMode === 'visual' ? (
                  <ReactQuill 
                    theme="snow"
                    value={editingPost.content}
                    onChange={(content) => setEditingPost({ ...editingPost, content })}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['link', 'image'],
                        ['clean']
                      ],
                    }}
                    className="h-[500px]"
                  />
                ) : (
                  <textarea 
                    className="w-full h-[500px] p-4 font-mono text-sm border-none outline-none resize-none"
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  />
                )}
              </div>
              <div className="px-3 py-1 bg-[#f7f7f7] border-t border-[#ccd0d4] text-[11px] text-[#555d66] flex justify-between">
                <span>Path: p</span>
                <span>Word count: {editingPost.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}</span>
              </div>
            </div>

            <div className="bg-white border border-[#ccd0d4] shadow-sm">
              <div 
                onClick={() => toggleSection('excerpt')}
                className="px-3 py-2 border-b border-[#ccd0d4] font-semibold text-sm text-[#23282d] flex justify-between items-center cursor-pointer hover:bg-[#f9f9f9]"
              >
                <span>Excerpt</span>
                <span className="text-gray-400">{collapsedSections['excerpt'] ? '▴' : '▾'}</span>
              </div>
              {!collapsedSections['excerpt'] && (
                <div className="p-3 animate-in slide-in-from-top-2 duration-200">
                  <textarea 
                    rows={3}
                    className="w-full p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                    placeholder="Excerpts are optional hand-crafted summaries of your content..."
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div className="bg-white border border-[#ccd0d4] shadow-sm">
              <div 
                onClick={() => toggleSection('seo')}
                className="px-3 py-2 border-b border-[#ccd0d4] font-semibold text-sm text-[#23282d] flex justify-between items-center cursor-pointer hover:bg-[#f9f9f9]"
              >
                <span>SEO Settings</span>
                <span className="text-gray-400">{collapsedSections['seo'] ? '▴' : '▾'}</span>
              </div>
              {!collapsedSections['seo'] && (
                <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div>
                    <label className="block text-xs font-semibold text-[#23282d] mb-1">SEO Title Override</label>
                    <input 
                      className="w-full p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                      placeholder="Custom title for Google search..."
                      value={editingPost.seoTitle || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, seoTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#23282d] mb-1">SEO Description Override</label>
                    <textarea 
                      rows={2}
                      className="w-full p-2 border border-[#ddd] focus:border-[#5b9dd9] outline-none text-sm"
                      placeholder="Custom meta description..."
                      value={editingPost.seoDescription || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, seoDescription: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[280px] space-y-6">
            <div className="bg-white border border-[#ccd0d4] shadow-sm">
              <div 
                onClick={() => toggleSection('publish')}
                className="px-3 py-2 border-b border-[#ccd0d4] font-semibold text-sm text-[#23282d] flex justify-between items-center cursor-pointer hover:bg-[#f9f9f9]"
              >
                <span>Publish</span>
                <span className="text-gray-400">{collapsedSections['publish'] ? '▴' : '▾'}</span>
              </div>
              {!collapsedSections['publish'] && (
                <>
                  <div className="p-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between">
                      <button 
                        onClick={() => handleSave({ ...editingPost, published: false })}
                        className="px-3 py-1 border border-[#ccc] rounded bg-[#f7f7f7] text-[#555] text-xs font-semibold hover:bg-[#eee]"
                      >
                        Save Draft
                      </button>
                      <button className="px-3 py-1 border border-[#ccc] rounded bg-[#f7f7f7] text-[#555] text-xs font-semibold hover:bg-[#eee]">Preview</button>
                    </div>
                    <div className="text-xs text-[#555] space-y-2">
                      <div className="flex items-center">
                        <span className="mr-2">📍</span> Status: <strong className="ml-1">{editingPost.published ? 'Published' : 'Draft'}</strong>
                        <button className="ml-2 text-[#0071a1] underline">Edit</button>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">👁️</span> Visibility: <strong className="ml-1">Public</strong>
                        <button className="ml-2 text-[#0071a1] underline">Edit</button>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📅</span> {editingPost.published ? 'Published on:' : 'Publish immediately'} 
                        <strong className="ml-1">{editingPost.date}</strong>
                        <button className="ml-2 text-[#0071a1] underline">Edit</button>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-[#f7f7f7] border-t border-[#ccd0d4] flex justify-between items-center">
                    <button 
                      onClick={() => handleDelete(editingPost.slug)}
                      className="text-[#a00] text-xs hover:text-red-600 underline"
                    >
                      Move to Trash
                    </button>
                    <button 
                      onClick={() => handleSave({ ...editingPost, published: true })}
                      disabled={saveStatus === 'saving'}
                      className={`px-4 py-1.5 rounded text-xs font-semibold shadow-[0_1px_0_#006799] transition-all ${
                        saveStatus === 'saving' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0071a1] text-white hover:bg-[#006799]'
                      }`}
                    >
                      {saveStatus === 'saving' ? 'Saving...' : (editingPost.published ? 'Update' : 'Publish')}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white border border-[#ccd0d4] shadow-sm">
              <div 
                onClick={() => toggleSection('categories')}
                className="px-3 py-2 border-b border-[#ccd0d4] font-semibold text-sm text-[#23282d] flex justify-between items-center cursor-pointer hover:bg-[#f9f9f9]"
              >
                <span>Categories</span>
                <span className="text-gray-400">{collapsedSections['categories'] ? '▴' : '▾'}</span>
              </div>
              {!collapsedSections['categories'] && (
                <div className="p-3 animate-in slide-in-from-top-2 duration-200">
                  <div className="border border-[#ddd] h-40 overflow-y-auto p-2 space-y-2">
                    {['Travel Guide', 'Cebu News', 'Tips & Tricks', 'Itinerary'].map(cat => (
                      <label key={cat} className="flex items-center text-xs text-[#555] cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          checked={editingPost.category === cat}
                          onChange={() => setEditingPost({ ...editingPost, category: cat })}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      const newCat = window.prompt('Enter new category name:');
                      if (newCat) {
                        // In a real app we'd update a categories list, 
                        // here we just set it for the current post
                        setEditingPost({ ...editingPost, category: newCat });
                      }
                    }}
                    className="mt-2 text-[#0071a1] text-xs underline"
                  >
                    + Add New Category
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white border border-[#ccd0d4] shadow-sm">
              <div 
                onClick={() => toggleSection('featuredImage')}
                className="px-3 py-2 border-b border-[#ccd0d4] font-semibold text-sm text-[#23282d] flex justify-between items-center cursor-pointer hover:bg-[#f9f9f9]"
              >
                <span>Featured Image</span>
                <span className="text-gray-400">{collapsedSections['featuredImage'] ? '▴' : '▾'}</span>
              </div>
              {!collapsedSections['featuredImage'] && (
                <div className="p-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  {editingPost.image ? (
                    <div className="relative group">
                      <img src={editingPost.image} className="w-full h-32 object-cover border border-[#ddd]" alt="Featured" />
                      <button 
                        onClick={() => setEditingPost({ ...editingPost, image: '' })}
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded text-[10px] opacity-0 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-[#ccd0d4] h-32 flex items-center justify-center text-center p-4">
                      <button 
                        onClick={() => setShowMediaModal(true)}
                        className="text-[#0071a1] text-xs underline"
                      >
                        Set featured image
                      </button>
                    </div>
                  )}
                  <input 
                    className="w-full p-2 border border-[#ddd] text-[10px] font-mono"
                    placeholder="Paste image URL here..."
                    value={editingPost.image}
                    onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div className="bg-white border border-[#ccd0d4] shadow-sm">
              <div 
                onClick={() => toggleSection('author')}
                className="px-3 py-2 border-b border-[#ccd0d4] font-semibold text-sm text-[#23282d] flex justify-between items-center cursor-pointer hover:bg-[#f9f9f9]"
              >
                <span>Author</span>
                <span className="text-gray-400">{collapsedSections['author'] ? '▴' : '▾'}</span>
              </div>
              {!collapsedSections['author'] && (
                <div className="p-3 animate-in slide-in-from-top-2 duration-200">
                  <select 
                    className="w-full p-1 border border-[#ddd] text-xs"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  >
                    <option value="YB Team">YB Team</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Media Modal */}
        {showMediaModal && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded shadow-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[#ccd0d4] bg-[#f7f7f7] flex justify-between items-center">
                <h3 className="font-semibold text-[#23282d]">Add Media</h3>
                <button onClick={() => setShowMediaModal(false)} className="text-gray-400 hover:text-black">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-[#555]">Paste the URL of the image you want to use.</p>
                <input 
                  type="text"
                  className="w-full p-2 border border-[#ddd] outline-none focus:border-[#5b9dd9] text-sm"
                  placeholder="https://example.com/image.jpg"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  autoFocus
                />
                {mediaUrl && (
                  <div className="border border-[#ddd] p-2 bg-gray-50">
                    <img src={mediaUrl} className="max-h-40 mx-auto object-contain" alt="Preview" />
                  </div>
                )}
              </div>
              <div className="px-4 py-3 bg-[#f7f7f7] border-t border-[#ccd0d4] flex justify-end space-x-2">
                <button 
                  onClick={() => setShowMediaModal(false)}
                  className="px-4 py-1.5 border border-[#ccc] rounded text-xs font-semibold hover:bg-[#eee]"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (mediaUrl) {
                      if (editorMode === 'visual') {
                        setEditingPost({ ...editingPost, content: editingPost.content + `<img src="${mediaUrl}" alt="Media" />` });
                      } else {
                        setEditingPost({ ...editingPost, content: editingPost.content + `\n<img src="${mediaUrl}" alt="Media" />` });
                      }
                      setMediaUrl('');
                      setShowMediaModal(false);
                    }
                  }}
                  className="px-4 py-1.5 bg-[#0071a1] text-white rounded text-xs font-semibold hover:bg-[#006799]"
                >
                  Insert into post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-normal text-[#23282d]">Posts</h1>
          <button 
            onClick={createNewPost}
            className="px-2 py-1 border border-[#ccc] rounded bg-[#f7f7f7] text-[#0071a1] text-xs font-semibold hover:bg-[#eee] transition-colors"
          >
            Add New
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#ccd0d4] shadow-sm">
        <div className="p-4 border-b border-[#ccd0d4] flex flex-col md:flex-row md:items-center justify-between bg-white gap-4">
          <div className="flex items-center space-x-2 text-sm text-[#555]">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`${statusFilter === 'all' ? 'font-semibold text-[#000]' : 'text-[#0071a1] hover:text-[#00a0d2]'}`}
            >
              All ({config.blog.length})
            </button>
            <span className="text-[#ddd]">|</span>
            <button 
              onClick={() => setStatusFilter('published')}
              className={`${statusFilter === 'published' ? 'font-semibold text-[#000]' : 'text-[#0071a1] hover:text-[#00a0d2]'}`}
            >
              Published ({config.blog.filter(p => p.published).length})
            </button>
            <span className="text-[#ddd]">|</span>
            <button 
              onClick={() => setStatusFilter('draft')}
              className={`${statusFilter === 'draft' ? 'font-semibold text-[#000]' : 'text-[#0071a1] hover:text-[#00a0d2]'}`}
            >
              Drafts ({config.blog.filter(p => !p.published).length})
            </button>
          </div>
          <div className="relative">
            <input 
              type="text"
              placeholder="Search posts..."
              className="pl-2 pr-8 py-1 border border-[#ddd] text-sm outline-none focus:border-[#5b9dd9] w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="p-3 bg-white border-b border-[#ccd0d4] flex items-center space-x-2 text-xs text-[#555]">
          <select 
            id="bulk-action-selector"
            className="border border-[#ddd] p-1 outline-none"
          >
            <option value="">Bulk Actions</option>
            <option value="trash">Move to Trash</option>
            <option value="publish">Publish</option>
          </select>
          <button 
            onClick={() => {
              const select = document.getElementById('bulk-action-selector') as HTMLSelectElement;
              handleBulkAction(select.value);
            }}
            className="px-2 py-1 border border-[#ccc] rounded bg-[#f7f7f7] hover:bg-[#eee] font-semibold"
          >
            Apply
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm font-bold text-[#23282d] bg-white border-b border-[#ccd0d4]">
                <th className="px-4 py-2 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPosts(filteredPosts.map(p => p.slug));
                      } else {
                        setSelectedPosts([]);
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Categories</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#555]">
              {filteredPosts.map((post, idx) => (
                <React.Fragment key={post.slug}>
                  <tr className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'} border-b border-[#f1f1f1] group hover:bg-[#f0f0f0]`}>
                    <td className="px-4 py-4">
                      <input 
                        type="checkbox" 
                        checked={selectedPosts.includes(post.slug)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPosts([...selectedPosts, post.slug]);
                          } else {
                            setSelectedPosts(selectedPosts.filter(s => s !== post.slug));
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <button 
                          onClick={() => {
                            setEditingPost(post);
                            setOriginalSlug(post.slug);
                            setView('edit');
                          }}
                          className="text-[#0071a1] font-bold hover:text-[#00a0d2] text-base"
                        >
                          {post.title} {!post.published && <span className="text-[#555] font-normal">— Draft</span>}
                        </button>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                          <button 
                            onClick={() => {
                              setEditingPost(post);
                              setOriginalSlug(post.slug);
                              setView('edit');
                            }}
                            className="text-[#0071a1] hover:text-[#00a0d2]"
                          >
                            Edit
                          </button>
                          <span className="text-[#ddd]">|</span>
                          <button 
                            onClick={() => setQuickEditingSlug(quickEditingSlug === post.slug ? null : post.slug)}
                            className="text-[#0071a1] hover:text-[#00a0d2]"
                          >
                            Quick Edit
                          </button>
                          <span className="text-[#ddd]">|</span>
                          <button 
                            onClick={() => handleDelete(post.slug)}
                            className="text-[#a00] hover:text-red-600"
                          >
                            Trash
                          </button>
                          <span className="text-[#ddd]">|</span>
                          <a 
                            href={`/blog/${post.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#0071a1] hover:text-[#00a0d2]"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#0071a1]">{post.author}</td>
                    <td className="px-4 py-4 text-[#0071a1]">{post.category}</td>
                    <td className="px-4 py-4">
                      <div className="text-xs">
                        {post.published ? 'Published' : 'Last Modified'}<br />
                        {post.date}
                      </div>
                    </td>
                  </tr>
                  {quickEditingSlug === post.slug && (
                    <tr className="bg-[#f1f1f1] border-b border-[#ccd0d4]">
                      <td colSpan={5} className="p-4">
                        <div className="bg-white border border-[#ccd0d4] p-4 shadow-sm">
                          <h4 className="text-sm font-bold uppercase mb-4 text-[#23282d]">Quick Edit</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-semibold mb-1">Title</label>
                                <input 
                                  className="w-full p-2 border border-[#ddd] text-sm outline-none focus:border-[#5b9dd9]"
                                  value={post.title}
                                  onChange={(e) => {
                                    const updated = { 
                                      ...post, 
                                      title: e.target.value,
                                      slug: e.target.value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                                    };
                                    const updatedBlog = config.blog.map(p => p.slug === post.slug ? updated : p);
                                    updateConfig({ blog: updatedBlog });
                                    // Update the quick edit slug so it stays open
                                    setQuickEditingSlug(updated.slug);
                                  }}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold mb-1">Slug</label>
                                <input 
                                  className="w-full p-2 border border-[#ddd] text-sm outline-none focus:border-[#5b9dd9]"
                                  value={post.slug}
                                  disabled
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold mb-1">Date</label>
                                <input 
                                  className="w-full p-2 border border-[#ddd] text-sm outline-none focus:border-[#5b9dd9]"
                                  value={post.date}
                                  onChange={(e) => {
                                    const updated = { ...post, date: e.target.value };
                                    const updatedBlog = config.blog.map(p => p.slug === post.slug ? updated : p);
                                    updateConfig({ blog: updatedBlog });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-semibold mb-1">Category</label>
                                <select 
                                  className="w-full p-2 border border-[#ddd] text-sm outline-none focus:border-[#5b9dd9]"
                                  value={post.category}
                                  onChange={(e) => {
                                    const updated = { ...post, category: e.target.value };
                                    const updatedBlog = config.blog.map(p => p.slug === post.slug ? updated : p);
                                    updateConfig({ blog: updatedBlog });
                                  }}
                                >
                                  {['Travel Guide', 'Cebu News', 'Tips & Tricks', 'Itinerary'].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex items-center space-x-4">
                                <label className="flex items-center text-xs cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                    checked={post.published}
                                    onChange={(e) => {
                                      const updated = { ...post, published: e.target.checked };
                                      const updatedBlog = config.blog.map(p => p.slug === post.slug ? updated : p);
                                      updateConfig({ blog: updatedBlog });
                                    }}
                                  />
                                  Published
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 flex justify-between items-center">
                            <button 
                              onClick={() => setQuickEditingSlug(null)}
                              className="text-[#a00] text-xs hover:underline"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => setQuickEditingSlug(null)}
                              className="px-4 py-1.5 bg-[#0071a1] text-white rounded text-xs font-semibold hover:bg-[#006799]"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {filteredPosts.length === 0 && (
            <div className="py-10 text-center text-gray-500 italic">
              No posts found.
            </div>
          )}
        </div>

        <div className="p-3 bg-white border-t border-[#ccd0d4] flex justify-between items-center text-xs text-[#555]">
          <div>{filteredPosts.length} items</div>
        </div>
      </div>
    </div>
  );
};

type TabType = 'blog' | 'tours' | 'pages' | 'design' | 'navigation' | 'seo' | 'business';

const Admin: React.FC = () => {
  const { config, updateConfig, resetToDefault } = useConfig();
  const [activeTab, setActiveTab] = useState<TabType>('blog');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [globalSaveStatus, setGlobalSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  // Blog Management State (Lifted)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [blogView, setBlogView] = useState<'list' | 'edit'>('list');

  const createNewPost = () => {
    const newPost: BlogPost = {
      slug: `new-post-${Date.now()}`,
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: 'YB Team',
      image: '',
      category: 'Travel Guide',
      content: '',
      published: false,
      updatedAt: new Date().toISOString()
    };
    setEditingPost(newPost);
    setOriginalSlug(newPost.slug);
    setBlogView('edit');
    setActiveTab('blog');
  };

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
        if (tab === 'blog') {
          setBlogView('list');
          setEditingPost(null);
        }
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
          <div 
            onClick={createNewPost}
            className="flex items-center space-x-2 hover:bg-[#32373c] px-2 h-full cursor-pointer transition-colors"
          >
            <span className="text-lg">➕</span>
            <span>New Post</span>
          </div>
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
            <SidebarButton tab="blog" label="Posts" icon="📌" />
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

            {activeTab === 'blog' && (
              <BlogManager 
                editingPost={editingPost}
                setEditingPost={setEditingPost}
                view={blogView}
                setView={setBlogView}
                originalSlug={originalSlug}
                setOriginalSlug={setOriginalSlug}
                createNewPost={createNewPost}
              />
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
