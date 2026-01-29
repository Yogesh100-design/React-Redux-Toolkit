import React from 'react';
import {motion} from 'framer-motion'
import { 
  Play, Layout, Zap, Users, ShieldCheck, Star, 
  ArrowRight, Code2, Sparkles, Globe, Heart, Download
} from 'lucide-react';

const NavLink = ({ children }) => (
  <a href="#" className="text-slate-500 hover:text-amber-600 transition-colors text-sm font-semibold tracking-tight">{children}</a>
);

import { useNavigate } from 'react-router-dom';

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
            {/* <div className="hidden md:flex gap-8">
              <NavLink>The Engine</NavLink>
              <NavLink>Showcase</NavLink>
              <NavLink>Developers</NavLink>
            </div> */}
          </div>
          <div className="flex items-center gap-4">
            {/* <button className="text-sm font-bold text-slate-500 hover:text-slate-900 transition">Log In</button> */}
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
      <section className="pt-40 pb-24 px-6 relative">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 border border-amber-200 text-amber-700 text-xs font-bold mb-10 uppercase tracking-wider"
          >
            <Sparkles size={14} /> NEW: TRIPLE-SOURCE ENGINE
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            SEARCH THE <br />
            <span className="text-amber-500 italic">VISUAL WEB.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            The ultimate creative resource. Instantly search high-res photos, 4K videos, and trending GIFs from the world's best libraries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/search')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
            >
              Start Building <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/search')}
              className="bg-white border-2 border-slate-100 hover:border-amber-200 text-slate-700 px-10 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2"
            >
              Explore Media
            </button>
          </div>
        </div>
      </section>

      {/* --- MASONRY PREVIEW --- */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-6xl p-6 bg-white border border-amber-100 rounded-[3rem] shadow-2xl shadow-amber-200/20 overflow-hidden">
          <div className="columns-2 md:columns-4 gap-6 space-y-6">
            {[
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop"
]
.map((img, i) => (
              <div key={i} className={`bg-amber-50 rounded-[2rem] overflow-hidden border border-amber-100/50 group cursor-pointer relative break-inside-avoid ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 p-6 flex flex-col justify-end">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={(e) => handleDownload(e, img, i)}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-amber-100 transition-colors"
                      title="Download"
                    >
                      <Download size={16} className="text-slate-900" />
                    </button>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Heart size={16} className="text-amber-500" fill="currentColor"/>
                    </div>
                  </div>
                </div>
                <img src={img} alt="Gallery" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
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