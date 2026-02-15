import React, { useState } from 'react';
import { 
  MessageSquare, Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  MessageCircle, ShieldCheck, User, HelpCircle, Globe, Facebook, 
  Twitter, Linkedin, Youtube, Instagram, Sparkles, Heart, Star,
  ArrowRight, ChevronRight, Award, GraduationCap, BookOpen, Zap
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    query: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', phone: '', email: '', query: '' });
      }, 4000);
    }, 1800);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello Vidy Team, I need assistance with:");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const supportTeam = [
    { name: 'Academic Counseling', email: 'academics@vidy.edu.in', phone: '+91 98765 43211', icon: GraduationCap, color: 'from-indigo-500 to-purple-500' },
    { name: 'Technical Support', email: 'tech@vidy.edu.in', phone: '+91 98765 43212', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
    { name: 'Career Guidance', email: 'career@vidy.edu.in', phone: '+91 98765 43213', icon: Award, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-16 sm:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest mb-8 shadow-lg shadow-indigo-500/30">
          <MessageSquare className="w-4 h-4" />
          Get in Touch
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Contact{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Support
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
          </span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          We're here to help you with any questions about our services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Contact Cards - Enhanced */}
          <div className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Quick Connect
            </h3>
            
            <div className="space-y-6">
              <a href="mailto:support@vidy.edu.in" className="flex items-center gap-4 group/item">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover/item:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-all duration-500">
                    <Mail className="w-6 h-6 text-indigo-600 group-hover/item:text-white transition-colors duration-500" />
                  </div>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="font-bold text-slate-900 group-hover/item:text-indigo-600 transition-colors">support@vidy.edu.in</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all duration-500 ml-auto" />
              </a>

              <a href="tel:+919876543210" className="flex items-center gap-4 group/item">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover/item:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-all duration-500">
                    <Phone className="w-6 h-6 text-emerald-600 group-hover/item:text-white transition-colors duration-500" />
                  </div>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                  <p className="font-bold text-slate-900 group-hover/item:text-emerald-600 transition-colors">+91 98765 43210</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all duration-500 ml-auto" />
              </a>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Hours</p>
                  <p className="font-bold text-slate-900">Mon-Sat, 9AM-6PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Office</p>
                  <p className="font-bold text-slate-900">Infocity, Bhubaneswar</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Card - Enhanced */}
          <div className="group relative bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 p-8 rounded-[2rem] border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#25D366] rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <MessageCircle className="relative w-8 h-8 fill-[#25D366] text-[#25D366] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-black text-slate-900">WhatsApp Support</h3>
            </div>
            
            <p className="text-slate-600 text-sm mb-6">
              Get instant help on WhatsApp. Our counselors typically respond within minutes.
            </p>
            
            <button
              onClick={handleWhatsApp}
              className="relative w-full py-5 bg-[#25D366] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#128C7E] transition-all duration-500 overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4 fill-white" />
                Start WhatsApp Chat
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0%,transparent_50%)] opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Social Links - Enhanced */}
          <div className="group relative bg-gradient-to-br from-slate-50 to-white p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Follow Us
            </h3>
            <div className="flex gap-3">
              {[
                { icon: Facebook, color: 'hover:bg-[#1877F2]', bg: 'from-[#1877F2] to-[#0E5A9E]' },
                { icon: Twitter, color: 'hover:bg-[#1DA1F2]', bg: 'from-[#1DA1F2] to-[#0C7ABF]' },
                { icon: Linkedin, color: 'hover:bg-[#0A66C2]', bg: 'from-[#0A66C2] to-[#004182]' },
                { icon: Youtube, color: 'hover:bg-[#FF0000]', bg: 'from-[#FF0000] to-[#CC0000]' },
                { icon: Instagram, color: 'hover:bg-[#E4405F]', bg: 'from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="group/social relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.bg} rounded-xl blur opacity-0 group-hover/social:opacity-50 transition-opacity duration-500`}></div>
                  <div className={`relative w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 border border-slate-200 group-hover/social:border-transparent ${social.color}`}>
                    <social.icon className="w-5 h-5 text-slate-600 group-hover/social:text-white transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-2">
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="p-8 sm:p-12 relative">
              {isSuccess ? (
                <div className="py-16 flex flex-col items-center justify-center text-center animate-in scale-in duration-500">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2rem] blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-8">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="group/btn relative px-10 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Send Another Message
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="group/field">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold transition-all"
                            placeholder="John Doe"
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-focus-within/field:w-full transition-all duration-500"></div>
                        </div>
                      </div>

                      <div className="group/field">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/field:text-emerald-600 transition-colors" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold transition-all"
                            placeholder="+91 98765 43210"
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-focus-within/field:w-full transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>

                    <div className="group/field">
                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/field:text-purple-600 transition-colors" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 outline-none font-bold transition-all"
                          placeholder="john@example.com"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-focus-within/field:w-full transition-all duration-500"></div>
                      </div>
                    </div>

                    <div className="group/field">
                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          rows={5}
                          value={formData.query}
                          onChange={(e) => setFormData({...formData, query: e.target.value})}
                          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-pink-600 focus:ring-4 focus:ring-pink-500/10 outline-none font-bold transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-focus-within/field:w-full transition-all duration-500"></div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn relative w-full py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 overflow-hidden disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0%,transparent_50%)] opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500"></div>
                    </button>
                  </form>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[8px] text-slate-400 font-black uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Your information is secure and encrypted
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Support Team Section - Enhanced */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {supportTeam.map((member, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl border border-slate-100 hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <member.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                    {member.name}
                  </p>
                  
                  <a href={`mailto:${member.email}`} className="text-xs font-bold text-slate-900 hover:text-indigo-600 block mb-1 transition-colors">
                    {member.email}
                  </a>
                  
                  <p className="text-[8px] text-slate-400">{member.phone}</p>
                </div>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-r-[24px] border-t-transparent border-r-indigo-600/20 group-hover:border-r-indigo-600/40 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;