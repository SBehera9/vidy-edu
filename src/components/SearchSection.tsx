import React, { useState } from 'react';
import { Loader2, Sparkles, Link as LinkIcon, ExternalLink, Search, Globe, AlertCircle, BookOpen, Zap, ChevronRight, Star, Heart, Shield, Clock } from 'lucide-react';
import { academicSearch } from '../services/eduService';
import { SearchResult } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'UPSC syllabus',
    'JEE Main 2026',
    'CBSE Class 12',
    'NEET exam pattern'
  ]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    setResult(null);
    setError(false);
    try {
      const data = await academicSearch(query);
      setResult(data);
      // Add to recent searches
      setRecentSearches(prev => [query, ...prev.slice(0, 3)]);
    } catch (error) {
      setError(true);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12 mb-12 sm:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="text-emerald-600 font-black text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Intelligence Lab
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-6">
            Research{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Lab
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-slate-500 text-base sm:text-xl font-medium">
            Ask anything—from exam patterns to career roadmaps. Accessing free knowledge bases for verified answers.
          </p>
        </div>
      </div>

      {/* Search Form - Enhanced */}
      <form onSubmit={handleSearch} className="relative mb-16 sm:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2rem] blur-2xl opacity-20"></div>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter research topic..."
            className="w-full pl-6 sm:pl-10 pr-40 sm:pr-56 py-6 sm:py-8 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[1.5rem] sm:rounded-[2.5rem] font-bold text-base sm:text-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="group absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-[80%] px-6 sm:px-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-[1rem] sm:rounded-[1.8rem] font-black uppercase text-[8px] sm:text-[10px] tracking-widest hover:from-emerald-500 hover:to-teal-500 transition-all duration-500 disabled:opacity-50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              {loading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              Search
              <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </form>

      {/* Recent Searches - New */}
      {!query && !loading && !result && !error && (
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setQuery(search)}
                className="group px-4 py-2 bg-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-300"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error State - Enhanced */}
      {error && (
        <div className="mb-12 p-6 sm:p-10 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-[2rem] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left animate-in scale-in duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <AlertCircle className="relative w-12 h-12 sm:w-16 sm:h-16 text-rose-500" />
          </div>
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-rose-900 mb-1">Search Error</h4>
            <p className="text-rose-600/70 text-sm sm:text-base font-medium">Unable to fetch results. Please try again.</p>
            <button 
              onClick={() => setError(false)}
              className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-xl font-bold text-xs hover:bg-rose-700 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Results - Enhanced */}
      {result && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-3">
            <div className="group relative bg-white/80 backdrop-blur-xl p-8 sm:p-20 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:font-black prose-headings:text-slate-900 prose-li:text-slate-600 prose-a:text-emerald-600 text-sm sm:text-base leading-relaxed relative">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.text}</ReactMarkdown>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-r-[32px] border-t-transparent border-r-emerald-500/20 group-hover:border-r-emerald-500/40 transition-all duration-500"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Sources Found
              <Sparkles className="w-3 h-3 text-emerald-500" />
            </h4>
            
            <div className="space-y-3">
              {result.sources.length > 0 ? (
                result.sources.map((s, i) => (
                  <a 
                    key={i} 
                    href={s.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group/link relative p-4 sm:p-6 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover/link:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex items-center gap-3 overflow-hidden relative z-10">
                      <LinkIcon className="w-4 h-4 text-emerald-500 group-hover/link:text-white shrink-0" />
                      <span className="text-[9px] sm:text-[10px] font-black text-slate-600 truncate uppercase tracking-widest group-hover/link:text-white">
                        {s.title}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover/link:text-white relative z-10 group-hover/link:translate-x-1 transition-transform duration-300" />
                    
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-8 h-8">
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-transparent border-r-white/20"></div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="p-8 bg-slate-50 rounded-2xl text-center">
                  <p className="text-[10px] text-slate-400 font-bold italic uppercase tracking-widest">
                    No external sources
                  </p>
                </div>
              )}
            </div>

            {/* Trust Badge */}
            <div className="mt-6 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2 text-[8px] font-black text-emerald-600 uppercase tracking-widest">
                <Shield className="w-3 h-3" />
                Verified Information
                <Heart className="w-3 h-3 text-rose-400" />
              </div>
              <p className="text-[7px] text-slate-500 mt-2">
                Sources include Wikipedia, DuckDuckGo, and academic databases
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !result && !error && !query && (
        <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-20"></div>
            <BookOpen className="relative w-20 h-20 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Start Your Research</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Enter any topic above to get instant information from Wikipedia and academic sources.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchSection;