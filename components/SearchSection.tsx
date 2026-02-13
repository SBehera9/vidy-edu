
import React, { useState } from 'react';
import { Loader2, Sparkles, Link as LinkIcon, ExternalLink, Search, Trash2, Globe } from 'lucide-react';
import { academicSearch } from '../services/eduService';
import { SearchResult } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await academicSearch(query);
      setResult(data);
    } catch (error) {
      setResult({ text: "Research sync error. Please retry.", sources: [] });
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 text-left animate-fade-up">
      <div className="max-w-3xl mb-20">
        <div className="flex items-center gap-2 mb-6 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">
          <Globe className="w-3.5 h-3.5" /> Intelligence Lab
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-6">Research <span className="text-emerald-500">Lab</span></h2>
        <p className="text-slate-500 text-lg font-medium">Ask Vidy anything—from quantum physics to career roadmaps. Powered by real-time internet search.</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-24">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter research topic..."
          className="w-full pl-10 pr-48 py-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] font-bold text-xl outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
        />
        <button
          disabled={loading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-[75%] px-10 bg-slate-900 text-white rounded-[1.8rem] font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Search
        </button>
      </form>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 animate-fade-up">
          <div className="lg:col-span-3 bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:font-black prose-headings:text-slate-900 prose-li:text-slate-600 prose-a:text-emerald-600">
               <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.text}</ReactMarkdown>
             </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Sources Found</h4>
            <div className="space-y-3">
              {result.sources.length > 0 ? result.sources.map((s, i) => (
                <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-white hover:border-emerald-500 transition-all group">
                   <div className="flex items-center gap-3 overflow-hidden">
                     <LinkIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                     <span className="text-[10px] font-black text-slate-600 truncate uppercase tracking-widest">{s.title}</span>
                   </div>
                   <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-slate-900" />
                </a>
              )) : <p className="text-xs text-slate-400 px-4 font-bold italic">Synthesized from global web databases.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
