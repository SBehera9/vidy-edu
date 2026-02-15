import React, { useEffect, useState } from 'react';
import { fetchJobNotifications, fetchExamUpdates, getLastUpdated } from '../services/eduService';
import { JobNotification, AdmitCardResult } from '../types';
import { 
  Calendar, Building2, ExternalLink, Zap, MapPin, Briefcase, 
  ChevronDown, RefreshCw, Loader2, ArrowRight, ShieldCheck, 
  Search, AlertCircle, CloudOff, Clock, Filter, Star, TrendingUp,
  School, GraduationCap, Award, Cpu, Sparkles, Heart, BookOpen,
  Users, Globe, Target, ChevronRight, CheckCircle, XCircle
} from 'lucide-react';

const ITEMS_PER_PAGE = 4;

const CATEGORIES = [
  { id: 'all', label: 'All Jobs', icon: Briefcase, color: 'from-indigo-500 to-purple-500' },
  { id: 'schooling', label: 'Schooling', icon: School, color: 'from-amber-500 to-orange-500' },
  { id: 'higher-ed', label: 'Higher Education', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
  { id: 'entrance', label: 'Entrance', icon: Award, color: 'from-rose-500 to-pink-500' },
  { id: 'skill-hub', label: 'Skill Hub', icon: Cpu, color: 'from-emerald-500 to-teal-500' },
];

const SyncingOverlay = ({ message }: { message: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 sm:py-40 animate-in fade-in zoom-in duration-500">
    <div className="relative mb-6 sm:mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl">
            <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin-slow" />
          </div>
        </div>
      </div>
    </div>
    <h3 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-6 tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      Syncing Career Feed
    </h3>
    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] sm:tracking-[0.5em] text-[8px] sm:text-[12px] flex items-center gap-1 sm:gap-3 text-center">
      <Sparkles className="w-3 h-3 text-indigo-500" /> {message} <Sparkles className="w-3 h-3 text-purple-500" />
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
    }, 6 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [activeTab, selectedCategory, loading]);

  const getCategoryIcon = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat?.icon || Briefcase;
  };

  const getCategoryColor = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat?.color || 'from-indigo-500 to-purple-500';
  };

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12 mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-indigo-600 font-extrabold text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Verified National Data
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-[0.85] mb-4 sm:mb-8">
            Career <br/>
            <span className="relative">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hub
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-slate-500 text-lg sm:text-2xl font-medium leading-relaxed max-w-2xl">
            Latest verified Indian vacancies. Auto-updates every 6 hours.
          </p>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-1 text-[8px] text-emerald-600 font-bold">
              <CheckCircle className="w-3 h-3" />
              Auto-refresh enabled
            </div>
          </div>
        </div>
        
        <button 
          onClick={loadData} 
          disabled={loading} 
          className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[11px] tracking-widest hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 active:scale-95 disabled:opacity-50 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
            {loading ? 'Syncing...' : 'Sync Now'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0%,transparent_50%)] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        </button>
      </div>

      {/* Main Tabs - Enhanced */}
      <div className="bg-white/80 backdrop-blur-xl p-1.5 sm:p-2 rounded-[1.8rem] sm:rounded-[2.5rem] flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-12 max-w-3xl shadow-lg border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
        {['jobs', 'admit-cards', 'results'].map((tab, index) => (
          <button 
            key={tab} 
            onClick={() => { 
              setActiveTab(tab as any); 
              setVisibleCount(ITEMS_PER_PAGE);
              setSelectedCategory('all');
            }}
            className={`flex-1 relative py-3 sm:py-5 px-4 sm:px-10 rounded-[1.4rem] sm:rounded-[2rem] font-extrabold text-[9px] sm:text-[12px] uppercase tracking-widest transition-all duration-500 overflow-hidden group ${
              activeTab === tab 
                ? 'text-white shadow-lg scale-105' 
                : 'text-slate-500 hover:text-slate-900 hover:scale-105'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {activeTab === tab && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {tab === 'jobs' && <Briefcase className="w-4 h-4" />}
              {tab === 'admit-cards' && <Award className="w-4 h-4" />}
              {tab === 'results' && <Award className="w-4 h-4" />}
              {tab.replace('-', ' ')}
            </span>
          </button>
        ))}
      </div>

      {/* Category Filters - Enhanced */}
      <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        <div className="flex items-center gap-2 mb-4 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
          Filter by Category:
          <Sparkles className="w-3 h-3 text-indigo-500 ml-2" />
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {CATEGORIES.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className={`group relative px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-extrabold text-[8px] sm:text-[10px] uppercase tracking-widest transition-all duration-500 overflow-hidden ${
                selectedCategory === cat.id
                  ? `text-white shadow-lg scale-105`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {selectedCategory === cat.id && (
                <div className={`absolute inset-0 bg-gradient-to-r ${cat.color}`}></div>
              )}
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <cat.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* New Badge Section */}
      {!loading && !error && dataList.filter(item => item.isNew).length > 0 && (
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3 fill-white" /> Latest Releases
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
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
          <div className="col-span-full py-20 sm:py-32 text-center bg-gradient-to-br from-rose-50 to-pink-50 rounded-[2.5rem] sm:rounded-[4rem] border border-rose-100 animate-in scale-in duration-500">
            <div className="relative inline-block mb-4 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <CloudOff className="relative w-16 h-16 sm:w-20 sm:h-20 text-rose-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-rose-900 mb-2 sm:mb-4 tracking-tight">Sync Failure</h3>
            <p className="text-rose-600 text-[10px] sm:text-base font-medium max-w-xs sm:max-w-md mx-auto mb-8">
              Unable to load data. Please try again.
            </p>
            <button 
              onClick={loadData} 
              className="group relative px-8 sm:px-12 py-3 sm:py-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl sm:rounded-2xl font-black uppercase text-[8px] sm:text-[10px] tracking-widest hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Try Again
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        ) : dataList.length === 0 ? (
          <div className="col-span-full py-20 sm:py-32 text-center bg-gradient-to-br from-slate-50 to-gray-50 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 animate-in scale-in duration-500">
            <Search className="w-16 h-16 sm:w-20 sm:h-20 text-slate-300 mx-auto mb-4 sm:mb-8" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-4">No Records Found</h3>
            <p className="text-slate-500 text-[10px] sm:text-base font-medium max-w-xs sm:max-w-sm mx-auto mb-6">
              No {activeTab} found in {selectedCategory === 'all' ? 'any category' : selectedCategory} at this time.
            </p>
            <button 
              onClick={loadData} 
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-[8px] tracking-widest hover:bg-indigo-600 transition-colors"
            >
              Refresh Feed
            </button>
          </div>
        ) : (
          dataList.slice(0, visibleCount).map((item, index) => (
            <div 
              key={item.id} 
              className={`group relative bg-white/80 backdrop-blur-xl p-4 sm:p-10 rounded-[2rem] sm:rounded-[4.5rem] flex flex-col h-full min-h-[350px] sm:min-h-[480px] animate-in fade-in slide-in-from-bottom-8 duration-700 border ${
                item.isNew ? 'border-emerald-200 hover:border-emerald-400' : 'border-slate-100 hover:border-indigo-200'
              } hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                item.category ? getCategoryColor(item.category) : 'from-indigo-500 to-purple-500'
              } opacity-0 group-hover:opacity-5 rounded-[2rem] sm:rounded-[4.5rem] transition-opacity duration-500`}></div>

              {/* Top Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4 sm:mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.isNew && (
                    <span className="px-2 sm:px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-[6px] sm:text-[8px] font-black uppercase tracking-widest shadow-lg">
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
              
              {/* Content */}
              <div className="flex-grow">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-500 shrink-0" />
                  <span className="text-[6px] sm:text-[9px] font-bold uppercase text-slate-400 tracking-widest truncate">
                    {item.organization}
                  </span>
                </div>
                
                {item.category && (
                  <div className="mb-2">
                    <span className={`px-2 py-0.5 bg-gradient-to-r ${getCategoryColor(item.category)} text-white rounded-full text-[5px] sm:text-[7px] font-black uppercase tracking-widest`}>
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

              {/* Footer */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center text-[6px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">
                  <span className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-500" /> 
                    {item.startDate || item.date || item.postedDate || 'LATEST'}
                  </span>
                  <span className="text-emerald-500 font-black uppercase text-[6px] sm:text-[8px] flex items-center gap-1">
                    <ShieldCheck className="w-2 h-2" />
                    Official
                  </span>
                </div>
                
                <a 
                  href={item.link || item.applyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/btn relative w-full py-2.5 sm:py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-[0.8rem] sm:rounded-[1.5rem] font-black uppercase text-[6px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.2em] flex items-center justify-center gap-1 sm:gap-2 hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    Apply Now
                    <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                </a>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className={`absolute top-0 right-0 w-0 h-0 border-t-[32px] border-r-[32px] border-t-transparent border-r-indigo-600/20 group-hover:border-r-indigo-600/40 transition-all duration-500`}></div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {!loading && !error && dataList.length > visibleCount && (
        <div className="mt-12 sm:mt-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <button 
            onClick={() => setVisibleCount(v => v + 4)} 
            className="group relative px-10 sm:px-16 py-4 sm:py-7 bg-white border-2 border-slate-900 text-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] font-black uppercase text-[9px] sm:text-[11px] tracking-[0.4em] hover:bg-slate-900 hover:text-white transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Load More
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform duration-300 animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSection;