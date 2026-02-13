
import React, { useEffect, useState } from 'react';
import { fetchJobNotifications, fetchExamUpdates } from '../services/eduService';
import { JobNotification, AdmitCardResult } from '../types';
import { Calendar, Building2, ExternalLink, Zap, MapPin, Briefcase, ChevronDown, RefreshCw, Loader2, ArrowRight, ShieldCheck, Search, AlertCircle } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const SyncingOverlay = ({ message }: { message: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 sm:py-40 animate-in fade-in zoom-in duration-500">
    <div className="relative mb-6 sm:mb-12">
      <div className="w-24 h-24 sm:w-40 sm:h-40 border-4 sm:border-8 border-slate-100 rounded-full"></div>
      <div className="absolute inset-0 w-24 h-24 sm:w-40 sm:h-40 border-t-4 sm:border-t-8 border-indigo-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 sm:w-20 sm:h-20 bg-indigo-50 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-inner">
          <RefreshCw className="w-6 h-6 sm:w-10 sm:h-10 text-indigo-600 animate-pulse" />
        </div>
      </div>
    </div>
    <h3 className="text-xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-6 tracking-tight">Syncing Career Feed</h3>
    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] sm:tracking-[0.5em] text-[8px] sm:text-[12px] flex items-center gap-1 sm:gap-3 text-center">
       <div className="w-1 sm:w-2 h-1 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div> {message}
    </p>
  </div>
);

const JobSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'admit-cards' | 'results'>('jobs');
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      let results = activeTab === 'jobs' 
        ? await fetchJobNotifications() 
        : await fetchExamUpdates(activeTab === 'admit-cards' ? 'admit-card' : 'result');
      
      if (!results || results.length === 0) {
        setDataList([]);
      } else {
        setDataList(results);
      }
    } catch (e: any) { 
      console.error("Load Error:", e);
      setError(e.message || "Failed to sync with national database.");
      setDataList([]); 
    }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12 mb-12 sm:mb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8 text-indigo-600 font-extrabold text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            <div className="p-1.5 sm:p-2 bg-indigo-50 rounded-lg"><Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-indigo-600" /></div>
            Verified National Data
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-[0.85] mb-4 sm:mb-8">Career <br/><span className="text-indigo-600">Hub</span></h2>
          <p className="text-slate-500 text-lg sm:text-2xl font-medium leading-relaxed max-w-2xl">Real-time alerts for verified Indian vacancies. Always free, always official.</p>
        </div>
        <button 
          onClick={loadData} 
          disabled={loading} 
          className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[11px] tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 sm:gap-4 shadow-2xl active:scale-95 disabled:opacity-50 btn-shine"
        >
          <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} /> {loading ? 'Processing...' : 'Sync Latest Feed'}
        </button>
      </div>

      <div className="bg-slate-100/50 p-1.5 sm:p-2 rounded-[1.8rem] sm:rounded-[2.5rem] flex flex-wrap gap-1.5 sm:gap-2 mb-12 sm:mb-20 max-w-3xl">
        {['jobs', 'admit-cards', 'results'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => { setActiveTab(tab as any); setVisibleCount(ITEMS_PER_PAGE); }}
            className={`flex-1 py-3 sm:py-5 px-4 sm:px-10 rounded-[1.4rem] sm:rounded-[2rem] font-extrabold text-[9px] sm:text-[12px] uppercase tracking-widest transition-all duration-500 ${activeTab === tab ? 'bg-white text-slate-900 shadow-lg scale-105' : 'text-slate-500 hover:text-slate-900 hover:scale-105'}`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
        {loading ? (
          <SyncingOverlay message={`Scanning National Boards for ${activeTab}...`} />
        ) : (dataList.length === 0 || error) ? (
            <div className="col-span-full py-20 sm:py-32 text-center bg-slate-50 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100">
               {error ? <AlertCircle className="w-12 h-12 sm:w-20 sm:h-20 text-rose-300 mx-auto mb-4 sm:mb-8" /> : <ShieldCheck className="w-12 h-12 sm:w-20 sm:h-20 text-slate-200 mx-auto mb-4 sm:mb-8" />}
               <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-4">{error ? 'Sync Connection Failed' : 'Scanning Official Records...'}</h3>
               <p className="text-slate-500 text-[10px] sm:text-base font-medium max-w-xs sm:max-w-sm mx-auto">
                 {error ? "Please ensure your API_KEY is correctly set in Vercel settings and redeploy your project." : "No new notifications found in this category right now. Try refreshing in a few minutes."}
               </p>
               <button onClick={loadData} className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-4 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black uppercase text-[8px] sm:text-[10px] tracking-widest hover:bg-indigo-600 transition-all">Retry Sync</button>
            </div>
          ) : (
            dataList.slice(0, visibleCount).map((item, idx) => (
              <div key={idx} className="bento-card p-4 sm:p-12 rounded-[2rem] sm:rounded-[4.5rem] flex flex-col h-full min-h-[350px] sm:min-h-[520px] group animate-in slide-in-from-bottom-10 duration-700" style={{ transitionDelay: `${idx % 6 * 100}ms` }}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4 sm:mb-10">
                  <div className="px-2 sm:px-5 py-1 sm:py-2 bg-indigo-50 text-indigo-600 rounded-full text-[7px] sm:text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                    {item.state || 'National'}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-[7px] sm:text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300" /> <span className="truncate max-w-[50px] sm:max-w-none">{item.location || 'India'}</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-1.5 sm:gap-3 mb-2 sm:mb-4 text-[7px] sm:text-[11px] font-bold uppercase text-slate-400 tracking-widest">
                    <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 shrink-0" /> <span className="truncate">{item.organization}</span>
                  </div>
                  <h3 className="text-xs sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-[1.2] sm:leading-[1.1] mb-2 sm:mb-6 group-hover:text-indigo-600 transition-colors line-clamp-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="hidden sm:block text-slate-500 text-base font-medium leading-relaxed line-clamp-4 mb-8">
                    {item.description || 'Verified notification from official recruitment board. Read eligibility, vacancy details, and selection process.'}
                  </p>
                </div>

                <div className="mt-4 sm:mt-8 pt-4 sm:pt-10 border-t border-slate-50 flex flex-col gap-4 sm:gap-8">
                  <div className="flex justify-between items-center text-[7px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 sm:gap-3"><Calendar className="w-3 h-3 sm:w-5 sm:h-5 text-indigo-500" /> <span className="truncate max-w-[40px] sm:max-w-none">{item.startDate || item.date || 'LATEST'}</span></span>
                    <span className="text-emerald-500 flex items-center gap-1 sm:gap-2 font-black uppercase"><div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Official</span>
                  </div>
                  <a 
                    href={item.link || item.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-3 sm:py-6 bg-slate-900 text-white rounded-[1rem] sm:rounded-[2rem] font-black uppercase text-[7px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] flex items-center justify-center gap-2 sm:gap-4 hover:bg-indigo-600 transition-all shadow-xl active:scale-95 btn-shine"
                  >
                    Open Portal <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            ))
          )}
      </div>
      
      {!loading && dataList.length > visibleCount && (
        <div className="mt-12 sm:mt-24 text-center">
          <button 
            onClick={() => setVisibleCount(v => v + 6)} 
            className="px-10 sm:px-16 py-4 sm:py-7 bg-white border-2 border-slate-900 text-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] font-black uppercase text-[9px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Load More <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 inline ml-2 sm:ml-3 animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSection;
