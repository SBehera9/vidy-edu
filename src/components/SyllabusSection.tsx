import React, { useState, useEffect } from 'react';
import { fetchSyllabusByCategory } from '../services/eduService';
import { SyllabusItem } from '../types';
import { 
  Book, GraduationCap, School, ChevronRight, Layers, Award, 
  BookOpen, ArrowLeft, RefreshCw, Cpu, Zap, Download, FileText, 
  Search, CloudOff, Clock, Filter, Star, TrendingUp, Calendar
} from 'lucide-react';

interface SyllabusSectionProps {
  onOpenLab: () => void;
}

const CATEGORIES = [
  { 
    id: 'schooling', 
    icon: School, 
    label: "Schooling", 
    color: 'bg-amber-50 text-amber-600', 
    sub: 'CBSE, ICSE, State Boards',
    description: 'Class 1-12 syllabus for all boards'
  },
  { 
    id: 'higher-ed', 
    icon: BookOpen, 
    label: "Higher Education", 
    color: 'bg-blue-50 text-blue-600', 
    sub: 'UG / PG Programs',
    description: 'University courses, UGC, AICTE'
  },
  { 
    id: 'entrance', 
    icon: Award, 
    label: "Entrance Exams", 
    color: 'bg-rose-50 text-rose-600', 
    sub: 'JEE, NEET, UPSC, GATE',
    description: 'Competitive exam syllabus'
  },
  { 
    id: 'skill-hub', 
    icon: Cpu, 
    label: "Skill Hub", 
    color: 'bg-emerald-50 text-emerald-600', 
    sub: 'ITI, Vocational, Certifications',
    description: 'Skill development courses'
  },
];

const SyncingOverlay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-20 sm:py-32 animate-in fade-in duration-500">
    <div className="relative mb-6 sm:mb-10">
      <div className="w-20 h-20 sm:w-32 sm:h-32 border-2 sm:border-4 border-indigo-100 rounded-full"></div>
      <div className="absolute inset-0 w-20 h-20 sm:w-32 sm:h-32 border-t-2 sm:border-t-4 border-indigo-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 sm:w-10 sm:h-10 text-indigo-600 animate-pulse" />
      </div>
    </div>
    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 sm:mb-4">Syncing Syllabus Registry</h3>
    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[10px] flex items-center gap-1.5 sm:gap-2">
      <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-indigo-500 text-indigo-500" /> {message}
    </p>
  </div>
);

