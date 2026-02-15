import React, { useEffect, useState } from 'react';
import { fetchJobNotifications, fetchExamUpdates, getLastUpdated } from '../services/eduService';
import { JobNotification, AdmitCardResult } from '../types';
import { 
  Calendar, Building2, ExternalLink, Zap, MapPin, Briefcase, 
  ChevronDown, RefreshCw, Loader2, ArrowRight, ShieldCheck, 
  Search, AlertCircle, CloudOff, Clock, Filter, Star, TrendingUp,
  School, GraduationCap, Award, Cpu
} from 'lucide-react';

const ITEMS_PER_PAGE = 4;

const CATEGORIES = [
  { id: 'all', label: 'All Jobs', icon: Briefcase },
  { id: 'schooling', label: 'Schooling', icon: School, color: 'amber' },
  { id: 'higher-ed', label: 'Higher Education', icon: GraduationCap, color: 'blue' },
  { id: 'entrance', label: 'Entrance', icon: Award, color: 'rose' },
  { id: 'skill-hub', label: 'Skill Hub', icon: Cpu, color: 'emerald' },
];

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      let results;
      if (activeTab === 'jobs') {
        results = await fetchJobNotifications(selectedCategory === 'all' ? undefined : selectedCategory);
      } else {
        results = await fetchExamUpdates(
          activeTab === 'admit-cards' ? 'admit-card' : 'result',
          selectedCategory === 'all' ? undefined : selectedCategory
        );
      }
      
      setDataList(results || []);
      setLastUpdated(new Date());
    } catch (e: any) { 
      console.error("Load Error:", e);
      setError(e.message || "Connection refused.");
      setDataList([]); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    loadData(); 
  }, [activeTab, selectedCategory]);

  // Auto refresh every 6 hours
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        loadData();
      }
    }, 6 * 60 * 60 * 1000); // 6 hours

    return () => clearInterval(interval);
  }, [activeTab, selectedCategory, loading]);

  const getCategoryIcon = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat?.icon || Briefcase;
  };

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12 mb-12 sm:mb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8 text-indigo-600 font-extrabold text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            <div className="p-1.5 sm:p-2 bg-indigo-50 rounded-lg"><Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-indigo-600" /></div>
            Verified National Data
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-[0.85] mb-4 sm:mb-8">
            Career <br/><span className="text-indigo-600">Hub</span>
          </h2>
          <p className="text-slate-500 text-lg sm:text-2xl font-medium leading-relaxed max-w-2xl">
            Latest verified Indian vacancies. Auto-updates every 6 hours.
          </p>
          <div className="flex items-center gap-2 mt-4 text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refresh enabled
          </div>
        </div>
        <button 
          onClick={loadData} 
          disabled={loading} 
          className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[11px] tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 sm:gap-4 shadow-2xl active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} /> 
          {loading ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {/* Main Tabs */}
      <div className="bg-slate-100/50 p-1.5 sm:p-2 rounded-[1.8rem] sm:rounded-[2.5rem] flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-12 max-w-3xl">
        {['jobs', 'admit-cards', 'results'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => { 
              setActiveTab(tab as any); 
              setVisibleCount(ITEMS_PER_PAGE);
              setSelectedCategory('all');
            }}
            className={`flex-1 py-3 sm:py-5 px-4 sm:px-10 rounded-[1.4rem] sm:rounded-[2rem] font-extrabold text-[9px] sm:text-[12px] uppercase tracking-widest transition-all duration-500 ${
              activeTab === tab ? 'bg-white text-slate-900 shadow-lg scale-105' : 'text-slate-500 hover:text-slate-900 hover:scale-105'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-2 mb-4 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <Filter className="w-3 h-3 sm:w-4 sm:h-4" /> Filter by Category:
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-extrabold text-[8px] sm:text-[10px] uppercase tracking-widest transition-all flex items-center gap-1 sm:gap-2 ${
                selectedCategory === cat.id
                  ? `bg-indigo-600 text-white shadow-lg scale-105`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <cat.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* New Badge Section */}
      {!loading && !error && dataList.filter(item => item.isNew).length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" /> Latest Releases
            </div>
            <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Just Added
            </div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
        {loading ? (
          <SyncingOverlay message={`Scanning for ${selectedCategory === 'all' ? 'all' : selectedCategory} ${activeTab}...`} />
        ) : error ? (
          <div className="col-span-full py-20 sm:py-32 text-center bg-rose-50 rounded-[2.5rem] sm:rounded-[4rem] border border-rose-100">
            <CloudOff className="w-12 h-12 sm:w-20 sm:h-20 text-rose-300 mx-auto mb-4 sm:mb-8" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-rose-900 mb-2 sm:mb-4 tracking-tight">Sync Failure</h3>
            <p className="text-rose-600 text-[10px] sm:text-base font-medium max-w-xs sm:max-w-md mx-auto mb-8">
              Unable to load data. Please try again.
            </p>
            <button onClick={loadData} className="px-8 sm:px-12 py-3 sm:py-5 bg-rose-600 text-white rounded-xl sm:rounded-2xl font-black uppercase text-[8px] sm:text-[10px] tracking-widest hover:bg-rose-700 transition-all shadow-lg">
              Try Again
            </button>
          </div>
        ) : dataList.length === 0 ? (
          <div className="col-span-full py-20 sm:py-32 text-center bg-slate-50 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100">
            <Search className="w-12 h-12 sm:w-20 sm:h-20 text-slate-200 mx-auto mb-4 sm:mb-8" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-4">No Records Found</h3>
            <p className="text-slate-500 text-[10px] sm:text-base font-medium max-w-xs sm:max-w-sm mx-auto mb-6">
              No {activeTab} found in {selectedCategory === 'all' ? 'any category' : selectedCategory} at this time.
            </p>
            <button onClick={loadData} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-[8px] tracking-widest">
              Refresh Feed
            </button>
          </div>
        ) : (
          dataList.slice(0, visibleCount).map((item) => (
            <div 
              key={item.id} 
              className={`bento-card p-4 sm:p-10 rounded-[2rem] sm:rounded-[4.5rem] flex flex-col h-full min-h-[350px] sm:min-h-[480px] group animate-in slide-in-from-bottom-10 duration-700 ${
                item.isNew ? 'border-emerald-200 bg-emerald-50/10' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4 sm:mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.isNew && (
                    <span className="px-2 sm:px-4 py-1 bg-emerald-500 text-white rounded-full text-[6px] sm:text-[8px] font-black uppercase tracking-widest">
                      New
                    </span>
                  )}
                  <div className="px-2 sm:px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[6px] sm:text-[8px] font-black uppercase tracking-widest border border-indigo-100">
                    {item.state || 'National'}
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-[6px] sm:text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-300" /> 
                  <span className="truncate">{item.location || 'India'}</span>
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-[6px] sm:text-[9px] font-bold uppercase text-slate-400 tracking-widest">
                  <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-300 shrink-0" /> 
                  <span className="truncate">{item.organization}</span>
                </div>
                
                {item.category && (
                  <div className="mb-2">
                    <span className={`px-2 py-0.5 bg-${getCategoryIcon(item.category)}-50 text-${getCategoryIcon(item.category)}-600 rounded-full text-[5px] sm:text-[7px] font-black uppercase tracking-widest`}>
                      {item.category}
                    </span>
                  </div>
                )}
                
                <h3 className="text-xs sm:text-xl lg:text-2xl font-extrabold text-slate-900 leading-[1.2] mb-2 sm:mb-4 group-hover:text-indigo-600 transition-colors line-clamp-3 tracking-tight">
                  {item.title}
                </h3>
                
                <p className="hidden sm:block text-slate-500 text-sm font-medium leading-relaxed line-clamp-3 mb-4">
                  {item.description || item.examDetails || 'Verified notification from official board.'}
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-50 flex flex-col gap-3 sm:gap-4">
                <div className="flex justify-between items-center text-[6px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-500" /> 
                    {item.startDate || item.date || item.postedDate || 'LATEST'}
                  </span>
                  <span className="text-emerald-500 font-black uppercase text-[6px] sm:text-[8px]">
                    Official
                  </span>
                </div>
                
                <a 
                  href={item.link || item.applyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2.5 sm:py-4 bg-slate-900 text-white rounded-[0.8rem] sm:rounded-[1.5rem] font-black uppercase text-[6px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.2em] flex items-center justify-center gap-1 sm:gap-2 hover:bg-indigo-600 transition-all shadow-xl"
                >
                  Apply Now <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      
      {!loading && !error && dataList.length > visibleCount && (
        <div className="mt-12 sm:mt-24 text-center">
          <button 
            onClick={() => setVisibleCount(v => v + 4)} 
            className="px-10 sm:px-16 py-4 sm:py-7 bg-white border-2 border-slate-900 text-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] font-black uppercase text-[9px] sm:text-[11px] tracking-[0.4em] hover:bg-slate-900 hover:text-white transition-all shadow-xl"
          >
            Load More <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 inline ml-2 animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSection;