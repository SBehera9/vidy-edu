import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Zap, ShieldCheck, Heart, Sparkles, ArrowRight, Phone, Mail } from 'lucide-react';

const QuickContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello Vidy Team, I'm a student seeking guidance on academic resources.");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[210]">
      {/* Prompt Toast - Enhanced */}
      {showPrompt && !isOpen && (
        <div className="absolute bottom-20 sm:bottom-24 right-0 w-64 sm:w-72 bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-5 sm:p-6 rounded-[2rem] shadow-2xl animate-in slide-in-from-right-12 duration-700 border border-indigo-500/30">
          <button 
            onClick={() => setShowPrompt(false)} 
            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-bold">Need Help?</p>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Chat with our expert academic counselors now.
          </p>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-gradient-to-br from-slate-900 to-indigo-900 rotate-45"></div>
        </div>
      )}

      {/* Main Card - Enhanced */}
      <div className={`absolute bottom-20 sm:bottom-24 right-0 w-[300px] sm:w-80 bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden transition-all duration-700 transform origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-20 pointer-events-none'
      }`}>
        {/* Gradient Header */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-8 sm:p-10 text-left relative">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-indigo-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                Student Desk
              </span>
            </div>
            
            <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Support Hub
            </h4>
            
            <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-8 sm:mb-10">
              Connect with verified counselors for admissions, career roadmaps, and syllabus help.
            </p>
            
            {/* WhatsApp Button */}
            <button 
              onClick={handleWhatsApp}
              className="group/btn relative w-full py-5 sm:py-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] flex items-center justify-center gap-3 sm:gap-4 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 active:scale-95 overflow-hidden mb-3"
            >
              <span className="relative z-10 flex items-center gap-3">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                WhatsApp Counsel
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#128C7E] to-[#075E54] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            </button>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <a
                href="tel:+919876543210"
                className="group/action relative p-3 bg-slate-50 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 text-center"
              >
                <Phone className="w-4 h-4 mx-auto mb-1 text-emerald-600 group-hover/action:text-white transition-colors" />
                <span className="text-[8px] font-bold text-slate-600 group-hover/action:text-white">Call</span>
              </a>
              <a
                href="mailto:support@vidy.edu.in"
                className="group/action relative p-3 bg-slate-50 rounded-xl hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-center"
              >
                <Mail className="w-4 h-4 mx-auto mb-1 text-indigo-600 group-hover/action:text-white transition-colors" />
                <span className="text-[8px] font-bold text-slate-600 group-hover/action:text-white">Email</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-50 to-white p-4 sm:p-5 flex items-center justify-center gap-3 sm:gap-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
            Verified
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200"></div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500" />
            For Students
          </div>
        </div>
      </div>

      {/* Floating Toggle Button - Enhanced */}
      <button 
        onClick={() => { setIsOpen(!isOpen); setShowPrompt(false); }}
        className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center shadow-2xl transition-all duration-700 active:scale-90 overflow-hidden ${
          isOpen 
            ? 'bg-gradient-to-r from-slate-900 to-indigo-900 rotate-[-15deg] scale-110' 
            : 'bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] hover:-translate-y-2'
        }`}
      >
        <span className="relative z-10">
          {isOpen ? (
            <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          ) : (
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white group-hover:scale-110 transition-transform duration-500" />
          )}
        </span>
        
        {/* Animated Rings */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0%,transparent_50%)] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        
        {/* Pulsing indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 bg-emerald-500 border-2 sm:border-4 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default QuickContact;