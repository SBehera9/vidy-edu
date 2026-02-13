
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
    <div className="max-w-5xl mx-auto py-32 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-3 mb-10 text-indigo-600 font-bold text-[11px] uppercase tracking-[0.3em]">
        <div className="p-2 bg-indigo-50 rounded-lg">
          {React.createElement(icon, { className: "w-4 h-4" })}
        </div>
        {title}
      </div>
      <h2 className="text-6xl md:text-8xl font-extrabold text-slate-900 mb-16 tracking-tight leading-[0.9]">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? 'text-indigo-600' : ''}>{word} </span>
        ))}
      </h2>
      <div className="bg-white border border-slate-100 rounded-[3.5rem] p-10 md:p-20 shadow-xl shadow-slate-200/50">
        <div className="prose prose-slate prose-xl max-w-none text-slate-600 font-medium leading-relaxed">
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
          <p className="text-2xl text-slate-900 font-bold leading-snug">Vidy is India's leading digital gateway dedicated to empowering students with real-time educational data and AI-driven research tools.</p>
          <p>Our mission is simple: to democratize high-quality academic information. In an era of misinformation, Vidy stands as a beacon of truth, providing verified career notifications, standardized curricula, and intelligent search capabilities—all for free.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-10 bg-indigo-50/50 rounded-3xl border border-indigo-100">
              <Rocket className="w-10 h-10 text-indigo-600 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-4">Our Vision</h4>
              <p className="text-base text-slate-600">To be the default homepage for every Indian student, from Grade 1 to PhD.</p>
            </div>
            <div className="p-10 bg-emerald-50/50 rounded-3xl border border-emerald-100">
              <Heart className="w-10 h-10 text-emerald-600 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-4">Our Values</h4>
              <p className="text-base text-slate-600">Accuracy, Accessibility, and Advancement through technology.</p>
            </div>
          </div>
        </div>
      ));

      case Section.TERMS: return renderStaticPage("Terms of Service", Scale, (
        <div className="space-y-8">
          <p>By accessing Vidy, you agree to our professional standards. We aggregate public domain educational data for student benefit. While we strive for perfection, always verify critical dates with official government gazettes.</p>
          <h4 className="text-2xl font-black text-slate-900 mt-12 mb-6">User Responsibilities</h4>
          <ul className="list-disc pl-6 space-y-4">
            <li>Users must use the Research Lab for ethical academic purposes only.</li>
            <li>Information obtained here should be cross-verified for high-stakes decisions (like job applications).</li>
            <li>Redistribution of our aggregated data for commercial gain is prohibited.</li>
          </ul>
        </div>
      ));

      case Section.PRIVACY: return renderStaticPage("Privacy Policy", ShieldCheck, (
        <div className="space-y-8">
          <p className="text-xl">Your privacy is not a feature; it is a fundamental right. Vidy is built on a "Privacy by Design" philosophy.</p>
          <div className="space-y-6">
            <div className="flex gap-6 p-8 bg-slate-50 rounded-3xl items-start">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><ShieldCheck className="w-6 h-6 text-indigo-600"/></div>
              <div>
                <h5 className="font-bold text-slate-900 mb-2">Zero Data Selling</h5>
                <p className="text-sm">We never have, and never will, sell student contact data to coaching institutes or recruiters.</p>
              </div>
            </div>
            <div className="flex gap-6 p-8 bg-slate-50 rounded-3xl items-start">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><Search className="w-6 h-6 text-indigo-600"/></div>
              <div>
                <h5 className="font-bold text-slate-900 mb-2">Anonymized Research</h5>
                <p className="text-sm">Your search queries in the Intelligence Lab are anonymized to protect your academic interests.</p>
              </div>
            </div>
          </div>
        </div>
      ));

      case Section.DISCLAIMER: return renderStaticPage("Disclaimer", FileText, (
        <div className="space-y-8">
          <p className="text-xl">Vidy is an independent educational technology platform and is NOT a government entity.</p>
          <div className="p-10 border-l-4 border-amber-400 bg-amber-50 rounded-r-3xl">
            <p className="text-amber-900 font-medium">Important: We do not issue job offers, admit cards, or certificates. We are an information aggregator and AI research assistant.</p>
          </div>
          <p>All logos, trademarks, and organization names displayed on the Career Hub belong to their respective owners. We reference them solely for the purpose of directing students to legitimate opportunities.</p>
        </div>
      ));

      case Section.FAQ: return renderStaticPage("Support FAQ", HelpCircle, (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { q: "Is everything really free?", a: "100%. Vidy is a mission-driven project to empower India's youth through free information access." },
            { q: "How accurate is the AI Lab?", a: "The lab uses Google's latest Gemini models with Real-time Search Grounding, ensuring over 95% factual accuracy for current events." },
            { q: "Are the job links safe?", a: "Every link is pre-screened by our algorithms to ensure they point to official .gov.in, .nic.in, or verified corporate domains." },
            { q: "How do I contact a counselor?", a: "Use the floating WhatsApp button or the Contact Us page for personalized academic guidance." }
          ].map((item, i) => (
            <div key={i} className="group p-10 bg-white border border-slate-100 rounded-[3rem] hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all">
              <h4 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors">{item.q}</h4>
              <p className="text-slate-500 font-medium">{item.a}</p>
            </div>
          ))}
        </div>
      ));

      case Section.CONTACT_PAGE: return renderStaticPage("Connect with Vidy", MessageSquare, (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <p className="text-2xl font-bold text-slate-900 leading-snug">Have a specific question about your career or curriculum? Reach out to our 24/7 helpdesk.</p>
            <div className="space-y-10">
              {[
                { icon: Mail, label: "Official Email", val: "hello@vidy.edu.in", color: "text-indigo-600 bg-indigo-50" },
                { icon: Phone, label: "Student Helpline", val: "+91 1800-VIDY-EDU", color: "text-emerald-600 bg-emerald-50" },
                { icon: MapPin, label: "Corporate HQ", val: "Tech Hub, Sector 44, Gurugram, HR", color: "text-rose-600 bg-rose-50" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</p>
                    <p className="text-slate-900 font-extrabold text-lg">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 bg-slate-50 p-12 md:p-16 rounded-[4rem] border border-slate-100">
            <h4 className="text-3xl font-extrabold text-slate-900 mb-8">Send a Priority Ticket</h4>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" className="w-full px-8 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all" />
                <input type="email" placeholder="Email Address" className="w-full px-8 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all" />
              </div>
              <input type="text" placeholder="Subject" className="w-full px-8 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all" />
              <textarea rows={5} placeholder="How can we help you today?" className="w-full px-8 py-6 bg-white border border-slate-200 rounded-3xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all resize-none"></textarea>
              <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-500/10 btn-shine">Dispatch Message</button>
            </form>
          </div>
        </div>
      ));

      default: return (
        <ErrorBoundary sectionName="Home">
          <div className="animate-in fade-in duration-1000">
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden hero-mesh">
              <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-white border border-slate-100 rounded-full text-indigo-600 text-[11px] font-extrabold uppercase tracking-[0.3em] mb-12 shadow-sm animate-float">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  The AI-First Student Gateway
                </div>
                <h1 className="text-7xl md:text-9xl font-extrabold text-slate-900 mb-10 leading-[0.85] tracking-tight text-balance">
                  Master Your <br/><span className="text-indigo-600">Educational</span> Journey.
                </h1>
                <p className="text-xl md:text-3xl text-slate-500 max-w-3xl mb-16 font-medium leading-relaxed text-balance">
                  Automated career alerts, expert curriculum registries, and AI research—all designed for the modern Indian student.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button onClick={() => setSection(Section.JOBS)} className="group px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/10 btn-shine">
                    Explore Vacancies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => setSection(Section.SEARCH)} className="px-12 py-6 bg-white text-slate-900 border border-slate-200 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:border-slate-400 transition-all shadow-sm flex items-center gap-4">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> Research Lab
                  </button>
                </div>

                {/* Floating Indicators */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl">
                   {[
                     { l: "UPSC / SSC Updates", c: "Indigo" },
                     { l: "Board Curriculum", c: "Emerald" },
                     { l: "AI Web Research", c: "Rose" },
                     { l: "Direct Counselor Chat", c: "Amber" }
                   ].map((item, idx) => (
                     <div key={idx} className="flex items-center gap-3 justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.l}</span>
                     </div>
                   ))}
                </div>
              </div>
            </section>

            {/* Main Feature Grid (Bento Box) */}
            <section className="py-32 px-6 bg-white relative">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Career Hub - Large */}
                  <button onClick={() => setSection(Section.JOBS)} className="md:col-span-8 bento-card p-12 md:p-16 rounded-[4rem] group text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="w-16 h-16 bg-indigo-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-indigo-200">
                        <Briefcase className="w-8 h-8" />
                      </div>
                      <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Career Hub</h3>
                      <p className="text-xl text-slate-500 font-medium max-w-md mb-12">Get instant notifications for UPSC, SSC, Railway, and State government vacancies across all 28 states.</p>
                      <div className="mt-auto flex items-center gap-4 text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em]">
                        Browse 2,500+ Active Openings <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Research Lab */}
                  <button onClick={() => setSection(Section.SEARCH)} className="md:col-span-4 bento-card p-12 rounded-[4rem] group text-left bg-slate-900 border-none">
                    <div className="h-full flex flex-col">
                      <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-emerald-500/20">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl font-extrabold text-white mb-6">Intelligence Lab</h3>
                      <p className="text-slate-400 text-base font-medium mb-12">AI-powered research tool that searches the live web for academic answers.</p>
                      <div className="mt-auto flex items-center gap-4 text-[11px] font-black text-emerald-400 uppercase tracking-[0.3em]">
                        Start Research <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Syllabus */}
                  <button onClick={() => setSection(Section.SYLLABUS)} className="md:col-span-5 bento-card p-12 rounded-[4rem] group text-left">
                    <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-amber-500/20">
                      <Book className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-6">Curriculum Registry</h3>
                    <p className="text-slate-500 text-base font-medium mb-12">Official syllabus for CBSE, ICSE, and All-India University courses.</p>
                    <div className="mt-auto flex items-center gap-4 text-[11px] font-black text-amber-600 uppercase tracking-[0.3em]">
                      Download Registry <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Gazette */}
                  <button onClick={() => setSection(Section.NEWS)} className="md:col-span-7 bento-card p-12 md:p-16 rounded-[4rem] group text-left relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-rose-500 text-white rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-rose-200">
                        <Newspaper className="w-8 h-8" />
                      </div>
                      <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Vidy Gazette</h3>
                      <p className="text-xl text-slate-500 font-medium max-w-sm mb-12">Stay ahead with real-time alerts on scholarships and educational policy updates.</p>
                      <div className="flex items-center gap-4 text-[11px] font-black text-rose-600 uppercase tracking-[0.3em]">
                        Read Latest Bulletins <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* Achievement / Stats section */}
            <section className="py-32 px-6 bg-slate-900 text-white">
               <div className="max-w-7xl mx-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                        <Trophy className="w-6 h-6 text-indigo-400" />
                      </div>
                      <h4 className="text-5xl font-black">1.2M+</h4>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Monthly Active Students</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                        <Globe className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h4 className="text-5xl font-black">28</h4>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">States & UTs Covered</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                        <Zap className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="text-5xl font-black">4hr</h4>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Data Sync Frequency</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                        <Award className="w-6 h-6 text-rose-400" />
                      </div>
                      <h4 className="text-5xl font-black">Verified</h4>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Official Gov Sources</p>
                    </div>
                 </div>
               </div>
            </section>

            {/* CTA Final */}
            <section className="py-40 px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-6xl md:text-8xl font-extrabold text-slate-900 mb-12 tracking-tight leading-none">Ready to <span className="text-indigo-600">Excel?</span></h2>
                <p className="text-2xl text-slate-500 font-medium mb-16 max-w-2xl mx-auto">Join thousands of students using Vidy to accelerate their career and academic research.</p>
                <button onClick={() => setSection(Section.JOBS)} className="px-16 py-8 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.4em] hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/10 btn-shine">
                  Create My Roadmap Now
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
      
      <footer className="bg-slate-950 py-32 px-6 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            {/* Brand & Socials */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <span className="font-extrabold text-4xl tracking-tighter">Vidy</span>
              </div>
              <p className="text-slate-400 text-base font-medium mb-12 leading-relaxed">India's premier professional academic hub. We bridge the gap between information and opportunity for every student.</p>
              
              <div className="flex flex-wrap gap-4">
                {[Twitter, Linkedin, Instagram, Youtube, Facebook].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all border border-white/10 group">
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Portal Links */}
            <div>
              <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10">Gateway Portals</h5>
              <ul className="space-y-6 text-slate-400 text-xs font-extrabold uppercase tracking-widest">
                <li><button onClick={() => setSection(Section.HOME)} className="hover:text-white transition-colors flex items-center gap-3">Home Dashboard <ChevronRight className="w-3 h-3 text-indigo-500" /></button></li>
                <li><button onClick={() => setSection(Section.JOBS)} className="hover:text-white transition-colors flex items-center gap-3">Career Hub <ChevronRight className="w-3 h-3 text-indigo-500" /></button></li>
                <li><button onClick={() => setSection(Section.SYLLABUS)} className="hover:text-white transition-colors flex items-center gap-3">Curriculum Academy <ChevronRight className="w-3 h-3 text-indigo-500" /></button></li>
                <li><button onClick={() => setSection(Section.SEARCH)} className="hover:text-white transition-colors flex items-center gap-3">AI Intelligence Lab <ChevronRight className="w-3 h-3 text-indigo-500" /></button></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10">Knowledge Base</h5>
              <ul className="space-y-6 text-slate-400 text-xs font-extrabold uppercase tracking-widest">
                <li><button onClick={() => setSection(Section.ABOUT)} className="hover:text-white transition-colors">Our Mission</button></li>
                <li><button onClick={() => setSection(Section.FAQ)} className="hover:text-white transition-colors">Common FAQs</button></li>
                <li><button onClick={() => setSection(Section.TERMS)} className="hover:text-white transition-colors">Usage Terms</button></li>
                <li><button onClick={() => setSection(Section.PRIVACY)} className="hover:text-white transition-colors">Privacy Shield</button></li>
                <li><button onClick={() => setSection(Section.DISCLAIMER)} className="hover:text-white transition-colors">Legal Disclaimer</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10">Contact Registry</h5>
              <ul className="space-y-8 text-slate-400 text-base font-medium">
                <li className="flex items-start gap-6">
                  <div className="p-3 bg-indigo-500/10 rounded-xl shrink-0"><Mail className="w-5 h-5 text-indigo-500" /></div>
                  <div>
                    <span className="block text-white font-black text-[10px] uppercase tracking-widest mb-1">Email Support</span>
                    <button onClick={() => setSection(Section.CONTACT_PAGE)} className="hover:text-white transition-colors font-bold">support@vidy.edu.in</button>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-3 bg-emerald-500/10 rounded-xl shrink-0"><Phone className="w-5 h-5 text-emerald-500" /></div>
                  <div>
                    <span className="block text-white font-black text-[10px] uppercase tracking-widest mb-1">National Helpline</span>
                    <span className="font-bold">+91 1800-VIDY-EDU</span>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-3 bg-rose-500/10 rounded-xl shrink-0"><MapPin className="w-5 h-5 text-rose-500" /></div>
                  <div>
                    <span className="block text-white font-black text-[10px] uppercase tracking-widest mb-1">Registered HQ</span>
                    Tech Towers, Sector 44<br/>Gurugram, HR 122002
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">© 2025 VIDY PROFESSIONAL EDUCATIONAL SERVICES PVT LTD.</p>
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> SSL SECURE
              </span>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-500" /> PAN INDIA GATEWAY
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
