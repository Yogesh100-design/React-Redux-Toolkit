import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Zap, Star, ArrowRight, Code2, Sparkles, Heart, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDownload = async (e, url, index) => {
    e.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `vault-featured-${index}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-[#fdfdf7] text-slate-900 selection:bg-amber-200">
      <Helmet>
        <title>Vault | The Visual Web Search Engine</title>
        <meta name="description" content="Discover millions of high-quality photos, videos, and GIFs. The ultimate creative resource for designers and developers." />
        <meta property="og:title" content="Vault | The Visual Web Search Engine" />
        <meta property="og:description" content="Search high-res photos, 4K videos, and trending GIFs from the world's best libraries." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop" />
      </Helmet>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-amber-100 bg-[#fdfdf7]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-slate-900 font-black text-2xl tracking-tighter flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-black shadow-sm">
                <Play size={20} fill="currentColor" />
              </div>
              VAULT
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/search')}
              className="bg-amber-400 text-black px-6 py-2.5 rounded-full text-sm font-black hover:bg-amber-300 transition-all shadow-md shadow-amber-200/50"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 relative">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 border border-amber-200 text-amber-700 text-[10px] md:text-xs font-bold mb-8 md:mb-10 uppercase tracking-wider"
          >
            <Sparkles size={14} /> NEW: TRIPLE-SOURCE ENGINE
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 md:mb-8 tracking-tighter leading-[0.9]">
            SEARCH THE <br />
            <span className="text-amber-500 italic">VISUAL WEB.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            The ultimate creative resource. Instantly search high-res photos, 4K videos, and trending GIFs from the world's best libraries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 sm:px-0">
            <button 
              onClick={() => navigate('/search')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              Start Building <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/search')}
              className="bg-white border-2 border-slate-100 hover:border-amber-200 text-slate-700 px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              Explore Media
            </button>
          </div>
        </div>
      </section>

      {/* --- MASONRY PREVIEW / COLLECTION SECTION --- */}
      <section className="px-6 pb-32">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-amber-500"></span>
                <span className="text-amber-600 font-bold uppercase tracking-widest text-xs">Trending Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                Curated <span className="text-amber-500 italic">Collections.</span>
              </h2>
            </div>
            <button 
              onClick={() => navigate('/search')}
              className="group flex items-center gap-2 text-slate-900 font-bold hover:text-amber-600 transition-colors"
            >
              View All Collections <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="p-8 bg-white border border-amber-100/50 rounded-[3rem] shadow-2xl shadow-amber-900/5">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {[
                { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop", title: "Atmospheric Nature", author: "Anders Jilden" },
                { url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1000&auto=format&fit=crop", title: "Urban Exploration", author: "Marcus L." },
                { url: "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1000&auto=format&fit=crop", title: "Modern Architecture", author: "Simone H." },
                { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop", title: "Alpine Stars", author: "Benjamin V." },
                { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop", title: "Coastal Waves", author: "Silas B." },
                { url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop", title: "Dark Portraits", author: "Elijah O." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="break-inside-avoid relative group rounded-[2rem] overflow-hidden bg-slate-100 cursor-pointer"
                >
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-8">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Collection</p>
                          <h3 className="text-white font-bold text-xl leading-tight">{item.title}</h3>
                          <p className="text-slate-300 text-sm mt-2">by {item.author}</p>
                        </div>
                        <div className="flex gap-3">
                           <button 
                            onClick={(e) => handleDownload(e, item.url, i)}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white text-white hover:text-black transition-all"
                            aria-label={`Download ${item.title}`}
                            title="Download"
                           >
                            <Download size={18} />
                           </button>
                           <button 
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-amber-500 text-white transition-all"
                            aria-label={`Like ${item.title}`}
                           >
                             <Heart size={18} fill="currentColor" />
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <img 
                    src={item.url} 
                    alt={`${item.title} by ${item.author}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section className="py-24 bg-[#f9f9f2] border-y border-amber-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
            {/* Big Card */}
            <div className="md:col-span-8 bg-white border border-amber-100 rounded-[2.5rem] p-12 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
              <Code2 className="text-amber-500 mb-6" size={40} />
              <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Unsplash + Pexels <br/> + Giphy</h3>
              <p className="text-slate-500 text-lg max-w-sm leading-relaxed">One search bar, three distinct universes of content. Switch tabs to explore Photos, Videos, or GIFs instantly.</p>
            </div>

            {/* Small Card */}
            <div className="md:col-span-4 bg-amber-400 rounded-[2.5rem] p-12 text-black flex flex-col justify-between">
              <Zap size={40} strokeWidth={2.5} />
              <h3 className="text-2xl font-black leading-tight uppercase italic tracking-tighter">Lightning <br/> Fast Search.</h3>
            </div>

            {/* Tech Card */}
            <div className="md:col-span-12 bg-slate-900 rounded-[2.5rem] p-12 flex flex-col md:flex-row justify-between items-center text-white">
              <div>
                <h3 className="text-3xl font-bold mb-2">Curated for Creators.</h3>
                <p className="text-slate-400">Find the perfect asset for your next video, website, or social post.</p>
              </div>
              <div className="flex gap-4 mt-8 md:mt-0">
                {['Photos', 'Videos', 'GIFs'].map(tag => (
                  <span key={tag} className="px-5 py-2 bg-white/10 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl font-black text-slate-900 mb-20 tracking-tighter uppercase italic">Words from the vault</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative">
                <Star className="text-amber-400 mb-6" size={24} fill="currentColor" />
                <p className="text-slate-600 mb-8 font-medium italic leading-relaxed">"The best tool for finding inspiration. I use it every day to gather assets for my client projects."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center font-bold text-amber-700 italic text-xl">Y</div>
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Yogesh Kumar</p>
                    <p className="text-xs text-amber-600 font-bold uppercase tracking-widest">Creative Director</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-amber-100 bg-[#fdfdf7]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <span className="text-xl font-black tracking-tighter">VAULT<span className="text-amber-500">.</span></span>
          <div className="flex gap-10 mt-6 md:mt-0 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-amber-600 transition">Twitter</a>
            <a href="#" className="hover:text-amber-600 transition">GitHub</a>
            <a href="#" className="hover:text-amber-600 transition">LinkedIn</a>
          </div>
          <p className="mt-6 md:mt-0 text-xs font-medium text-slate-400">© 2026 VAULT INC. CRAFTED BY YOGESH</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;