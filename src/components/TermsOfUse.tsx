import React from 'react';
import { Scale, AlertCircle, CheckCircle, XCircle, FileText, Gavel, BookOpen } from 'lucide-react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="text-center mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-amber-600 font-black text-[10px] uppercase tracking-widest mb-6">
          <Scale className="w-4 h-4" />
          Legal Agreement
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Terms of <span className="text-amber-600">Use</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Effective Date: March 15, 2026 • Please read carefully
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 sm:p-16 space-y-12">
          
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              Acceptance of Terms
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              By accessing or using Vidy's educational platform, you agree to be bound by these Terms of Use. 
              If you do not agree to all terms and conditions, please do not use our services.
            </p>
          </section>

          {/* User Eligibility */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">User Eligibility</h2>
            <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-100">
              <p className="text-slate-700 mb-4">You must meet the following criteria to use our services:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Be at least 13 years of age</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Have the legal capacity to enter into this agreement</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Not be barred from using services under applicable law</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Provide accurate and complete information when required</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Permitted Use */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Permitted Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h3 className="font-black text-emerald-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  You May:
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Access educational content for personal use</li>
                  <li>• Share links to our public pages</li>
                  <li>• Download publicly available materials</li>
                  <li>• Contact us for legitimate inquiries</li>
                  <li>• Use search features for research</li>
                </ul>
              </div>
              <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                <h3 className="font-black text-rose-700 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  You May Not:
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Republish content without permission</li>
                  <li>• Sell or commercialize our materials</li>
                  <li>• Attempt to hack or overload servers</li>
                  <li>• Scrape or crawl our platform</li>
                  <li>• Impersonate other users</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Gavel className="w-5 h-5 text-amber-600" />
              </div>
              Intellectual Property Rights
            </h2>
            <p className="text-slate-600">
              All content on this platform, including text, graphics, logos, and software, is the property of 
              Vidy Educational Services or its content suppliers and is protected by Indian and international 
              copyright laws.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              Disclaimer of Warranties
            </h2>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <p className="text-slate-600 italic">
                "AS IS" AND "AS AVAILABLE" BASIS: The services are provided without warranties of any kind, 
                either express or implied. We do not guarantee that the services will be uninterrupted, timely, 
                secure, or error-free.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Limitation of Liability</h2>
            <p className="text-slate-600">
              To the maximum extent permitted by law, Vidy Educational Services shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages arising from your use of the services.
            </p>
          </section>

          {/* Governing Law */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Governing Law</h2>
            <p className="text-slate-600">
              These Terms shall be governed by the laws of India. Any disputes arising under these Terms shall 
              be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-4 pt-8 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Questions About Terms?</h2>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <p className="text-slate-600 mb-4">For any questions regarding these Terms of Use:</p>
              <a href="mailto:legal@vidy.edu.in" className="text-indigo-600 font-bold hover:underline">
                legal@vidy.edu.in
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;