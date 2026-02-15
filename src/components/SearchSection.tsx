import React, { useState } from 'react';
import { Loader2, Sparkles, Link as LinkIcon, ExternalLink, Search, Globe, AlertCircle } from 'lucide-react';
import { academicSearch } from '../services/eduService';
import { SearchResult } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    setResult(null);
    setError(false);
    try {
      const data = await academicSearch(query);
      setResult(data);
    } catch (error) {
      setError(true);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left animate-in fade-in duration-1000">
      <div className="max-w-3xl mb-12 sm:mb-20">
        <div className="flex items-center gap-2 mb-4 sm:mb-6 text-emerald-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em]">
          <Globe className="w-3.5 h-3.5" /> Intelligence Lab
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-6">Research <span className="text-emerald-500">Lab</span></h2>
        <p className="text-slate-500 text-base sm:text-xl font-medium">Ask anything—from exam patterns to career roadmaps. Accessing free knowledge bases for verified answers.</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-16 sm:mb-24">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter research topic..."
          className="w-full pl-6 sm:pl-10 pr-32 sm:pr-48 py-6 sm:py-8 bg-slate-50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2.5rem] font-bold text-base sm:text-xl outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-[80%] px-6 sm:px-10 bg-slate-900 text-white rounded-[1rem] sm:rounded-[1.8rem] font-black uppercase text-[8px] sm:text-[10px] tracking-widest flex items-center gap-2 sm:gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />}
          Search
        </button>
      </form>

      {error && (
        <div className="mb-12 p-6 sm:p-10 bg-rose-50 border border-rose-100 rounded-[2rem] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
           <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500" />
           <div>
              <h4 className="text-lg sm:text-xl font-black text-rose-900 mb-1">Search Error</h4>
              <p className="text-rose-600/70 text-xs sm:text-sm font-medium">Unable to fetch results. Please try again.</p>
           </div>
        </div>
      )}

      {result && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-3 bg-white p-8 sm:p-20 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:font-black prose-headings:text-slate-900 prose-li:text-slate-600 prose-a:text-emerald-600 text-sm sm:text-base leading-relaxed">
               <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.text}</ReactMarkdown>
             </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Sources Found</h4>
            <div className="space-y-3">
              {result.sources.length > 0 ? result.sources.map((s, i) => (
                <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="p-4 sm:p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-white hover:border-emerald-500 transition-all group">
                   <div className="flex items-center gap-3 overflow-hidden">
                     <LinkIcon className="w-3.5 h-3.5 sm:w-4 h-4 text-emerald-500 shrink-0" />
                     <span className="text-[9px] sm:text-[10px] font-black text-slate-600 truncate uppercase tracking-widest">{s.title}</span>
                   </div>
                   <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-slate-900" />
                </a>
              )) : <p className="text-[10px] text-slate-400 px-4 font-bold italic uppercase tracking-widest">No external sources</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;