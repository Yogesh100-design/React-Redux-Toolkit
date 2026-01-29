import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import ResultGrid from '../components/ResultGrid';

const SearchPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fdfdf7] text-slate-900 font-sans selection:bg-amber-200">
            <Helmet>
                <title>Search | Vault Visual Engine</title>
                <meta name="description" content="Search for high-resolution photos, 4K videos, and GIFs. Filter by type and find the perfect asset for your project." />
                <meta property="og:title" content="Search | Vault Visual Engine" />
                <meta property="og:description" content="Search for high-resolution photos, 4K videos, and GIFs." />
            </Helmet>

            {/* Header */}
            <header className="sticky top-0 z-40 w-full bg-[#fdfdf7]/80 backdrop-blur-md border-b border-amber-100">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-black shadow-sm">
                            <Play size={20} fill="currentColor" />
                        </div>
                        <span className="text-slate-900 font-black text-2xl tracking-tighter">VAULT</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-8 mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-center">
                        Find your <span className="text-amber-500 italic">inspiration.</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-xl text-center">
                        Search through millions of high-quality photos, videos, and GIFs.
                    </p>

                    <div className="w-full max-w-2xl">
                        <SearchBar />
                    </div>
                    
                    <div className="w-full max-w-2xl">
                        <Tabs />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <ResultGrid />
                </motion.div>
            </main>
        </div>
    );
};

export default SearchPage;
