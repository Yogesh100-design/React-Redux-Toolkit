import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Zap, Star, ArrowRight, Code2, Sparkles, Heart, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import devImage from "../assets/edu.webp";

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
        <title>Free HD Images, 4K Stock Videos & GIFs Download | Vault Visual Search</title>
        <meta name="description" content="Download free HD images, aesthetic backgrounds, and royalty free stock videos. Search 4K video clips for YouTube, funny GIFs, and developer wallpapers. High quality and copyright free media for creators." />
        <meta name="keywords" content="free hd images, royalty free stock videos, 4K background videos, funny gifs, aesthetic photos, developer wallpapers, copyright free media, instagram reels background" />
        <meta property="og:title" content="Free HD Images & 4K Videos | Vault Visual Search" />
        <meta property="og:description" content="Download high-quality royalty free images, 4K videos, and trending GIFs. Perfect for creators, developers, and startups." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Vault Visual Search",
              "url": "https://vault-visual-engine.vercel.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vault-visual-engine.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "description": "The ultimate resource for free HD images, 4K stock videos, and GIFs."
            }
          `}
        </script>
      </Helmet>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-amber-100 bg-[#fdfdf7]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-400 rounded-xl flex items-center justify-center text-black shadow-sm">
                <Play size={18} fill="currentColor" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-slate-900 font-black text-xl md:text-2xl tracking-tighter">VAULT</span>
                <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider">Developed by Yogesh</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/search')}
              className="bg-amber-400 text-black px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-black hover:bg-amber-300 transition-all shadow-md shadow-amber-200/50"
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
            FREE HD IMAGES & <br />
            <span className="text-amber-500 italic">4K STOCK VIDEOS.</span>
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
        
        {/* SEO Keywords / Trending Searches */}
        <div className="container mx-auto mt-16 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Trending Searches</p>
            <div className="flex flex-wrap justify-center gap-3 px-4 max-w-5xl mx-auto">
                {[
                    "Aesthetic Wallpapers", "Business Meetings", "Coding Setup", "Nature 4K", 
                    "Funny Reaction GIFs", "Startup Office", "Abstract Art", "Minimalist Backgrounds",
                    "Festival Celebrations", "Rainy Day Vibes", "Coffee Break", "Fitness Motivation"
                ].map((term) => (
                    <button 
                        key={term}
                        onClick={() => {
                            // In a real app, this would navigate with query param
                            // navigate(`/search?q=${encodeURIComponent(term)}`)
                            // For now, simple navigation to search
                            navigate('/search');
                        }}
                        className="px-4 py-2 bg-white border border-slate-200 hover:border-amber-400 hover:text-amber-600 rounded-full text-xs font-bold text-slate-600 transition-colors shadow-sm"
                    >
                        {term}
                    </button>
                ))}
            </div>
            <div className="mt-8 text-slate-400 text-[10px] md:text-xs font-medium max-w-3xl mx-auto leading-relaxed px-4">
                Popular: <span className="hover:text-slate-600 transition-colors cursor-pointer">Free HD Images Download</span> • <span className="hover:text-slate-600 transition-colors cursor-pointer">Royalty Free Stock Videos</span> • <span className="hover:text-slate-600 transition-colors cursor-pointer">Funny GIFs</span> • <span className="hover:text-slate-600 transition-colors cursor-pointer">Developer Wallpapers</span> • <span className="hover:text-slate-600 transition-colors cursor-pointer">Startup Presentation Backgrounds</span>
            </div>
        </div>
      </section>

      {/* --- MASONRY PREVIEW / COLLECTION SECTION --- */}
      <section className="px-4 md:px-6 pb-20 md:pb-32">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span className="w-6 md:w-8 h-[2px] bg-amber-500"></span>
                <span className="text-amber-600 font-bold uppercase tracking-widest text-[10px] md:text-xs">Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                Curated <span className="text-amber-500 italic">Collections.</span>
              </h2>
            </div>
            <button 
              onClick={() => navigate('/search')}
              className="group flex items-center gap-2 text-slate-900 font-bold hover:text-amber-600 transition-colors text-sm md:text-base"
            >
              View All Collections <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="p-4 md:p-8 bg-white border border-amber-100/50 rounded-3xl md:rounded-[3rem] shadow-2xl shadow-amber-900/5">
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
      <section className="py-16 md:py-24 bg-[#f9f9f2] border-y border-amber-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
            {/* Big Card */}
            <div className="md:col-span-8 bg-white border border-amber-100 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
              <Code2 className="text-amber-500 mb-6" size={32} />
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Unsplash + Pexels <br/> + Giphy</h3>
              <p className="text-slate-500 text-base md:text-lg max-w-sm leading-relaxed">One search bar, three distinct universes of content. Switch tabs to explore Photos, Videos, or GIFs instantly.</p>
            </div>

            {/* Small Card */}
            <div className="md:col-span-4 bg-amber-400 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 text-black flex flex-col justify-between gap-8 md:gap-0">
              <Zap size={32} strokeWidth={2.5} />
              <h3 className="text-xl md:text-2xl font-black leading-tight uppercase italic tracking-tighter">Lightning <br/> Fast Search.</h3>
            </div>

            {/* Tech Card */}
            <div className="md:col-span-12 bg-slate-900 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 flex flex-col md:flex-row justify-between items-center text-white text-center md:text-left">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Curated for Creators.</h3>
                <p className="text-slate-400 text-sm md:text-base">Find the perfect asset for your next video, website, or social post.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-0">
                {['Photos', 'Videos', 'GIFs'].map(tag => (
                  <span key={tag} className="px-4 md:px-5 py-2 bg-white/10 border border-white/20 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEVELOPER SHOWCASE --- */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10 md:gap-16">
             {/* Profile Image with Ring */}
             <div className="relative group shrink-0">
                <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relatve w-40 h-40 md:w-56 md:h-56 rounded-full p-2 bg-white border-2 border-amber-100 shadow-xl overflow-hidden">
                  <img src={devImage} alt="Yogesh Chavan" className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="absolute bottom-2 right-4 bg-white text-amber-600 p-2 rounded-full shadow-lg border border-amber-50">
                  <Code2 size={20} />
                </div>
             </div>

             {/* Content */}
             <div className="text-center md:text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-100/50 text-amber-700 text-[10px] font-black uppercase tracking-widest mb-6">
                  Meet the Developer
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
                  Crafting Digital <br/>
                  <span className="text-amber-500 italic">Experiences.</span>
                </h3>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
                  Hi, I'm <span className="text-slate-900 font-bold">Yogesh Chavan</span>. I build high-performance web applications with a focus on stunning visuals and seamless user interactions. Vault is a testament to my passion for modern frontend engineering.
                </p>
                <a 
                  href="https://yogeshchavan.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-400 hover:text-black transition-all group"
                >
                  Visit My Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-black text-slate-900 mb-12 md:mb-20 tracking-tighter uppercase italic">Words from the vault</h2>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-14 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl relative text-center">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 p-4 rounded-full shadow-lg border-4 border-white">
                 <Star size={32} fill="currentColor" className="text-black" />
              </div>
              
              <div className="mt-8 mb-8 relative">
                <span className="text-6xl text-amber-100 absolute -top-8 left-0 select-none font-serif">"</span>
                <p className="text-xl md:text-3xl font-medium text-slate-800 italic leading-relaxed relative z-10 px-4 md:px-12">
                   This platform redesign represents the next generation of visual search. By unifying multiple APIs into a single, seamless interface, Vault empowers creators to find the perfect asset in seconds, not hours.
                </p>
                <span className="text-6xl text-amber-100 absolute -bottom-16 right-0 select-none font-serif">"</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                 <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-400 to-amber-100">
                    <img src={devImage} alt="Yogesh Chavan" className="w-full h-full object-cover rounded-full border-2 border-white" />
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Yogesh Chavan</h4>
                    <p className="text-xs text-amber-600 font-bold uppercase tracking-widest">Full Stack Developer & Creator</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-amber-100 bg-[#fdfdf7]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <span className="text-xl font-black tracking-tighter">VAULT<span className="text-amber-500">.</span></span>
          <div className="flex gap-10 mt-6 md:mt-0 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="https://yogeshchavan.in/" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">Portfolio</a>
            <a href="https://github.com/YOGESH-D-CHAVAN" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">GitHub</a>
            <a href="https://www.linkedin.com/in/yogesh-chavan-494196316/" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">LinkedIn</a>
          </div>
          <p className="mt-6 md:mt-0 text-xs font-medium text-slate-400">© 2026 VAULT INC. CRAFTED BY YOGESH</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;