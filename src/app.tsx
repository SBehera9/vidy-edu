import React, { useState, useEffect } from "react";
import { Section } from "./types";
import Navbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import JobSection from "./components/JobSection";
import SyllabusSection from "./components/SyllabusSection";
import NewsSection from "./components/NewsSection";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfUse from "./components/TermsOfUse";
import Disclaimer from "./components/Disclaimer";
import FAQ from "./components/FAQ";
import ContactPage from "./components/ContactPage";
import ErrorBoundary from "./components/ErrorBoundary";
import QuickContact from "./components/QuickContact";
import Footer from "./components/Footer";
import {
  Info,
  Scale,
  ShieldCheck,
  HelpCircle,
  MessageSquare,
  Zap
} from "lucide-react";

const App: React.FC = () => {
  const [currentSection, setSection] = useState<Section>(Section.HOME);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSection]);

  const renderStaticPage = (
    title: string,
    icon: any,
    content: React.ReactNode
  ) => (
    <div className="max-w-5xl mx-auto py-16 sm:py-32 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-3 mb-6 sm:mb-10 text-indigo-600 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.3em]">
        <div className="p-2 bg-indigo-50 rounded-lg">
          {React.createElement(icon, { className: "w-4 h-4" })}
        </div>
        {title}
      </div>
      <h2 className="text-4xl sm:text-8xl font-extrabold text-slate-900 mb-10 sm:mb-16 tracking-tight">
        {title}
      </h2>
      <div className="bg-white border border-slate-100 rounded-[2rem] sm:rounded-[3.5rem] p-6 sm:p-20 shadow-xl shadow-slate-200/50">
        <div className="prose prose-slate prose-lg sm:prose-xl max-w-none text-slate-600 font-medium">
          {content}
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case Section.SEARCH:
        return (
          <ErrorBoundary sectionName="Research Lab">
            <SearchSection />
          </ErrorBoundary>
        );

      case Section.JOBS:
        return (
          <ErrorBoundary sectionName="Career Board">
            <JobSection />
          </ErrorBoundary>
        );

      case Section.SYLLABUS:
        return (
          <ErrorBoundary sectionName="Academy">
            <SyllabusSection onOpenLab={() => setSection(Section.SEARCH)} />
          </ErrorBoundary>
        );

      case Section.NEWS:
        return (
          <ErrorBoundary sectionName="Gazette">
            <NewsSection />
          </ErrorBoundary>
        );

      case Section.PRIVACY:
        return (
          <ErrorBoundary sectionName="Privacy Policy">
            <PrivacyPolicy />
          </ErrorBoundary>
        );

      case Section.TERMS:
        return (
          <ErrorBoundary sectionName="Terms of Use">
            <TermsOfUse />
          </ErrorBoundary>
        );

      case Section.DISCLAIMER:
        return (
          <ErrorBoundary sectionName="Disclaimer">
            <Disclaimer />
          </ErrorBoundary>
        );

      case Section.FAQ:
        return (
          <ErrorBoundary sectionName="FAQ">
            <FAQ />
          </ErrorBoundary>
        );

      case Section.CONTACT_PAGE:
        return (
          <ErrorBoundary sectionName="Contact Us">
            <ContactPage />
          </ErrorBoundary>
        );

      case Section.ABOUT:
        return renderStaticPage(
          "About Vidy",
          Info,
          <div className="space-y-4">
            <p>Vidy is a non-profit educational gateway for Indian students, providing free access to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Real-time government job notifications</li>
              <li>Official syllabus and curriculum downloads</li>
              <li>AI-powered academic research tools</li>
              <li>Latest education news and exam updates</li>
            </ul>
            <p>All services are completely free and always will be.</p>
          </div>
        );

      default:
        return (
          <section className="relative pt-32 pb-24 px-6 hero-mesh">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border rounded-full text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-12">
                <Zap className="w-3 h-3 fill-indigo-500" />
                All-India Student Gateway
              </div>

              <h1 className="text-5xl sm:text-9xl font-black text-slate-900 mb-8">
                Master Your <span className="text-indigo-600">Future</span>
              </h1>

              <p className="text-lg sm:text-2xl text-slate-500 max-w-2xl mx-auto mb-16">
                Verified jobs, official syllabus, and research tools — free
                for every student.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => setSection(Section.JOBS)}
                  className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all"
                >
                  Browse Jobs
                </button>
                <button
                  onClick={() => setSection(Section.SEARCH)}
                  className="px-12 py-6 bg-white border rounded-[2rem] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Research Lab
                </button>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar currentSection={currentSection} setSection={setSection} />
      <QuickContact />
      <main className="flex-grow pt-10">{renderSection()}</main>
      <Footer onNavigate={(section) => setSection(section as Section)} />
    </div>
  );
};

export default App;