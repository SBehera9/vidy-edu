import React from 'react';
import { AlertTriangle, Shield, ExternalLink, Info, CheckCircle, XCircle } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="text-center mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full text-rose-600 font-black text-[10px] uppercase tracking-widest mb-6">
          <AlertTriangle className="w-4 h-4" />
          Important Notice
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          <span className="text-rose-600">Disclaimer</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Please read this disclaimer carefully before using our services
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 sm:p-16 space-y-12">
          
          {/* General Disclaimer */}
          <section className="space-y-4">
            <div className="flex items-center gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-200">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <p className="text-amber-800 font-medium">
                The information provided on this platform is for general informational purposes only. 
                All information is provided in good faith, but we make no representation or warranty of any kind.
              </p>
            </div>
          </section>

          {/* Not a Government Website */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-rose-600" />
              </div>
              Not a Government Website
            </h2>
            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
              <p className="text-slate-700 font-bold mb-2">IMPORTANT:</p>
              <p className="text-slate-600">
                Vidy Educational Services is a private platform and is NOT affiliated with any government 
                organization or agency. We do not represent any government body and do not charge any fees 
                for our services.
              </p>
            </div>
          </section>

          {/* Job Information Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Job & Exam Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-black text-slate-900 mb-3">Regarding Job Notifications:</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <span>Job notifications are sourced from publicly available government websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <span>We recommend verifying all details on official websites before applying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <span>Dates and deadlines may change without notice</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* External Links */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-rose-600" />
              </div>
              External Links Disclaimer
            </h2>
            <p className="text-slate-600">
              Our platform may contain links to external websites that are not provided or maintained by us. 
              We do not guarantee the accuracy, relevance, or completeness of any information on these external websites.
            </p>
          </section>

          {/* No Guarantee */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">No Guarantee of Results</h2>
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
              <p className="text-slate-700">
                While we strive to provide accurate and helpful information, we do not guarantee that:
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  You will secure a job or exam success through our platform
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  All information is 100% accurate or up-to-date
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  The platform will be available without interruption
                </li>
              </ul>
            </div>
          </section>

          {/* Verification Notice */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">User Responsibility</h2>
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-indigo-900 font-bold mb-2">Your Responsibility:</p>
              <ul className="space-y-2 text-indigo-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  Verify all information on official websites
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  Check application deadlines independently
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  Read official notifications thoroughly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  Consult official sources for final decisions
                </li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-8 border-t border-slate-100">
            <p className="text-slate-500 text-sm">
              For any questions about this disclaimer, please contact us at{' '}
              <a href="mailto:disclaimer@vidy.edu.in" className="text-indigo-600 font-bold hover:underline">
                disclaimer@vidy.edu.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;