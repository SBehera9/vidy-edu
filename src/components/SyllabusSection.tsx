import React, { useState, useEffect } from 'react';
import { fetchSyllabusByCategory } from '../services/eduService';
import { SyllabusItem } from '../types';
import { 
  Book, GraduationCap, School, ChevronRight, Layers, Award, 
  BookOpen, ArrowLeft, RefreshCw, Cpu, Zap, Download, FileText, 
  Search, CloudOff, Clock, Filter, Star, TrendingUp, Calendar,
  Sparkles, Heart, Shield, ExternalLink, CheckCircle, Globe
} from 'lucide-react';

interface SyllabusSectionProps {
  onOpenLab: () => void;
}

const CATEGORIES = [
  { 
    id: 'schooling', 
    icon: School, 
    label: "Schooling", 
    color: 'from-amber-500 to-orange-500', 
    bg: 'bg-amber-50',
    sub: 'CBSE, ICSE, State Boards',
    description: 'Class 1-12 syllabus for all boards'
  },
  { 
    id: 'higher-ed', 
    icon: BookOpen, 
    label: "Higher Education", 
    color: 'from-blue-500 to-cyan-500', 
    bg: 'bg-blue-50',
    sub: 'UG / PG Programs',
    description: 'University courses, UGC, AICTE'
  },
  { 
    id: 'entrance', 
    icon: Award, 
    label: "Entrance Exams", 
    color: 'from-rose-500 to-pink-500', 
    bg: 'bg-rose-50',
    sub: 'JEE, NEET, UPSC, GATE',
    description: 'Competitive exam syllabus'
  },
  { 
    id: 'skill-hub', 
    icon: Cpu, 
    label: "Skill Hub", 
    color: 'from-emerald-500 to-teal-500', 
    bg: 'bg-emerald-50',
    sub: 'ITI, Vocational, Certifications',
    description: 'Skill development courses'
  },
];

