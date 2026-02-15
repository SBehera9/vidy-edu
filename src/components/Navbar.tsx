import React, { useState, useEffect } from 'react';
import { Section } from '../types';
import { GraduationCap, Briefcase, Search, Home, Newspaper, Menu, X, ArrowRight, Zap, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: Section.HOME, label: 'Home', icon: Home, color: 'text-slate-900' },
    { id: Section.SYLLABUS, label: 'Syllabus', icon: GraduationCap, color: 'text-amber-500' },
    { id: Section.JOBS, label: 'Jobs', icon: Briefcase, color: 'text-indigo-500' },
    { id: Section.SEARCH, label: 'Research', icon: Search, color: 'text-emerald-500' },
    { id: Section.NEWS, label: 'Updates', icon: Newspaper, color: 'text-rose-500' },
  ];

  const handleNavClick = (id: Section) => {
    setSection(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-[100] px-6 transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-0'}`}>
        <nav className={`max-w-7xl mx-auto h-20 transition-all duration-500 flex items-center justify-between px-8 ${scrolled ? 'bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-indigo-500/5 border border-white/50' : 'bg-transparent'}`}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick(Section.HOME)}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[-8deg] ${scrolled ? 'bg-slate-900 scale-90' : 'bg-indigo-600'}`}>
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className={`font-black text-3xl tracking-tighter transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>Vidy</span>
          </div>

          <div className={`hidden lg:flex items-center gap-1 p-1.5 rounded-[1.8rem] transition-all duration-500 ${scrolled ? 'bg-slate-100/40' : 'bg-slate-100/50'}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-[1.4rem] font-extrabold text-[11px] uppercase tracking-widest transition-all ${currentSection === item.id ? 'bg-white text-slate-900 shadow-md scale-105' : 'text-slate-500 hover:text-slate-900 hover:scale-105'}`}
              >
                <item.icon className={`w-4 h-4 transition-transform duration-300 ${currentSection === item.id ? item.color : 'text-slate-400'}`} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick(Section.SEARCH)} 
              className={`hidden md:flex px-8 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-indigo-500/10 ${scrolled ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}
            >
              Access Lab
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`lg:hidden p-4 rounded-2xl transition-all active:scale-90 ${scrolled ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>

      <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-700 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-[420px] bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-10 border-b border-slate-50">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center"><Zap className="text-white w-5 h-5" /></div>
               <span className="font-black text-3xl tracking-tighter">Vidy</span>
             </div>
             <button onClick={() => setIsOpen(false)} className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 transition-all"><X className="w-6 h-6" /></button>
          </div>
          <div className="p-10 space-y-4">
             {navItems.map((item, i) => (
               <button 
                 key={item.id} 
                 onClick={() => handleNavClick(item.id)} 
                 className={`group w-full flex items-center justify-between p-6 rounded-[2rem] font-extrabold text-base transition-all ${currentSection === item.id ? 'bg-slate-900 text-white shadow-2xl scale-105' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                 style={{ transitionDelay: `${i * 50}ms` }}
               >
                 <div className="flex items-center gap-5">
                   <item.icon className={`w-6 h-6 ${currentSection === item.id ? 'text-white' : item.color}`} />
                   {item.label}
                 </div>
                 <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${currentSection === item.id ? 'opacity-100' : 'opacity-20'}`} />
               </button>
             ))}
          </div>
          <div className="absolute bottom-10 left-10 right-10">
            <button onClick={() => handleNavClick(Section.CONTACT_PAGE)} className="w-full py-6 bg-indigo-50 text-indigo-600 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-sm">Help & Support</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;