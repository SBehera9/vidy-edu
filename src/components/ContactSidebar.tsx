import React, { useState, useEffect } from 'react';
import { MessageSquare, X, User, Phone, Send, CheckCircle2, MessageCircle, ChevronLeft, ShieldCheck } from 'lucide-react';

const ContactSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    query: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setFormData({ name: '', phone: '', email: '', query: '' });
      }, 4000);
    }, 1800);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello Vidy Hub, I am searching for academic help. Guide me.");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Realigned Floating Trigger Tab - Centered on mobile right edge */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[200]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 sm:gap-3 pr-2 sm:pr-5 pl-3 sm:pl-6 py-4 sm:py-7 bg-slate-900 text-white rounded-l-[1.5rem] sm:rounded-l-[3rem] shadow-2xl hover:bg-indigo-600 transition-all duration-500 group border-y border-l border-white/10"
          >
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform text-indigo-400 group-hover:text-white" />
            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hidden md:block">Help Desk</span>
            <ChevronLeft className="w-3 h-3 opacity-30 group-hover:translate-x-[-2px] transition-transform" />
          </button>
        )}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="relative w-full max-w-2xl bg-white rounded-[3rem] sm:rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="p-8 sm:p-14 border-b border-slate-50 flex items-center justify-between bg-indigo-50/10">
              <div className="text-left">
                <div className="flex items-center gap-2 text-[8px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" /> Professional help desk
                </div>
                <h3 className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tight">Support</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 sm:p-5 bg-white text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all shadow-xl"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 sm:p-14 max-h-[75vh] overflow-y-auto">
              {isSuccess ? (
                <div className="py-10 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-emerald-50 text-emerald-500 rounded-[2.5rem] sm:rounded-[3.5rem] flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16" />
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">Ticket Logged</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm sm:text-lg max-w-xs sm:max-w-sm mx-auto">
                      Our counselors will respond via call or email within 24 hours.
                    </p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="px-10 py-4 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest">Return Home</button>
                </div>
              ) : (
                <div className="space-y-10 sm:space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                     <div className="bg-emerald-50/50 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-emerald-100 flex flex-col justify-between text-left">
                        <div>
                           <h4 className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Live Chat</h4>
                           <p className="text-emerald-700/70 text-xs sm:text-sm font-medium mb-6 leading-relaxed">Direct counseling via WhatsApp.</p>
                        </div>
                        <button
                          onClick={handleWhatsApp}
                          className="w-full flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-5 bg-[#25D366] text-white rounded-xl sm:rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-widest hover:shadow-xl transition-all"
                        >
                          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" /> Connect
                        </button>
                     </div>
                     <div className="bg-indigo-50/50 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-indigo-100 text-left">
                        <h4 className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3">Hours</h4>
                        <div className="space-y-2">
                           <p className="text-indigo-900 text-xs sm:text-sm font-bold">Mon - Sat: 9 AM - 6 PM</p>
                           <p className="text-indigo-400 text-[8px] sm:text-[9px] uppercase font-black tracking-widest">IST Timezone</p>
                        </div>
                     </div>
                  </div>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <div className="relative flex justify-center text-[8px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-slate-300"><span className="bg-white px-6">Official Query Form</span></div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Name</label>
                        <div className="relative">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                          <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 sm:pl-14 pr-6 sm:pr-8 py-4 sm:py-5 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:bg-white focus:border-indigo-600 outline-none font-bold text-xs sm:text-sm transition-all" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                          <input required type="tel" placeholder="+91" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 sm:pl-14 pr-6 sm:pr-8 py-4 sm:py-5 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:bg-white focus:border-indigo-600 outline-none font-bold text-xs sm:text-sm transition-all" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email</label>
                      <div className="relative">
                        <input type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-6 pr-6 py-4 sm:py-5 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:bg-white focus:border-indigo-600 outline-none font-bold text-xs sm:text-sm transition-all" />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Your Requirement</label>
                      <textarea required rows={3} placeholder="Describe your query..." value={formData.query} onChange={(e) => setFormData({...formData, query: e.target.value})} className="w-full p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2.5rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-xs sm:text-sm transition-all resize-none shadow-inner" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-5 sm:py-6 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] flex items-center justify-center gap-3 sm:gap-4 hover:bg-indigo-600 transition-all shadow-2xl disabled:opacity-50">
                      {isSubmitting ? <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <>Submit Ticket <Send className="w-3 h-3 sm:w-4 sm:h-4" /></>}
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-50 flex items-center justify-center bg-slate-50/30">
              <p className="text-[7px] sm:text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] sm:tracking-[0.5em] text-center">
                Secure National Student Registry Desk
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSidebar;