
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, User, Phone, Mail, Send, CheckCircle2, MessageCircle, ChevronLeft, ShieldCheck } from 'lucide-react';

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

  // Prevent background scroll when modal is open
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
    const message = encodeURIComponent("Hello IndiaScholar Hub, I am searching for academic help. Guide me.");
    window.open(`https://wa.me/916742345678?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating Trigger Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 pr-5 pl-6 py-6 bg-slate-900 text-white rounded-l-[3rem] shadow-2xl hover:bg-indigo-600 transition-all duration-500 group border-y border-l border-white/10"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform text-indigo-400 group-hover:text-white" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] hidden md:block">Quick Support</span>
            <ChevronLeft className="w-3 h-3 opacity-30" />
          </button>
        )}
      </div>

      {/* Full Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="relative w-full max-w-2xl bg-white rounded-[4rem] shadow-2xl shadow-indigo-500/10 overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="p-10 md:p-14 border-b border-slate-50 flex items-center justify-between bg-indigo-50/10">
              <div className="text-left">
                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-4 h-4" /> Professional Help Desk
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Contact Hub</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-5 bg-white text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all shadow-xl"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-10 md:p-14 max-h-[70vh] overflow-y-auto">
              {isSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="w-32 h-32 bg-emerald-50 text-emerald-500 rounded-[3.5rem] flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-16 h-16" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Request Logged</h4>
                    <p className="text-slate-500 font-medium leading-[1.8] text-lg max-w-sm mx-auto">
                      Our academic counselors will analyze your query and respond via email or call within 24 hours.
                    </p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">Back to Dashboard</button>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100 flex flex-col justify-between">
                        <div>
                           <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Instant Access</h4>
                           <p className="text-emerald-700/70 text-sm font-medium mb-8 leading-relaxed">Direct chat with our counselor registry via WhatsApp.</p>
                        </div>
                        <button
                          onClick={handleWhatsApp}
                          className="w-full flex items-center justify-center gap-3 py-5 bg-[#25D366] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-2xl transition-all"
                        >
                          <MessageCircle className="w-5 h-5" /> Connect Now
                        </button>
                     </div>
                     <div className="bg-indigo-50/50 p-8 rounded-[3rem] border border-indigo-100">
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">Support Hours</h4>
                        <div className="space-y-3">
                           <p className="text-indigo-900 text-sm font-bold flex items-center gap-2">Mon - Sat: 9 AM - 6 PM</p>
                           <p className="text-indigo-400 text-[10px] uppercase font-bold">Closed on Public Holidays</p>
                        </div>
                     </div>
                  </div>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-[0.4em] font-black text-slate-300"><span className="bg-white px-8">Register Formal Query</span></div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Your Name</label>
                        <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input required type="text" placeholder="e.g. Rahul S." value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none font-bold text-sm transition-all" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input required type="tel" placeholder="+91" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none font-bold text-sm transition-all" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Detailed Message</label>
                      <textarea required rows={4} placeholder="Briefly describe your academic or career requirement..." value={formData.query} onChange={(e) => setFormData({...formData, query: e.target.value})} className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-sm transition-all resize-none shadow-inner" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-2xl disabled:opacity-50">
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <>Log Support Ticket <Send className="w-4 h-4" /></>}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-slate-50 flex items-center justify-center bg-slate-50/30">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] text-center">
                National Student Registry Hub • Secure End-to-End
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSidebar;
