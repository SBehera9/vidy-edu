
import React, { useEffect, useState } from 'react';
import { fetchEducationalNews } from '../services/eduService';
import { NewsItem } from '../types';
import { ArrowUpRight, Clock, Newspaper, Zap, Bookmark, ChevronRight, Globe, RefreshCw } from 'lucide-react';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    setLoading(true);
    const data = await fetchEducationalNews();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => { loadNews(); }, []);

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 text-left animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 text-rose-600 font-black text-[10px] uppercase tracking-[0.3em]">
            <Newspaper className="w-3.5 h-3.5" /> Vidy Gazette
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-6">Updates</h2>
          <p className="text-slate-500 text-lg font-medium">Real-time alerts on scholarships, exam dates, and policy changes.</p>
        </div>
        <button onClick={loadNews} disabled={loading} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-500 transition-all flex items-center gap-3 shadow-xl shadow-slate-200">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Sync Gazette
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 h-[500px] bg-slate-50 rounded-[4rem] animate-pulse"></div>
          <div className="h-[500px] bg-slate-50 rounded-[4rem] animate-pulse"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Feature */}
          <div className="lg:col-span-2 group relative bg-slate-900 rounded-[4rem] p-12 md:p-20 overflow-hidden flex flex-col justify-end min-h-[580px] shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <span className="text-rose-400 font-black text-[10px] uppercase tracking-widest block mb-6">Featured • {news[0]?.source}</span>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight group-hover:text-rose-200 transition-colors">{news[0]?.title}</h3>
              <p className="text-slate-400 text-lg mb-12 line-clamp-3 font-medium">{news[0]?.snippet}</p>
              <a href={news[0]?.link} target="_blank" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-500 hover:text-white transition-all">Full Coverage <ArrowUpRight className="w-4 h-4" /></a>
            </div>
          </div>

          {/* List Sidebar */}
          <div className="flex flex-col gap-6">
             <div className="bg-white p-12 rounded-[4rem] border border-slate-100 flex-grow">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 pb-4 border-b border-slate-50">Latest Bulletins</h4>
                <div className="space-y-12">
                  {news.slice(1, 5).map((item, i) => (
                    <a key={i} href={item.link} target="_blank" className="block group border-b border-slate-50 last:border-0 pb-8 last:pb-0">
                       <span className="text-[10px] font-black text-rose-500 block mb-2 uppercase tracking-widest">{item.source}</span>
                       <h5 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">{item.title}</h5>
                       <span className="text-[9px] text-slate-300 font-bold uppercase mt-3 block tracking-widest">{item.date}</span>
                    </a>
                  ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