const SyncingOverlay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-20 sm:py-32 animate-in fade-in duration-500">
    <div className="relative mb-6 sm:mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 animate-spin-slow" />
        </div>
      </div>
    </div>
    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 sm:mb-4">Syncing Syllabus Registry</h3>
    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[10px] flex items-center gap-1.5 sm:gap-2">
      <Sparkles className="w-3 h-3 text-indigo-500" /> {message} <Sparkles className="w-3 h-3 text-purple-500" />
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
    }, 6 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedCat, loading]);

  const getCategoryIcon = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat?.icon || Book;
  };

  const getCategoryColor = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat?.color || 'from-indigo-500 to-purple-500';
  };

  const getCategoryBg = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat?.bg || 'bg-slate-50';
  };

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12 mb-12 sm:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="text-amber-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Official Curriculum Registry
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-[0.85] mb-4 sm:mb-8">
            <span className="relative">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Curriculum
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-slate-500 text-lg sm:text-2xl font-medium leading-relaxed max-w-2xl">
            Latest official syllabi and academic roadmaps. Auto-updates every 6 hours.
          </p>
          
          {view === 'listing' && !loading && (
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-1 text-[8px] text-emerald-600 font-bold">
                <CheckCircle className="w-3 h-3" />
                Auto-refresh every 6h
              </div>
            </div>
          )}
        </div>
        
        {view === 'listing' && !loading && (
          <button 
            onClick={refreshListing}
            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[10px] tracking-widest hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" /> 
              Sync Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        )}
      </div>

      {view === 'home' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10">
          {CATEGORIES.map((cat, index) => (
            <button 
              key={cat.id} 
              onClick={() => openListing(cat)} 
              className="group relative bg-white/80 backdrop-blur-xl p-6 sm:p-12 rounded-[2rem] sm:rounded-[4.5rem] border border-slate-100 flex flex-col items-center text-center hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 rounded-[2rem] sm:rounded-[4.5rem] transition-opacity duration-500`}></div>
              
              <div className={`relative w-20 h-20 sm:w-28 sm:h-28 ${cat.bg} rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center mb-6 sm:mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <cat.icon className="w-8 h-8 sm:w-12 sm:h-12 text-slate-700 group-hover:text-white transition-colors duration-500 relative z-10" />
              </div>
              
              <h3 className="text-lg sm:text-3xl font-extrabold text-slate-900 mb-2 sm:mb-4">{cat.label}</h3>
              <p className="text-slate-400 text-[8px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-4 leading-tight sm:leading-relaxed">{cat.sub}</p>
              <p className="text-slate-500 text-[7px] sm:text-[10px] font-medium mb-6 sm:mb-10">{cat.description}</p>
              
              <div className="mt-auto px-4 sm:px-8 py-2 sm:py-4 bg-slate-50 rounded-xl sm:rounded-2xl text-[7px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white transition-all duration-500 flex items-center gap-1 sm:gap-2">
                View Latest
                <ChevronRight className="w-3 h-3 sm:w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12">
                <div className={`absolute top-0 right-0 w-0 h-0 border-t-[24px] border-r-[24px] border-t-transparent border-r-amber-500/20 group-hover:border-r-amber-500/40 transition-all duration-500`}></div>
              </div>
            </button>
          ))}
        </div>
      )}

      {view === 'listing' && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
          <button 
            onClick={() => setView('home')} 
            className="group flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-8 sm:mb-16 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" /> 
            Back to Categories
          </button>

          {loading ? (
            <SyncingOverlay message={`Fetching latest ${selectedCat?.label} syllabus...`} />
          ) : error ? (
            <div className="py-20 sm:py-40 text-center bg-gradient-to-br from-rose-50 to-pink-50 rounded-[2rem] sm:rounded-[4rem] border border-rose-100 animate-in scale-in duration-500">
              <div className="relative inline-block mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <CloudOff className="relative w-16 h-16 sm:w-20 sm:h-20 text-rose-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-rose-900 mb-2 sm:mb-4">Connection Failed</h3>
              <p className="text-rose-600 text-xs sm:text-base font-medium max-w-xs sm:max-w-sm mx-auto mb-8">Unable to load syllabus data.</p>
              <button 
                onClick={refreshListing} 
                className="group relative px-8 sm:px-12 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-bold uppercase text-[9px] tracking-widest hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Retry
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          ) : syllabusData.length === 0 ? (
            <div className="py-20 sm:py-40 text-center bg-gradient-to-br from-slate-50 to-gray-50 rounded-[2rem] sm:rounded-[4rem] border border-slate-100">
              <Search className="w-16 h-16 sm:w-20 sm:h-20 text-slate-300 mx-auto mb-6 sm:mb-8" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 sm:mb-4">No Syllabus Found</h3>
              <p className="text-slate-500 text-xs sm:text-base font-medium max-w-xs sm:max-w-sm mx-auto mb-8">No documents found for this category.</p>
              <button 
                onClick={refreshListing} 
                className="px-8 sm:px-12 py-4 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black uppercase text-[9px] sm:text-[10px] tracking-widest hover:bg-indigo-600 transition-colors"
              >
                Refresh
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* New Badge Section */}
              <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 fill-white" /> Latest Releases
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <TrendingUp className="w-3 h-3" /> Updated Recently
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {syllabusData.map((item, index) => {
                  const categoryColor = getCategoryColor(item.category);
                  return (
                    <div 
                      key={item.id} 
                      className={`group relative bg-white/80 backdrop-blur-xl p-6 sm:p-10 border rounded-[2rem] sm:rounded-[3rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 ${
                        item.isNew ? 'border-emerald-200' : 'border-slate-100'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-0 group-hover:opacity-5 rounded-[2rem] sm:rounded-[3rem] transition-opacity duration-500`}></div>
                      
                      <div className="flex-1 relative">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          {item.isNew && (
                            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest shadow-lg">
                              New
                            </span>
                          )}
                          <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest border border-amber-100">
                            {item.organization}
                          </span>
                          <span className={`px-3 py-1 bg-gradient-to-r ${categoryColor} text-white rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest`}>
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
                          className="group/btn relative flex-1 md:w-auto px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-black uppercase text-[8px] sm:text-[9px] tracking-widest hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" /> 
                            Download
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                        </a>
                        
                        <a 
                          href={item.officialLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group/btn relative flex-1 md:w-auto px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-black uppercase text-[8px] sm:text-[9px] tracking-widest hover:border-transparent hover:text-white transition-all duration-500 overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Official Site
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                        </a>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-16 h-16">
                        <div className={`absolute top-0 right-0 w-0 h-0 border-t-[32px] border-r-[32px] border-t-transparent border-r-indigo-600/20 group-hover:border-r-indigo-600/40 transition-all duration-500`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Research Lab CTA - Enhanced */}
      <div className="mt-20 sm:mt-40 pt-16 sm:pt-32 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
        <div className="group relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
          
          <div className="relative z-10 max-w-2xl text-left">
            <h4 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-8 tracking-tight">
              Need Custom Research?
            </h4>
            <p className="text-white/80 text-sm sm:text-xl font-medium mb-8 sm:mb-12">
              Search any syllabus, curriculum, or exam pattern using our AI-powered research lab.
            </p>
            <button 
              onClick={onOpenLab} 
              className="group/btn relative px-8 sm:px-12 py-4 sm:py-6 bg-white text-slate-900 rounded-xl sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[11px] tracking-[0.3em] hover:bg-slate-100 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Open Research Lab
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 opacity-20">
            <BookOpen className="w-32 h-32 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusSection;