
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
  Book, Search, Briefcase, ChevronRight, Globe, 
  Award, Zap, ArrowRight, Newspaper, GraduationCap,
  Mail, MapPin, Sparkles, Phone, ShieldCheck,
  Twitter, Linkedin, Instagram, Facebook, Youtube,
  FileText, Scale, Info, HelpCircle, MessageSquare,
  Trophy, Rocket, Heart
} from 'lucide-react';

const App: React.FC = () => {
  const [currentSection, setSection] = useState<Section>(Section.HOME);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? 'text-indigo-600' : ''}>{word} </span>
        ))}
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
      case Section.SYLLABUS: return <ErrorBoundary sectionName="Academy"><SyllabusSection /></ErrorBoundary>;
      case Section.NEWS: return <ErrorBoundary sectionName="Gazette"><NewsSection /></ErrorBoundary>;
      
      case Section.ABOUT: return renderStaticPage("About Vidy", Info, (
        <div className="space-y-8">
          <p className="text-xl sm:text-2xl text-slate-900 font-bold leading-snug">Vidy is India's leading digital gateway dedicated to empowering students with real-time educational data and AI-driven research tools.</p>
          <p>Our mission is simple: to democratize high-quality academic information. In an era of misinformation, Vidy stands as a beacon of truth, providing verified career notifications, standardized curricula, and intelligent search capabilities—all for free.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 sm:p-10 bg-indigo-50/50 rounded-[2rem] border border-indigo-100">
              <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 mb-6" />
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Our Vision</h4>
              <p className="text-sm sm:text-base text-slate-600">To be the default homepage for every Indian student, from Grade 1 to PhD.</p>
            </div>
            <div className="p-8 sm:p-10 bg-emerald-50/50 rounded-[2rem] border border-emerald-100">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 mb-6" />
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Our Values</h4>
              <p className="text-sm sm:text-base text-slate-600">Accuracy, Accessibility, and Advancement through technology.</p>
            </div>
          </div>
        </div>
      ));

      case Section.TERMS: return renderStaticPage("Terms of Service", Scale, (
        <div className="space-y-8">
          <p>By accessing Vidy, you agree to our professional standards. We aggregate public domain educational data for student benefit. While we strive for perfection, always verify critical dates with official government gazettes.</p>
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-8 sm:mt-12 mb-6">User Responsibilities</h4>
          <ul className="list-disc pl-6 space-y-4">
            <li>Users must use the Research Lab for ethical academic purposes only.</li>
            <li>Information obtained here should be cross-verified for high-stakes decisions.</li>
            <li>Redistribution of our aggregated data for commercial gain is prohibited.</li>
          </ul>
        </div>
      ));

      case Section.PRIVACY: return renderStaticPage("Privacy Policy", ShieldCheck, (
        <div className="space-y-8">
          <p className="text-lg sm:text-xl">Your privacy is not a feature; it is a fundamental right. Vidy is built on a "Privacy by Design" philosophy.</p>
          <div className="space-y-6">
            <div className="flex gap-4 sm:gap-6 p-6 sm:p-8 bg-slate-50 rounded-[2rem] items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"/></div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1 sm:mb-2">Zero Data Selling</h5>
                <p className="text-xs sm:text-sm">We never have, and never will, sell student contact data to coaching institutes or recruiters.</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6 p-6 sm:p-8 bg-slate-50 rounded-[2rem] items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><Search className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"/></div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1 sm:mb-2">Anonymized Research</h5>
                <p className="text-xs sm:text-sm">Your search queries in the Intelligence Lab are anonymized to protect your academic interests.</p>
              </div>
            </div>
          </div>
        </div>
      ));

      case Section.DISCLAIMER: return renderStaticPage("Disclaimer", FileText, (
        <div className="space-y-8">
          <p className="text-lg sm:text-xl">Vidy is an independent educational technology platform and is NOT a government entity.</p>
          <div className="p-6 sm:p-10 border-l-4 border-amber-400 bg-amber-50 rounded-r-[1.5rem] sm:rounded-r-3xl">
            <p className="text-amber-900 font-medium text-sm sm:text-base">Important: We do not issue job offers, admit cards, or certificates. We are an information aggregator and AI research assistant.</p>
          </div>
          <p>All logos, trademarks, and organization names displayed on the Career Hub belong to their respective owners. We reference them solely for the purpose of directing students to legitimate opportunities.</p>
        </div>
      ));

      case Section.FAQ: return renderStaticPage("Support FAQ", HelpCircle, (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {[
            { q: "Is everything really free?", a: "100%. Vidy is a mission-driven project to empower India's youth through free information access." },
            { q: "How accurate is the AI Lab?", a: "The lab uses Google's latest Gemini models with Real-time Search Grounding, ensuring over 95% factual accuracy for current events." },
            { q: "Are the job links safe?", a: "Every link is pre-screened by our algorithms to ensure they point to official .gov.in, .nic.in, or verified corporate domains." },
            { q: "How do I contact a counselor?", a: "Use the floating WhatsApp button or the Contact Us page for personalized academic guidance." }
          ].map((item, i) => (
            <div key={i} className="group p-8 sm:p-10 bg-white border border-slate-100 rounded-[2rem] sm:rounded-[3rem] hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all">
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 group-hover:text-indigo-600 transition-colors">{item.q}</h4>
              <p className="text-slate-500 text-sm sm:text-base font-medium">{item.a}</p>
            </div>
          ))}
        </div>
      ));

      case Section.CONTACT_PAGE: return renderStaticPage("Connect with Vidy", MessageSquare, (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-16">
          <div className="lg:col-span-2 space-y-10 sm:space-y-12">
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">Have a specific question about your career or curriculum? Reach out to our 24/7 helpdesk.</p>
            <div className="space-y-8 sm:space-y-10">
              {[
                { icon: Mail, label: "Official Email", val: "hello@vidy.edu.in", color: "text-indigo-600 bg-indigo-50" },
                { icon: Phone, label: "Student Helpline", val: "+91 1800-VIDY-EDU", color: "text-emerald-600 bg-emerald-50" },
                { icon: MapPin, label: "Corporate HQ", val: "Tech Hub, Gurugram, HR", color: "text-rose-600 bg-rose-50" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 sm:gap-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0`}>
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</p>
                    <p className="text-slate-900 font-extrabold text-base sm:text-lg">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 bg-slate-50 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 sm:mb-8">Send a Ticket</h4>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input type="text" placeholder="Your Name" className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-white border border-slate-200 rounded-xl sm:rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all" />
                <input type="email" placeholder="Email Address" className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-white border border-slate-200 rounded-xl sm:rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all" />
              </div>
              <input type="text" placeholder="Subject" className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-white border border-slate-200 rounded-xl sm:rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all" />
              <textarea rows={5} placeholder="How can we help?" className="w-full px-6 sm:px-8 py-4 sm:py-6 bg-white border border-slate-200 rounded-[1.5rem] sm:rounded-3xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all resize-none"></textarea>
              <button className="w-full py-5 sm:py-6 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[10px] sm:text-[11px] tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl btn-shine">Dispatch Message</button>
            </form>
          </div>
        </div>
      ));

      default: return (
        <ErrorBoundary sectionName="Home">
          <div className="animate-in fade-in duration-1000">
            {/* Hero Section */}
            <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden hero-mesh">
              <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 bg-white border border-slate-100 rounded-full text-indigo-600 text-[9px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 sm:mb-12 shadow-sm animate-float">
                  <div className="w-1.5 h-1.5 sm:w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  The AI-First Student Gateway
                </div>
                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-slate-900 mb-8 sm:mb-10 leading-[0.9] tracking-tight">
                  Master Your <br/><span className="text-indigo-600">Educational</span> Journey.
                </h1>
                <p className="text-lg sm:text-xl md:text-3xl text-slate-500 max-w-3xl mb-12 sm:mb-16 font-medium leading-relaxed px-4">
                  Automated career alerts, expert curriculum registries, and AI research—all designed for India's youth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-8 sm:px-0">
                  <button onClick={() => setSection(Section.JOBS)} className="group px-8 sm:px-12 py-5 sm:py-6 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 sm:gap-4 shadow-2xl btn-shine">
                    Explore Vacancies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => setSection(Section.SEARCH)} className="px-8 sm:px-12 py-5 sm:py-6 bg-white text-slate-900 border border-slate-200 rounded-[1.5rem] sm:rounded-[2rem] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] hover:border-slate-400 transition-all shadow-sm flex items-center justify-center gap-3 sm:gap-4">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> Research Lab
                  </button>
                </div>

                <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 w-full max-w-4xl px-4">
                   {[
                     { l: "UPSC Updates" },
                     { l: "Board Syllabus" },
                     { l: "AI Research" },
                     { l: "Counselor Chat" }
                   ].map((item, idx) => (
                     <div key={idx} className="flex items-center gap-2 justify-center">
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.l}</span>
                     </div>
                   ))}
                </div>
              </div>
            </section>

            {/* Main Feature Grid (Bento Box) - Optimized for mobile per user request */}
            <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white relative">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-8">
                  {/* Career Hub - Large */}
                  <button onClick={() => setSection(Section.JOBS)} className="col-span-2 md:col-span-8 bento-card p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] group text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-indigo-50 rounded-full blur-[40px] sm:blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-600 text-white rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-10 shadow-lg">
                        <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                      <h3 className="text-2xl sm:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-6 tracking-tight">Career Hub</h3>
                      <p className="text-sm sm:text-xl text-slate-500 font-medium max-w-md mb-8 sm:mb-12">Instant notifications for UPSC, SSC, Railway, and State government vacancies.</p>
                      <div className="mt-auto flex items-center gap-2 sm:gap-4 text-[8px] sm:text-[11px] font-black text-indigo-600 uppercase tracking-widest sm:tracking-[0.3em]">
                        Browse Active Openings <ChevronRight className="w-3 h-3 sm:w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Research Lab */}
                  <button onClick={() => setSection(Section.SEARCH)} className="col-span-2 md:col-span-4 bento-card p-8 rounded-[2.5rem] sm:rounded-[4rem] group text-left bg-slate-900 border-none">
                    <div className="h-full flex flex-col">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-500 text-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-10 shadow-lg">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-6">Intelligence Lab</h3>
                      <p className="text-slate-400 text-xs sm:text-base font-medium mb-8 sm:mb-12">AI research tool for live web academic answers.</p>
                      <div className="mt-auto flex items-center gap-2 sm:gap-4 text-[8px] sm:text-[11px] font-black text-emerald-400 uppercase tracking-widest sm:tracking-[0.3em]">
                        Start Research <ChevronRight className="w-3 h-3 sm:w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Syllabus */}
                  <button onClick={() => setSection(Section.SYLLABUS)} className="col-span-1 md:col-span-5 bento-card p-6 sm:p-12 rounded-[2rem] sm:rounded-[4rem] group text-left">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-amber-500 text-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-10 shadow-lg">
                      <Book className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-3xl font-extrabold text-slate-900 mb-2 sm:mb-6">Registry</h3>
                    <p className="text-slate-500 text-[10px] sm:text-base font-medium mb-6 sm:mb-12">Official syllabus for CBSE & Universities.</p>
                    <div className="mt-auto flex items-center gap-1 sm:gap-4 text-[7px] sm:text-[11px] font-black text-amber-600 uppercase tracking-widest">
                      Explore <ChevronRight className="w-3 h-3 sm:w-4 h-4" />
                    </div>
                  </button>

                  {/* Gazette */}
                  <button onClick={() => setSection(Section.NEWS)} className="col-span-1 md:col-span-7 bento-card p-6 sm:p-12 rounded-[2rem] sm:rounded-[4rem] group text-left relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-rose-50 rounded-full blur-[40px] sm:blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 bg-rose-500 text-white rounded-xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-10 shadow-lg">
                        <Newspaper className="w-5 h-5 sm:w-8 sm:h-8" />
                      </div>
                      <h3 className="text-lg sm:text-4xl font-extrabold text-slate-900 mb-2 sm:mb-6">Gazette</h3>
                      <p className="text-slate-500 text-[10px] sm:text-xl font-medium max-w-sm mb-6 sm:mb-12">Real-time alerts on scholarships.</p>
                      <div className="flex items-center gap-1 sm:gap-4 text-[7px] sm:text-[11px] font-black text-rose-600 uppercase tracking-widest">
                        Bulletins <ChevronRight className="w-3 h-3 sm:w-4 h-4" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* Achievement Stats */}
            <section className="py-20 sm:py-32 px-4 sm:px-6 bg-slate-900 text-white">
               <div className="max-w-7xl mx-auto">
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-16">
                    <div className="space-y-2 sm:space-y-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 sm:mb-8">
                        <Trophy className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400" />
                      </div>
                      <h4 className="text-3xl sm:text-5xl font-black">1.2M+</h4>
                      <p className="text-[8px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">Monthly Students</p>
                    </div>
                    <div className="space-y-2 sm:space-y-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 sm:mb-8">
                        <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400" />
                      </div>
                      <h4 className="text-3xl sm:text-5xl font-black">28</h4>
                      <p className="text-[8px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">States Covered</p>
                    </div>
                    <div className="space-y-2 sm:space-y-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 sm:mb-8">
                        <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400" />
                      </div>
                      <h4 className="text-3xl sm:text-5xl font-black">4hr</h4>
                      <p className="text-[8px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">Data Sync Rate</p>
                    </div>
                    <div className="space-y-2 sm:space-y-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 sm:mb-8">
                        <Award className="w-4 h-4 sm:w-6 sm:h-6 text-rose-400" />
                      </div>
                      <h4 className="text-3xl sm:text-5xl font-black">Verify</h4>
                      <p className="text-[8px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">Official Gov Sources</p>
                    </div>
                 </div>
               </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 sm:py-40 px-4 sm:px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl sm:text-8xl font-black text-slate-900 mb-8 sm:mb-12 tracking-tight leading-none">Ready to <span className="text-indigo-600">Excel?</span></h2>
                <p className="text-lg sm:text-2xl text-slate-500 font-medium mb-10 sm:mb-16 max-w-2xl mx-auto px-4">Join thousands of students accelerating their career roadmap with Vidy.</p>
                <button onClick={() => setSection(Section.JOBS)} className="w-full sm:w-auto px-10 sm:px-16 py-6 sm:py-8 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2.5rem] font-black uppercase text-[10px] sm:text-[12px] tracking-widest sm:tracking-[0.4em] hover:bg-indigo-600 transition-all shadow-2xl btn-shine">
                  Get Started Free
                </button>
              </div>
            </section>
          </div>
        </ErrorBoundary>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      <Navbar currentSection={currentSection} setSection={setSection} />
      <QuickContact />
      <main className="flex-grow pt-10">{renderSection()}</main>
      
      <footer className="bg-slate-950 py-16 sm:py-32 px-4 sm:px-6 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Footer columns: 2 per row on mobile per user request */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-20 mb-20 sm:mb-32">
            {/* Brand & Socials - takes full width of row on mobile */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6 sm:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="font-extrabold text-3xl sm:text-4xl tracking-tighter">Vidy</span>
              </div>
              <p className="text-slate-400 text-sm sm:text-base font-medium mb-8 sm:mb-12 leading-relaxed">India's premier professional academic hub for every student.</p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all border border-white/10 group">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Portal Links */}
            <div className="col-span-1">
              <h5 className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest sm:tracking-[0.3em] text-indigo-400 mb-6 sm:mb-10">Portals</h5>
              <ul className="space-y-4 sm:space-y-6 text-slate-400 text-[8px] sm:text-xs font-extrabold uppercase tracking-widest">
                <li><button onClick={() => setSection(Section.HOME)} className="hover:text-white transition-colors">Home Dashboard</button></li>
                <li><button onClick={() => setSection(Section.JOBS)} className="hover:text-white transition-colors">Career Hub</button></li>
                <li><button onClick={() => setSection(Section.SYLLABUS)} className="hover:text-white transition-colors">Curriculum</button></li>
                <li><button onClick={() => setSection(Section.SEARCH)} className="hover:text-white transition-colors">Research Lab</button></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="col-span-1">
              <h5 className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest sm:tracking-[0.3em] text-indigo-400 mb-6 sm:mb-10">Registry</h5>
              <ul className="space-y-4 sm:space-y-6 text-slate-400 text-[8px] sm:text-xs font-extrabold uppercase tracking-widest">
                <li><button onClick={() => setSection(Section.ABOUT)} className="hover:text-white transition-colors">Mission</button></li>
                <li><button onClick={() => setSection(Section.FAQ)} className="hover:text-white transition-colors">FAQs</button></li>
                <li><button onClick={() => setSection(Section.TERMS)} className="hover:text-white transition-colors">Terms</button></li>
                <li><button onClick={() => setSection(Section.PRIVACY)} className="hover:text-white transition-colors">Privacy</button></li>
              </ul>
            </div>

            {/* Contact Info - takes full width on mobile if needed or stays in grid */}
            <div className="col-span-2 lg:col-span-1 pt-6 sm:pt-0">
              <h5 className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest sm:tracking-[0.3em] text-indigo-400 mb-6 sm:mb-10">Registry HQ</h5>
              <ul className="space-y-6 sm:space-y-8 text-slate-400 text-xs sm:text-base font-medium">
                <li className="flex items-start gap-4 sm:gap-6">
                  <div className="p-2 sm:p-3 bg-indigo-500/10 rounded-lg sm:rounded-xl shrink-0"><Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" /></div>
                  <div>
                    <span className="block text-white font-black text-[8px] sm:text-[10px] uppercase tracking-widest mb-1">Email</span>
                    <button onClick={() => setSection(Section.CONTACT_PAGE)} className="hover:text-white transition-colors font-bold text-[10px] sm:text-base">support@vidy.edu.in</button>
                  </div>
                </li>
                <li className="flex items-start gap-4 sm:gap-6">
                  <div className="p-2 sm:p-3 bg-rose-500/10 rounded-lg sm:rounded-xl shrink-0"><MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" /></div>
                  <div>
                    <span className="block text-white font-black text-[8px] sm:text-[10px] uppercase tracking-widest mb-1">Location</span>
                    <span className="text-[10px] sm:text-base">Tech Hub, Sector 44, HR 122002</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 sm:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10">
            <p className="text-[8px] sm:text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] sm:tracking-[0.4em] text-center">© 2025 VIDY PROFESSIONAL EDUCATIONAL SERVICES PVT LTD.</p>
            <div className="flex items-center gap-4 sm:gap-8">
              <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" /> SSL SECURE
              </span>
              <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 flex items-center gap-1.5 sm:gap-2">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" /> PAN INDIA
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