const SyllabusSection: React.FC<SyllabusSectionProps> = ({ onOpenLab }) => {
  const [view, setView] = useState<'home' | 'listing'>('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [syllabusData, setSyllabusData] = useState<SyllabusItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const openListing = async (cat: any) => {
    setSelectedCat(cat);
    setLoading(true);
    setError(false);
    setView('listing');
    try {
      const res = await fetchSyllabusByCategory(cat.id);
      setSyllabusData(res || []);
      setLastUpdated(new Date());
    } catch (e) { 
      setError(true);
      setSyllabusData([]); 
    } finally { 
      setLoading(false); 
    }
  };

  const refreshListing = () => {
    if (selectedCat) openListing(selectedCat);
  };

  // Auto refresh every 6 hours
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCat && !loading) {
        refreshListing();
      }
    }, 6 * 60 * 60 * 1000); // 6 hours

    return () => clearInterval(interval);
  }, [selectedCat, loading]);

  const getCategoryIcon = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat?.icon || Book;
  };

  const getCategoryColor = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat?.color || 'bg-slate-50 text-slate-600';
  };

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12 mb-12 sm:mb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 text-amber-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> Official Curriculum Registry
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-[0.85] mb-4 sm:mb-8">Curriculum</h2>
          <p className="text-slate-500 text-lg sm:text-2xl font-medium leading-relaxed max-w-2xl">
            Latest official syllabi and academic roadmaps. Auto-updates every 6 hours.
          </p>
          {view === 'listing' && !loading && (
            <div className="flex items-center gap-2 mt-4 text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refresh every 6h
            </div>
          )}
        </div>
        
        {view === 'listing' && !loading && (
          <button 
            onClick={refreshListing}
            className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 sm:gap-4 shadow-xl active:scale-95"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" /> 
            Sync Now
          </button>
        )}
      </div>

      {view === 'home' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => openListing(cat)} 
              className="bento-card p-6 sm:p-12 rounded-[2rem] sm:rounded-[4.5rem] bg-white border border-slate-100 flex flex-col items-center text-center group hover:border-indigo-200 hover:shadow-2xl transition-all"
            >
              <div className={`w-16 h-16 sm:w-24 sm:h-24 ${cat.color} rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center mb-6 sm:mb-10 shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform duration-500`}>
                <cat.icon className="w-6 h-6 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-3xl font-extrabold text-slate-900 mb-2 sm:mb-4">{cat.label}</h3>
              <p className="text-slate-400 text-[8px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-4 leading-tight sm:leading-relaxed">{cat.sub}</p>
              <p className="text-slate-500 text-[7px] sm:text-[10px] font-medium mb-6 sm:mb-10">{cat.description}</p>
              
              <div className="mt-auto px-4 sm:px-8 py-2 sm:py-4 bg-slate-50 rounded-xl sm:rounded-2xl text-[7px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center gap-1 sm:gap-2">
                View Latest <ChevronRight className="w-3 h-3 sm:w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      )}

      {view === 'listing' && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
          <button 
            onClick={() => setView('home')} 
            className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-8 sm:mb-16 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Categories
          </button>

          {loading ? (
            <SyncingOverlay message={`Fetching latest ${selectedCat?.label} syllabus...`} />
          ) : error ? (
            <div className="py-20 sm:py-40 text-center bg-rose-50 rounded-[2rem] sm:rounded-[4rem] border border-rose-100">
              <CloudOff className="w-12 h-12 sm:w-20 sm:h-20 text-rose-300 mx-auto mb-6 sm:mb-8" />
              <h3 className="text-2xl sm:text-3xl font-black text-rose-900 mb-2 sm:mb-4">Connection Failed</h3>
              <p className="text-rose-600 text-xs sm:text-base font-medium max-w-xs sm:max-w-sm mx-auto mb-8">Unable to load syllabus data.</p>
              <button onClick={refreshListing} className="px-8 sm:px-12 py-4 bg-rose-600 text-white rounded-xl font-bold uppercase text-[9px] tracking-widest">Retry</button>
            </div>
          ) : syllabusData.length === 0 ? (
            <div className="py-20 sm:py-40 text-center bg-slate-50 rounded-[2rem] sm:rounded-[4rem] border border-slate-100">
              <Search className="w-12 h-12 sm:w-20 sm:h-20 text-slate-200 mx-auto mb-6 sm:mb-8" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 sm:mb-4">No Syllabus Found</h3>
              <p className="text-slate-500 text-xs sm:text-base font-medium max-w-xs sm:max-w-sm mx-auto mb-8">No documents found for this category.</p>
              <button onClick={refreshListing} className="px-8 sm:px-12 py-4 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black uppercase text-[9px] sm:text-[10px] tracking-widest">Refresh</button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* New Badge Section */}
              <div className="flex items-center gap-2 mb-6">
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" /> Latest Releases
                </div>
                <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Updated Recently
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {syllabusData.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-6 sm:p-10 bg-white border rounded-[2rem] sm:rounded-[3rem] flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-indigo-200 hover:shadow-2xl transition-all ${
                      item.isNew ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-100'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {item.isNew && (
                          <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest">
                            New
                          </span>
                        )}
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest border border-amber-100">
                          {item.organization}
                        </span>
                        <span className={`px-3 py-1 ${getCategoryColor(item.category)} rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest`}>
                          {item.category}
                        </span>
                        {item.level && (
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest">
                            {item.level}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-lg sm:text-2xl font-extrabold text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      
                      <p className="text-slate-500 text-sm sm:text-base mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {item.subjects && item.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.subjects.map((subject, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[7px] sm:text-[8px] font-bold uppercase">
                              {subject}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 sm:gap-6 text-[7px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" /> 
                          Posted: {new Date(item.postedDate).toLocaleDateString()}
                        </span>
                        {item.examDate && (
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" /> 
                            Exam: {item.examDate}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-3">
                      <a 
                        href={item.downloadLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 md:w-auto px-6 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[8px] sm:text-[9px] tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" /> Download
                      </a>
                      <a 
                        href={item.officialLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 md:w-auto px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-black uppercase text-[8px] sm:text-[9px] tracking-widest hover:bg-indigo-50 hover:border-indigo-200 transition-all flex items-center justify-center gap-2"
                      >
                        Official Site
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-20 sm:mt-40 pt-16 sm:pt-32 border-t border-slate-50">
        <div className="bg-slate-900 rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-500/10 rounded-full blur-[60px] sm:blur-[100px]"></div>
          <div className="relative z-10 max-w-2xl text-left">
            <h4 className="text-2xl sm:text-5xl font-black text-white mb-4 sm:mb-8 tracking-tight">
              Need Custom Research?
            </h4>
            <p className="text-slate-400 text-sm sm:text-xl font-medium mb-8 sm:mb-12">
              Search any syllabus, curriculum, or exam pattern using our AI-powered research lab.
            </p>
            <button 
              onClick={onOpenLab} 
              className="px-8 sm:px-12 py-4 sm:py-6 bg-white text-slate-900 rounded-xl sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[11px] tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl"
            >
              Open Research Lab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusSection;