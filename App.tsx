
import React, { useState, useEffect } from 'react';
import { Section } from './types';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';
import JobSection from './components/JobSection';
import SyllabusSection from './components/SyllabusSection';
import NewsSection from './components/NewsSection';
import ErrorBoundary from './components/ErrorBoundary';
import QuickContact from './components/QuickContact';
import { 
  Info, Scale, ShieldCheck, FileText, HelpCircle, MessageSquare,
  AlertTriangle, RefreshCw, Zap
} from 'lucide-react';

const App: React.FC = () => {
  const [currentSection, setSection] = useState<Section>(Section.HOME);
  const [isKeyMissing, setIsKeyMissing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Diagnostic check for API key
    if (!process.env.API_KEY || process.env.API_KEY === "undefined") {
      setIsKeyMissing(true);
    }
  }, [currentSection]);

  const renderStaticPage = (title: string, icon: any, content: React.ReactNode) => (
    <div className="max-w-5xl mx-auto py-16 sm:py-32 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-3 mb-6 sm:mb-10 text-indigo-600 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.3em]">
        <div className="p-1.5 sm:p-2 bg-indigo-50 rounded-lg">
          {React.createElement(icon, { className: "w-4 h-4" })}
        </div>
        {title}
      </div>
      <h2 className="text-4xl sm:text-8xl font-extrabold text-slate-900 mb-10 sm:mb-16 tracking-tight leading-[1] sm:leading-[0.9]">
        {title}
      </h2>
      <div className="bg-white border border-slate-100 rounded-[2rem] sm:rounded-[3.5rem] p-6 sm:p-20 shadow-xl shadow-slate-200/50">
        <div className="prose prose-slate prose-lg sm:prose-xl max-w-none text-slate-600 font-medium leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case Section.SEARCH: return <ErrorBoundary sectionName="Research Lab"><SearchSection /></ErrorBoundary>;
      case Section.JOBS: return <ErrorBoundary sectionName="Career Board"><JobSection /></ErrorBoundary>;
      case Section.SYLLABUS: return <ErrorBoundary sectionName="Academy"><SyllabusSection onOpenLab={() => setSection(Section.SEARCH)} /></ErrorBoundary>;
      case Section.NEWS: return <ErrorBoundary sectionName="Gazette"><NewsSection /></ErrorBoundary>;
      case Section.ABOUT: return renderStaticPage("About Vidy", Info, <p>Vidy is a non-profit educational gateway for Indian students.</p>);
      case Section.TERMS: return renderStaticPage("Terms", Scale, <p>Standard terms of use for educational resources.</p>);
      case Section.PRIVACY: return renderStaticPage("Privacy", ShieldCheck, <p>We do not store or sell student data.</p>);
      case Section.FAQ: return renderStaticPage("FAQs", HelpCircle, <p>Common questions about Vidy services.</p>);
      case Section.CONTACT_PAGE: return renderStaticPage("Support", MessageSquare, <p>Contact our helpdesk for 24/7 assistance.</p>);
      
      default: return (
        <div className="animate-in fade-in duration-1000">
          {/* Hero Section */}
          <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden hero-mesh">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-slate-100 rounded-full text-indigo-600 text-[10px] font-extrabold uppercase tracking-[0.3em] mb-12 shadow-sm animate-float">
                <Zap className="w-3 h-3 fill-indigo-500" /> All-India Student Gateway
              </div>
              <h1 className="text-5xl sm:text-9xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tight">
                Master Your <br/><span className="text-indigo-600">Future.</span>
              </h1>
              <p className="text-lg sm:text-2xl text-slate-500 max-w-2xl mb-16 font-medium">Verified jobs, official syllabus, and AI research tools—free for every student.</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button onClick={() => setSection(Section.JOBS)} className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl btn-shine">Browse Jobs</button>
                <button onClick={() => setSection(Section.SEARCH)} className="px-12 py-6 bg-white text-slate-900 border border-slate-200 rounded-[2rem] font-black uppercase tracking-widest shadow-sm">Research Lab</button>
              </div>
            </div>
          </section>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {isKeyMissing && (
        <div className="fixed top-0 left-0 w-full z-[1000] bg-rose-600 text-white p-3 text-center text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-4">
          <AlertTriangle className="w-4 h-4" />
          API_KEY not configured in Vercel. Results will not show.
          <button onClick={() => window.location.reload()} className="bg-white/20 px-3 py-1 rounded-md hover:bg-white/30 flex items-center gap-2">
            <RefreshCw className="w-3 h-3" /> Check Again
          </button>
        </div>
      )}
      <Navbar currentSection={currentSection} setSection={setSection} />
      <QuickContact />
      <main className="flex-grow pt-10">{renderSection()}</main>
      
      <footer className="bg-slate-950 py-20 px-6 text-white text-center">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2025 VIDY PROFESSIONAL EDUCATIONAL SERVICES</p>
      </footer>
    </div>
  );
};

export default App;
