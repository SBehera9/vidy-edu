import React, { useEffect, useState } from 'react';
import { fetchEducationalNews } from '../services/eduService';
import { NewsItem } from '../types';
import { ArrowUpRight, Newspaper, Zap, RefreshCw } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 text-rose-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em]">
            <Newspaper className="w-3.5 h-3.5" /> Vidy Gazette
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-4 sm:mb-6">Updates</h2>
          <p className="text-slate-500 text-base sm:text-xl font-medium">Real-time alerts on scholarships, exam dates, and policy changes.</p>
        </div>
        <button onClick={loadNews} disabled={loading} className="px-8 sm:px-10 py-4 sm:py-5 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[10px] tracking-widest hover:bg-rose-500 transition-all flex items-center gap-3 shadow-xl disabled:opacity-50">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> {loading ? 'Syncing...' : 'Sync Gazette'}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          <div className="lg:col-span-2 h-[400px] sm:h-[500px] bg-slate-50 rounded-[2rem] sm:rounded-[4rem] animate-pulse"></div>
          <div className="h-[400px] sm:h-[500px] bg-slate-50 rounded-[2rem] sm:rounded-[4rem] animate-pulse"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          {/* Main Feature */}
          {news.length > 0 && (
            <>
              <div className="lg:col-span-2 group relative bg-slate-900 rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-16 overflow-hidden flex flex-col justify-end min-h-[400px] sm:min-h-[500px] shadow-2xl">
                <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-rose-500/10 rounded-full blur-[60px] sm:blur-[100px]"></div>
                <div className="relative z-10">
                  <span className="text-rose-400 font-black text-[8px] sm:text-[10px] uppercase tracking-widest block mb-4 sm:mb-6">Featured • {news[0]?.source}</span>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-8 leading-tight group-hover:text-rose-200 transition-colors line-clamp-3">{news[0]?.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-lg mb-6 sm:mb-12 line-clamp-3 font-medium">{news[0]?.snippet}</p>
                  <a href={news[0]?.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 bg-white text-slate-900 rounded-xl sm:rounded-2xl font-black uppercase text-[8px] sm:text-[10px] tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                    Full Coverage <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[4rem] border border-slate-100">
                <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 sm:mb-10 pb-4 border-b border-slate-50">Latest Bulletins</h4>
                <div className="space-y-6 sm:space-y-8">
                  {news.slice(1, 5).map((item, i) => (
                    <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block group border-b border-slate-50 last:border-0 pb-6 last:pb-0">
                       <span className="text-[8px] sm:text-[9px] font-black text-rose-500 block mb-1 sm:mb-2 uppercase tracking-widest">{item.source}</span>
                       <h5 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug text-sm sm:text-base">{item.title}</h5>
                       <span className="text-[8px] sm:text-[9px] text-slate-300 font-bold uppercase mt-2 sm:mt-3 block tracking-widest">{item.date}</span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsSection;