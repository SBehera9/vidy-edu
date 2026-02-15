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
import HomePage from "./components/HomePage";
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
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg">
          {React.createElement(icon, { className: "w-4 h-4" })}
        </div>
        {title}
      </div>
      <h2 className="text-4xl sm:text-8xl font-extrabold text-slate-900 mb-10 sm:mb-16 tracking-tight bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2rem] sm:rounded-[3.5rem] p-6 sm:p-20 shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500">
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
          <ErrorBoundary sectionName="Home">
            <HomePage setSection={setSection} />
          </ErrorBoundary>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      <Navbar currentSection={currentSection} setSection={setSection} />
      <QuickContact />
      <main className="flex-grow pt-10">{renderSection()}</main>
      <Footer onNavigate={(section) => setSection(section as Section)} />
    </div>
  );
};

export default App;