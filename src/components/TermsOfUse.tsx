import React from 'react';
import { Scale, AlertCircle, CheckCircle, XCircle, FileText, Gavel, BookOpen, Sparkles, Shield, Award, Heart, ChevronRight } from 'lucide-react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-16 sm:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest mb-8 shadow-lg shadow-amber-500/30">
          <Scale className="w-4 h-4" />
          Legal Agreement
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Terms of{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Use
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-full"></div>
          </span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Effective Date: March 15, 2026 • Please read carefully
        </p>
      </div>

      {/* Content */}
      <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl hover:shadow-3xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="p-8 sm:p-16 space-y-12 relative">
          
          {/* Introduction */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
              </div>
              Acceptance of Terms
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed pl-16">
              By accessing or using Vidy's educational platform, you agree to be bound by these Terms of Use. 
              If you do not agree to all terms and conditions, please do not use our services.
            </p>
          </section>

          {/* User Eligibility */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">User Eligibility</h2>
            <div className="relative pl-16">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-10"></div>
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100">
                <p className="text-slate-700 mb-4 font-bold">You must meet the following criteria:</p>
                <ul className="space-y-3">
                  {[
                    'Be at least 13 years of age',
                    'Have the legal capacity to enter into this agreement',
                    'Not be barred from using services under applicable law',
                    'Provide accurate and complete information when required',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 group/item">
                      <CheckCircle className="w-5 h-5 text-emerald-500 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Permitted Use */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Permitted Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-16">
              <div className="group/card relative bg-white p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-black text-emerald-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  You May:
                </h3>
                <ul className="space-y-2 text-slate-600">
                  {[
                    'Access educational content for personal use',
                    'Share links to our public pages',
                    'Download publicly available materials',
                    'Contact us for legitimate inquiries',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="group/card relative bg-white p-6 rounded-2xl border border-slate-100 hover:border-rose-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-black text-rose-700 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  You May Not:
                </h3>
                <ul className="space-y-2 text-slate-600">
                  {[
                    'Republish content without permission',
                    'Sell or commercialize our materials',
                    'Attempt to hack or overload servers',
                    'Scrape or crawl our platform',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Gavel className="w-5 h-5 text-white" />
                </div>
              </div>
              Intellectual Property Rights
            </h2>
            <p className="text-slate-600 pl-16">
              All content on this platform, including text, graphics, logos, and software, is the property of 
              Vidy Educational Services or its content suppliers and is protected by Indian and international 
              copyright laws.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              Disclaimer of Warranties
            </h2>
            <div className="pl-16">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all duration-500">
                <p className="text-slate-600 italic">
                  "AS IS" AND "AS AVAILABLE" BASIS: The services are provided without warranties of any kind, 
                  either express or implied. We do not guarantee that the services will be uninterrupted, timely, 
                  secure, or error-free.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Limitation of Liability</h2>
            <p className="text-slate-600 pl-16">
              To the maximum extent permitted by law, Vidy Educational Services shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages arising from your use of the services.
            </p>
          </section>

          {/* Governing Law */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-900">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Governing Law</h2>
            <p className="text-slate-600 pl-16">
              These Terms shall be governed by the laws of India. Any disputes arising under these Terms shall 
              be subject to the exclusive jurisdiction of the courts in Bhubaneswar, Odisha.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-4 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Questions About Terms?</h2>
            <div className="pl-16">
              <div className="group/contact relative bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover/contact:opacity-100 transition-opacity duration-500"></div>
                <p className="text-slate-600 mb-4">For any questions regarding these Terms of Use:</p>
                <a href="mailto:legal@vidy.edu.in" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors group/link">
                  legal@vidy.edu.in
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest pt-8 border-t border-slate-100 flex items-center justify-between">
            <span>© 2026 Vidy Educational Services • Bhubaneswar, Odisha</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;