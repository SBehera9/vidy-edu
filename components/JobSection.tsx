
import React, { useEffect, useState } from 'react';
import { fetchJobNotifications, fetchExamUpdates } from '../services/eduService';
import { JobNotification, AdmitCardResult } from '../types';
import { Calendar, Building2, ExternalLink, Zap, MapPin, Briefcase, ChevronDown, RefreshCw, Loader2, ArrowRight, ShieldCheck, Search } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const SkeletonCard = () => (
  <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 flex flex-col h-[520px] animate-pulse">
    <div className="flex justify-between mb-10">
      <div className="w-24 h-6 bg-slate-200 rounded-full"></div>
      <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
    </div>
    <div className="w-full h-10 bg-slate-200 rounded-xl mb-4"></div>
    <div className="w-3/4 h-10 bg-slate-200 rounded-xl mb-12"></div>
    <div className="flex-grow space-y-4">
      <div className="w-full h-4 bg-slate-100 rounded-lg"></div>
      <div className="w-full h-4 bg-slate-100 rounded-lg"></div>
      <div className="w-2/3 h-4 bg-slate-100 rounded-lg"></div>
    </div>
    <div className="mt-12 w-full h-16 bg-slate-200 rounded-2xl"></div>
  </div>
);

const SyncingOverlay = ({ message }: { message: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-40 animate-in fade-in zoom-in duration-500">
    <div className="relative mb-12">
      <div className="w-40 h-40 border-8 border-slate-100 rounded-full"></div>
      <div className="absolute inset-0 w-40 h-40 border-t-8 border-indigo-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center shadow-inner">
          <RefreshCw className="w-10 h-10 text-indigo-600 animate-pulse" />
        </div>
      </div>
    </div>
    <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Syncing Career Feed</h3>
    <p className="text-slate-400 font-bold uppercase tracking-[0.5em] text-[12px] flex items-center gap-3">
       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> {message}
    </p>
  </div>
);

const JobSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'admit-cards' | 'results'>('jobs');
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const loadData = async () => {
    setLoading(true);
    try {
      let results = activeTab === 'jobs' ? await fetchJobNotifications() : await fetchExamUpdates(activeTab === 'admit-cards' ? 'admit-card' : 'result');
      setDataList(results || []);
    } catch (e) { setDataList([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8 text-indigo-600 font-extrabold text-[11px] uppercase tracking-[0.4em]">
            <div className="p-2 bg-indigo-50 rounded-lg"><Zap className="w-4 h-4 fill-indigo-600" /></div>
            Automated Career Sync
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-[0.85] mb-8">Career <br/><span className="text-indigo-600">Hub</span></h2>
          <p className="text-slate-500 text-2xl font-medium leading-relaxed max-w-2xl">Real-time alerts for 5,000+ government and private sector vacancies across India.</p>
        </div>
        <button 
          onClick={loadData} 
          disabled={loading} 
          className="group px-10 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[11px] tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 btn-shine"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} /> {loading ? 'Processing...' : 'Sync Latest Feed'}
        </button>
      </div>

      <div className="bg-slate-100/50 p-2 rounded-[2.5rem] flex flex-wrap gap-2 mb-20 max-w-3xl">
        {['jobs', 'admit-cards', 'results'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => { setActiveTab(tab as any); setVisibleCount(ITEMS_PER_PAGE); }}
            className={`flex-1 py-5 px-10 rounded-[2rem] font-extrabold text-[12px] uppercase tracking-widest transition-all duration-500 ${activeTab === tab ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-slate-500 hover:text-slate-900 hover:scale-105'}`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <SyncingOverlay message={`Scanning National Boards for ${activeTab}...`} />
        ) : dataList.length === 0 ? (
            <div className="col-span-full py-32 text-center bg-slate-50 rounded-[4rem] border border-slate-100">
               <ShieldCheck className="w-20 h-20 text-slate-200 mx-auto mb-8" />
               <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Feed Syncing...</h3>
               <p className="text-slate-500 font-medium max-w-sm mx-auto">No vacancies found for today. Our AI is currently scanning official boards for upcoming alerts.</p>
               <button onClick={loadData} className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all">Retry Sync</button>
            </div>
          ) : (
            dataList.slice(0, visibleCount).map((item, idx) => (
              <div key={idx} className="bento-card p-12 rounded-[4.5rem] flex flex-col h-full min-h-[520px] group animate-in slide-in-from-bottom-10 duration-700" style={{ transitionDelay: `${idx % 6 * 100}ms` }}>
                <div className="flex justify-between items-start mb-10">
                  <div className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                    {item.state || 'National'}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-slate-300" /> {item.location || 'India'}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4 text-[11px] font-bold uppercase text-slate-400 tracking-widest">
                    <Building2 className="w-4 h-4 text-slate-300" /> {item.organization}
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 leading-[1.1] mb-6 group-hover:text-indigo-600 transition-colors line-clamp-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-base font-medium leading-relaxed line-clamp-4 mb-8">
                    {item.description || 'Verified notification from official recruitment board. Read eligibility, vacancy details, and selection process.'}
                  </p>
                </div>

                <div className="mt-8 pt-10 border-t border-slate-50 flex flex-col gap-8">
                  <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-3"><Calendar className="w-5 h-5 text-indigo-500" /> {item.startDate || item.date || 'Update Found'}</span>
                    <span className="text-emerald-500 flex items-center gap-2 font-black uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Verified</span>
                  </div>
                  <a 
                    href={item.link || item.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-500/5 active:scale-95 btn-shine"
                  >
                    Open Official Portal <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          )}
      </div>
      
      {!loading && dataList.length > visibleCount && (
        <div className="mt-24 text-center">
          <button 
            onClick={() => setVisibleCount(v => v + 6)} 
            className="px-16 py-7 bg-white border-2 border-slate-900 text-slate-900 rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.4em] hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Load More Opportunities <ChevronDown className="w-5 h-5 inline ml-3 animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSection;
