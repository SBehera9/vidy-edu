
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Zap, ArrowRight, MessageSquareCode, ShieldCheck, Heart } from 'lucide-react';

const QuickContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello Vidy Team, I'm a student seeking guidance on academic resources.");
    window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-10 right-10 z-[200]">
      {/* Prompt Toast */}
      {showPrompt && !isOpen && (
        <div className="absolute bottom-24 right-0 w-64 bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl animate-in slide-in-from-right-12 duration-700">
          <button onClick={() => setShowPrompt(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
          <p className="text-sm font-bold leading-tight mb-2">Need Help?</p>
          <p className="text-xs text-slate-400 font-medium">Chat with our expert academic counselors now.</p>
        </div>
      )}

      {/* Main Card */}
      <div className={`absolute bottom-24 right-0 w-80 bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden transition-all duration-700 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-20 pointer-events-none'}`}>
        <div className="p-10">
          <div className="flex items-center gap-3 mb-8 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em]">
            <div className="p-2 bg-indigo-50 rounded-lg"><Zap className="w-3.5 h-3.5 fill-indigo-600" /></div>
            Student Desk
          </div>
          <h4 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Academic Support</h4>
          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10">
            Connect with verified counselors for admissions, career roadmaps, and syllabus help.
          </p>
          
          <button 
            onClick={handleWhatsApp}
            className="w-full py-6 bg-[#25D366] text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-emerald-200 transition-all active:scale-95 btn-shine"
          >
            <MessageCircle className="w-5 h-5 fill-white" /> Connect on WhatsApp
          </button>
        </div>
        <div className="bg-slate-50 p-6 flex items-center justify-center gap-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Verified Desk
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200"></div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Heart className="w-4 h-4" /> For Students
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => { setIsOpen(!isOpen); setShowPrompt(false); }}
        className={`group relative w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-700 active:scale-90 ${isOpen ? 'bg-slate-900 rotate-[-15deg] scale-110' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-2'}`}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <MessageSquareCode className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        )}
        
        {/* Pulsing indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-indigo-500 border-4 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default QuickContact;
