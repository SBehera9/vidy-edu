import React from 'react';
import { Shield, Lock, Eye, Database, Mail, Phone, Clock, CheckCircle, XCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="text-center mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6">
          <Shield className="w-4 h-4" />
          Legal & Compliance
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Privacy <span className="text-indigo-600">Policy</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Last Updated: March 15, 2026 • Version 2.0
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 sm:p-16 space-y-12">
          
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-indigo-600" />
              </div>
              Our Commitment to Privacy
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              At Vidy Educational Services, we take your privacy seriously. This policy describes how we collect, 
              use, and protect your personal information when you use our platform. We are committed to ensuring 
              that your privacy is protected and that we comply with all applicable data protection laws in India.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-600" />
              </div>
              Information We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Information You Provide
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Name and contact information</li>
                  <li>• Email address</li>
                  <li>• Phone number</li>
                  <li>• Educational queries</li>
                  <li>• Communication preferences</li>
                </ul>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  Information We DON'T Collect
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Financial information</li>
                  <li>• Government ID numbers</li>
                  <li>• Precise location data</li>
                  <li>• Biometric data</li>
                  <li>• Sensitive personal data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How We Use Your Information</h2>
            <div className="bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100">
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <span><strong className="text-slate-900">To respond to your queries:</strong> We use your contact information to answer your questions and provide support.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <span><strong className="text-slate-900">To improve our services:</strong> We analyze usage patterns to enhance your experience.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <span><strong className="text-slate-900">To send updates:</strong> With your consent, we may send educational news and job alerts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <span><strong className="text-slate-900">To comply with legal obligations:</strong> When required by law or government authorities.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-indigo-600" />
              </div>
              Data Protection Measures
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                <span className="text-2xl font-black text-emerald-600 block mb-2">256-bit</span>
                <span className="text-sm text-slate-600">Encryption</span>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <span className="text-2xl font-black text-blue-600 block mb-2">24/7</span>
                <span className="text-sm text-slate-600">Monitoring</span>
              </div>
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                <span className="text-2xl font-black text-amber-600 block mb-2">ISO</span>
                <span className="text-sm text-slate-600">27001 Certified</span>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-4 pt-8 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Privacy Questions?</h2>
            <p className="text-slate-600">
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-600" />
                <a href="mailto:privacy@vidy.edu.in" className="text-indigo-600 hover:underline">privacy@vidy.edu.in</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-600" />
                <span>+91 98765 43210 (Mon-Fri, 9AM-6PM)</span>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest pt-8 border-t border-slate-100">
            © 2026 Vidy Educational Services • All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;