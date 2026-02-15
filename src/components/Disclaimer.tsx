import React from 'react';
import { AlertTriangle, Shield, ExternalLink, Info, CheckCircle, XCircle, Sparkles, Heart, Award, Scale, BookOpen, Users, Globe, ChevronRight } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-16 sm:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest mb-8 shadow-lg shadow-rose-500/30">
          <AlertTriangle className="w-4 h-4" />
          Important Notice
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          <span className="relative">
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Disclaimer
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 rounded-full"></div>
          </span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Please read this disclaimer carefully before using our services
        </p>
      </div>

      {/* Content */}
      <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl hover:shadow-3xl hover:shadow-rose-500/10 transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="p-8 sm:p-16 space-y-12 relative">
          
          {/* General Disclaimer - Enhanced */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="group/card relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-200 hover:border-amber-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-4 relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover/card:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-amber-800 mb-2 text-lg">General Information</h3>
                  <p className="text-amber-700 font-medium leading-relaxed">
                    The information provided on this platform is for general informational purposes only. 
                    All information is provided in good faith, but we make no representation or warranty of any kind.
                  </p>
                </div>
              </div>
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-r-[32px] border-t-transparent border-r-amber-500/20 group-hover/card:border-r-amber-500/40 transition-all duration-500"></div>
              </div>
            </div>
          </section>

          {/* Not a Government Website - Enhanced */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
              Not a Government Website
            </h2>
            <div className="relative pl-16">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur-xl opacity-10"></div>
              <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl border border-rose-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rose-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-rose-700 font-black text-lg">!</span>
                  </div>
                  <div>
                    <p className="text-rose-800 font-bold mb-2">IMPORTANT:</p>
                    <p className="text-rose-700">
                      Vidy Educational Services is a private platform and is NOT affiliated with any government 
                      organization or agency. We do not represent any government body and do not charge any fees 
                      for our services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Job Information Disclaimer - Enhanced */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Job & Exam Information</h2>
            <div className="grid grid-cols-1 gap-4 pl-16">
              <div className="group/card relative bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                  Regarding Job Notifications:
                </h3>
                <ul className="space-y-3 text-slate-600">
                  {[
                    'Job notifications are sourced from publicly available government websites',
                    'We recommend verifying all details on official websites before applying',
                    'Dates and deadlines may change without notice',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 group/item">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-indigo-200 transition-colors">
                        <span className="text-indigo-600 text-xs font-black">{index + 1}</span>
                      </div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* External Links - Enhanced */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
              External Links Disclaimer
            </h2>
            <div className="pl-16">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-slate-600 flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span>
                    Our platform may contain links to external websites that are not provided or maintained by us. 
                    We do not guarantee the accuracy, relevance, or completeness of any information on these external websites.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* No Guarantee - Enhanced */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">No Guarantee of Results</h2>
            <div className="pl-16">
              <div className="group/card relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                <p className="text-slate-700 font-bold mb-4">While we strive to provide accurate information, we do not guarantee that:</p>
                <ul className="space-y-3">
                  {[
                    'You will secure a job or exam success through our platform',
                    'All information is 100% accurate or up-to-date',
                    'The platform will be available without interruption',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 group/item">
                      <XCircle className="w-5 h-5 text-rose-500 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Verification Notice - Enhanced */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">User Responsibility</h2>
            <div className="pl-16">
              <div className="group/card relative bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                <p className="text-emerald-800 font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Your Responsibility:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Verify all information on official websites',
                    'Check application deadlines independently',
                    'Read official notifications thoroughly',
                    'Consult official sources for final decisions',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-emerald-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Contact - Enhanced */}
          <section className="pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-900">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm">
                For any questions about this disclaimer, please contact us at{' '}
                <a 
                  href="mailto:disclaimer@vidy.edu.in" 
                  className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-700 transition-colors group/link"
                >
                  disclaimer@vidy.edu.in
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </p>
              <Heart className="w-5 h-5 text-rose-400" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;