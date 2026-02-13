
import React, { useState } from 'react';
import { fetchSyllabusByCategory } from '../services/eduService';
import { AdmitCardResult } from '../types';
import { Book, GraduationCap, School, ChevronRight, Loader2, Layers, Award, BookOpen, ArrowLeft, RefreshCw, Cpu, Zap, Download, FileText, Search } from 'lucide-react';

const CATEGORIES = [
  { id: 'school', icon: School, label: "Schooling", color: 'bg-amber-50 text-amber-600', sub: 'CBSE, ICSE, State Boards' },
  { id: 'college', icon: BookOpen, label: "Higher Ed", color: 'bg-blue-50 text-blue-600', sub: 'UG / PG Universities' },
  { id: 'exams', icon: Award, label: "Entrance", color: 'bg-rose-50 text-rose-600', sub: 'UPSC, SSC, NEET, JEE' },
  { id: 'tech', icon: Cpu, label: "Professional", color: 'bg-emerald-50 text-emerald-600', sub: 'IT Certs & Vocational' },
];

const SyncingOverlay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
    <div className="relative mb-10">
      <div className="w-32 h-32 border-4 border-indigo-100 rounded-full"></div>
      <div className="absolute inset-0 w-32 h-32 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <RefreshCw className="w-10 h-10 text-indigo-600 animate-pulse" />
      </div>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4">Syncing Academic Registry</h3>
    <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
      <Zap className="w-3 h-3 fill-indigo-500 text-indigo-500" /> {message}
    </p>
  </div>
);

const SyllabusSection: React.FC = () => {
  const [view, setView] = useState<'home' | 'listing'>('home');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AdmitCardResult[]>([]);
  const [selectedCat, setSelectedCat] = useState<any>(null);

  const openListing = async (cat: any) => {
    setSelectedCat(cat);
    setLoading(true);
    setView('listing');
    try {
      const res = await fetchSyllabusByCategory(cat.label + " " + cat.sub);
      setData(res || []);
    } catch (e) { 
      setData([]); 
    } finally { 
      setLoading(false); 
    }
  };

  const refreshListing = () => {
    if (selectedCat) openListing(selectedCat);
  };

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6 text-amber-600 font-black text-[10px] uppercase tracking-[0.4em]">
            <Layers className="w-4 h-4" /> Official Curriculum Registry
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-[0.85] mb-8">Curriculum</h2>
          <p className="text-slate-500 text-2xl font-medium leading-relaxed max-w-2xl">Download official syllabi, exam patterns, and standardized academic roadmaps verified by national boards.</p>
        </div>
        
        {view === 'listing' && !loading && (
          <button 
            onClick={refreshListing}
            className="group px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-4 shadow-xl active:scale-95"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" /> 
            Resync Registry
          </button>
        )}
      </div>

      {view === 'home' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => openListing(cat)} 
              className="bento-card p-12 rounded-[4.5rem] bg-white border border-slate-100 flex flex-col items-center text-center group hover:border-indigo-200"
            >
              <div className={`w-24 h-24 ${cat.color} rounded-[2.5rem] flex items-center justify-center mb-10 shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform duration-500`}>
                <cat.icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{cat.label}</h3>
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-10 leading-relaxed">{cat.sub}</p>
              
              <div className="mt-auto px-8 py-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center gap-2">
                Open Directory <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      )}

      {view === 'listing' && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
          <button 
            onClick={() => setView('home')} 
            className="flex items-center gap-3 text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-16 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Categories
          </button>

          {loading ? (
            <SyncingOverlay message={`Scanning ${selectedCat?.label} Databases...`} />
          ) : data.length === 0 ? (
            <div className="py-40 text-center bg-slate-50 rounded-[4rem] border border-slate-100">
              <Search className="w-20 h-20 text-slate-200 mx-auto mb-8" />
              <h3 className="text-3xl font-black text-slate-900 mb-4">No Curriculum Data Found</h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto mb-12">We couldn't find official links for this category right now. Our AI is updating the directory.</p>
              <button onClick={refreshListing} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all">Try Syncing Again</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {data.map((item, idx) => (
                <div key={idx} className="p-12 bg-white border border-slate-100 rounded-[4.5rem] flex flex-col md:flex-row items-center justify-between group hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all">
                  <div className="text-left overflow-hidden md:pr-10 mb-10 md:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100">Official Link</span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.organization}</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                    <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-2"><Download className="w-4 h-4 text-emerald-500" /> PDF Available</span>
                       <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-500" /> {item.date || 'LATEST'}</span>
                    </div>
                  </div>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center group-hover:bg-indigo-600 transition-all shrink-0 shadow-xl shadow-slate-200 group-active:scale-90"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Search Bar for specific curriculum */}
      <div className="mt-40 pt-32 border-t border-slate-50">
         <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10 max-w-2xl">
               <h4 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">Can't find your Board?</h4>
               <p className="text-slate-400 text-xl font-medium mb-12">Use our Intelligence Lab to specifically research any school or university curriculum in real-time.</p>
               <button onClick={() => window.scrollTo({top: 0})} className="px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl">Open Search Lab</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SyllabusSection;
