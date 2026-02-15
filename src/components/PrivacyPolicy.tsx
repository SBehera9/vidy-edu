import React from 'react';
import { Shield, Lock, Eye, Database, Mail, Phone, Clock, CheckCircle, XCircle, Sparkles, Heart, Award, FileText, Globe, Users, BookOpen, ChevronRight } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-16 sm:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest mb-8 shadow-lg shadow-indigo-500/30">
          <Shield className="w-4 h-4" />
          Legal & Compliance
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Privacy{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Policy
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
          </span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Last Updated: March 15, 2026 • Version 2.0
        </p>
      </div>

      {/* Content */}
      <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl hover:shadow-3xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="p-8 sm:p-16 space-y-12 relative">
          
          {/* Introduction */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
              Our Commitment to Privacy
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed pl-16">
              At Vidy Educational Services, we take your privacy seriously. This policy describes how we collect, 
              use, and protect your personal information when you use our platform. We are committed to ensuring 
              that your privacy is protected and that we comply with all applicable data protection laws in India.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
              </div>
              Information We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-16">
              <div className="group/card relative bg-white p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Information You Provide
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    Name and contact information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    Email address
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    Phone number
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    Educational queries
                  </li>
                </ul>
              </div>
              <div className="group/card relative bg-white p-6 rounded-2xl border border-slate-100 hover:border-rose-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  We DON'T Collect
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                    Financial information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                    Government ID numbers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                    Precise location data
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                    Biometric data
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How We Use Your Information</h2>
            <div className="relative pl-16">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-10"></div>
              <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
                <ul className="space-y-4 text-slate-700">
                  {[
                    { num: 1, title: 'To respond to your queries', desc: 'We use your contact information to answer your questions and provide support.', color: 'from-indigo-500 to-purple-500' },
                    { num: 2, title: 'To improve our services', desc: 'We analyze usage patterns to enhance your experience.', color: 'from-emerald-500 to-teal-500' },
                    { num: 3, title: 'To send updates', desc: 'With your consent, we may send educational news and job alerts.', color: 'from-amber-500 to-orange-500' },
                    { num: 4, title: 'To comply with legal obligations', desc: 'When required by law or government authorities.', color: 'from-rose-500 to-pink-500' },
                  ].map((item) => (
                    <li key={item.num} className="flex items-start gap-3 group/item">
                      <span className={`w-8 h-8 bg-gradient-to-r ${item.color} text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300`}>
                        {item.num}
                      </span>
                      <div>
                        <strong className="text-slate-900">{item.title}:</strong>
                        <span className="text-slate-600 ml-2">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              </div>
              Data Protection Measures
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-16">
              {[
                { value: '256-bit', label: 'Encryption', color: 'from-emerald-500 to-teal-500' },
                { value: '24/7', label: 'Monitoring', color: 'from-blue-500 to-cyan-500' },
                { value: 'ISO', label: '27001 Certified', color: 'from-amber-500 to-orange-500' },
              ].map((item, index) => (
                <div key={index} className="group/card relative bg-white p-6 rounded-2xl border border-slate-100 hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-xl text-center overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover/card:opacity-10 transition-opacity duration-500`}></div>
                  <span className={`text-2xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent block mb-2`}>
                    {item.value}
                  </span>
                  <span className="text-sm text-slate-600">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-4 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Privacy Questions?</h2>
            <p className="text-slate-600 pl-16">
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer:
            </p>
            <div className="pl-16">
              <div className="group/contact relative bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover/contact:opacity-100 transition-opacity duration-500"></div>
                <div className="space-y-3 relative">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <a href="mailto:privacy@vidy.edu.in" className="text-indigo-600 font-bold hover:underline">
                      privacy@vidy.edu.in
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-600">+91 98765 43210 (Mon-Fri, 9AM-6PM)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest pt-8 border-t border-slate-100 flex items-center justify-between">
            <span>© 2026 Vidy Educational Services • All rights reserved</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;