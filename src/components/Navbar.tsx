import React, { useState, useEffect } from 'react';
import { Section } from '../types';
import { GraduationCap, Briefcase, Search, Home, Newspaper, Menu, X, ArrowRight, Zap, ChevronRight, Sparkles, BookOpen, MessageCircle } from 'lucide-react';

interface NavbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: Section.HOME, label: 'Home', icon: Home, color: 'from-slate-900 to-slate-700' },
    { id: Section.SYLLABUS, label: 'Syllabus', icon: GraduationCap, color: 'from-amber-500 to-orange-500' },
    { id: Section.JOBS, label: 'Jobs', icon: Briefcase, color: 'from-blue-500 to-indigo-500' },
    { id: Section.SEARCH, label: 'Research', icon: Search, color: 'from-emerald-500 to-teal-500' },
    { id: Section.NEWS, label: 'Updates', icon: Newspaper, color: 'from-rose-500 to-pink-500' },
  ];

  const handleNavClick = (id: Section) => {
    setSection(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-[100] px-6 transition-all duration-700 ${scrolled ? 'pt-4' : 'pt-6'}`}>
        <nav className={`max-w-7xl mx-auto h-20 transition-all duration-700 flex items-center justify-between px-8 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-indigo-500/10 border border-white/50' 
            : 'bg-transparent'
        }`}>
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick(Section.HOME)}
          >
            <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:rotate-[-8deg] group-hover:scale-110 ${
              scrolled 
                ? 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30' 
                : 'bg-gradient-to-br from-indigo-600 to-purple-600'
            }`}>
              <Zap className="text-white w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
            <span className={`font-black text-3xl tracking-tighter transition-all duration-700 ${
              scrolled ? 'text-slate-900' : 'text-slate-900'
            }`}>
              Vidy
              <span className="ml-1 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">.edu</span>
            </span>
          </div>

          <div className={`hidden lg:flex items-center gap-1 p-1.5 rounded-[1.8rem] transition-all duration-700 ${
            scrolled ? 'bg-slate-100/40' : 'bg-slate-100/50'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-[1.4rem] font-extrabold text-[11px] uppercase tracking-widest transition-all duration-500 overflow-hidden group ${
                  currentSection === item.id 
                    ? 'text-white shadow-lg scale-105' 
                    : 'text-slate-500 hover:text-slate-900 hover:scale-105'
                }`}
              >
                {currentSection === item.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-100`}></div>
                )}
                {hoveredItem === item.id && currentSection !== item.id && (
                  <div className="absolute inset-0 bg-slate-200/50 animate-in fade-in duration-300"></div>
                )}
                <item.icon className={`w-4 h-4 transition-all duration-500 relative z-10 ${
                  currentSection === item.id ? 'text-white' : 'text-slate-400'
                }`} />
                <span className="relative z-10">{item.label}</span>
                {currentSection === item.id && (
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick(Section.SEARCH)} 
              className={`hidden md:flex relative group px-8 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 overflow-hidden ${
                scrolled 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30' 
                  : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Access Lab
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`lg:hidden p-4 rounded-2xl transition-all active:scale-90 relative overflow-hidden group ${
                scrolled 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-slate-900 shadow-sm'
              }`}
            >
              <Menu className="w-6 h-6 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </nav>
      </div>

      <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-700 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-indigo-950/80 to-purple-950/90 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
        
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-[420px] bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-10 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="text-white w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-3xl tracking-tighter block">Vidy</span>
                <span className="text-[8px] font-bold text-indigo-600 uppercase tracking-widest">Student Portal</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-all group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="p-10 space-y-4">
            {navItems.map((item, i) => (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item.id)} 
                className={`group relative w-full flex items-center justify-between p-6 rounded-[2rem] font-extrabold text-base transition-all duration-500 overflow-hidden ${
                  currentSection === item.id 
                    ? 'text-white shadow-2xl scale-105' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {currentSection === item.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color}`}></div>
                )}
                <div className="relative z-10 flex items-center gap-5">
                  <item.icon className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
                    currentSection === item.id ? 'text-white' : item.color.split(' ')[0].replace('from-', 'text-')
                  }`} />
                  {item.label}
                </div>
                <ChevronRight className={`relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-2 ${
                  currentSection === item.id ? 'text-white' : 'text-slate-400'
                }`} />
              </button>
            ))}
          </div>
          
          <div className="absolute bottom-10 left-10 right-10">
            <button 
              onClick={() => handleNavClick(Section.CONTACT_PAGE)} 
              className="relative w-full py-6 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-sm hover:shadow-xl transition-all overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Help & Support
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 group-hover:opacity-20 opacity-0 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0%,transparent_50%)]"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;