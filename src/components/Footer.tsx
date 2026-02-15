import React from 'react';
import { 
  Zap, Mail, Phone, MapPin, Clock, Facebook, Twitter, 
  Linkedin, Youtube, Instagram, ChevronRight, Shield, 
  FileText, HelpCircle, MessageSquare, Scale, Lock,
  Heart, Globe, BookOpen, Sparkles, Award, GraduationCap, Briefcase
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', icon: Zap, section: 'home', color: 'from-indigo-500 to-purple-500' },
    { name: 'Jobs', icon: Briefcase, section: 'jobs', color: 'from-blue-500 to-cyan-500' },
    { name: 'Syllabus', icon: FileText, section: 'syllabus', color: 'from-amber-500 to-orange-500' },
    { name: 'Research', icon: Globe, section: 'search', color: 'from-emerald-500 to-teal-500' },
    { name: 'News', icon: MessageSquare, section: 'news', color: 'from-rose-500 to-pink-500' },
  ];

  const policyLinks = [
    { name: 'Privacy Policy', icon: Lock, section: 'privacy', color: 'from-indigo-500 to-purple-500' },
    { name: 'Terms of Use', icon: Scale, section: 'terms', color: 'from-amber-500 to-orange-500' },
    { name: 'Disclaimer', icon: Shield, section: 'disclaimer', color: 'from-rose-500 to-pink-500' },
    { name: 'FAQ', icon: HelpCircle, section: 'faq', color: 'from-emerald-500 to-teal-500' },
    { name: 'Contact Us', icon: MessageSquare, section: 'contact_page', color: 'from-blue-500 to-cyan-500' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, link: 'https://facebook.com/vidyportal', color: 'hover:bg-[#1877F2]', bg: 'from-[#1877F2] to-[#0E5A9E]' },
    { name: 'Twitter', icon: Twitter, link: 'https://twitter.com/vidyportal', color: 'hover:bg-[#1DA1F2]', bg: 'from-[#1DA1F2] to-[#0C7ABF]' },
    { name: 'LinkedIn', icon: Linkedin, link: 'https://linkedin.com/company/vidyportal', color: 'hover:bg-[#0A66C2]', bg: 'from-[#0A66C2] to-[#004182]' },
    { name: 'YouTube', icon: Youtube, link: 'https://youtube.com/@vidyportal', color: 'hover:bg-[#FF0000]', bg: 'from-[#FF0000] to-[#CC0000]' },
    { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/vidyportal', color: 'hover:bg-[#E4405F]', bg: 'from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  ];

  const handleClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Top Section with Gradient Border */}
        <div className="relative mb-16 sm:mb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] blur-xl opacity-20"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-[3rem] p-8 sm:p-12 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Brand Column - Enhanced */}
              <div className="lg:col-span-4 space-y-6">
                <div 
                  className="flex items-center gap-3 group cursor-pointer" 
                  onClick={() => handleClick('home')}
                >
                  <div className="relative w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-[-8deg] group-hover:scale-110 transition-all duration-700 shadow-2xl shadow-indigo-500/30">
                    <Zap className="text-white w-7 h-7 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                  </div>
                  <div>
                    <span className="font-black text-3xl tracking-tighter bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                      Vidy
                    </span>
                    <span className="block text-[8px] font-bold text-indigo-300 uppercase tracking-widest">Educational Services</span>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  India's #1 free educational portal empowering students with 
                  real-time job alerts, official syllabus, and AI-powered research tools.
                </p>
                
                {/* Trust Badges - Enhanced */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">Trusted by</span>
                      <span className="text-sm font-bold text-white">10L+ Students</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-800 group-hover:border-indigo-500/50 transition-colors">
                      <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">Verified by</span>
                      <span className="text-sm font-bold text-white">Govt. Sources</span>
                    </div>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>ISO 27001 Certified • 100% Free Platform</span>
                </div>
              </div>

              {/* Quick Access Links - Enhanced */}
              <div className="lg:col-span-2">
                <h4 className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Quick Access
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleClick(link.section)}
                        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 w-full"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${link.color} opacity-20 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                          <link.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ml-auto" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Policies & Legal - Enhanced */}
              <div className="lg:col-span-2">
                <h4 className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Shield className="w-3 h-3 text-amber-400" />
                  Policies
                </h4>
                <ul className="space-y-3">
                  {policyLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleClick(link.section)}
                        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 w-full"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${link.color} opacity-20 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                          <link.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information - Enhanced with Bhubaneswar Address */}
              <div className="lg:col-span-4">
                <h4 className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Phone className="w-3 h-3 text-rose-400" />
                  Contact Us
                </h4>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-indigo-500/20">
                        <Mail className="w-5 h-5 text-indigo-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Email Support</p>
                      <a 
                        href="mailto:support@vidy.edu.in" 
                        className="text-sm font-bold text-white hover:text-indigo-400 transition-colors group-hover:underline"
                      >
                        support@vidy.edu.in
                      </a>
                      <p className="text-[10px] text-slate-500 mt-1">24/7 Response within 24h</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
                        <Phone className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-1">Helpline</p>
                      <a 
                        href="tel:+919876543210" 
                        className="text-sm font-bold text-white hover:text-emerald-400 transition-colors group-hover:underline"
                      >
                        +91 98765 43210
                      </a>
                      <p className="text-[10px] text-slate-500 mt-1">Mon-Sat, 9AM - 6PM IST</p>
                    </div>
                  </div>

                  {/* Address - Bhubaneswar */}
                  <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative w-12 h-12 bg-rose-600/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-rose-500/20">
                        <MapPin className="w-5 h-5 text-rose-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-rose-400 uppercase tracking-widest mb-1">Registered Office</p>
                      <p className="text-sm font-bold text-white leading-relaxed">
                        Vidy Educational Services
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Plot No. 123, Infocity Area<br />
                        Chandaka, Bhubaneswar<br />
                        Odisha, India - 751024
                      </p>
                      <p className="text-[8px] text-slate-500 mt-2 uppercase tracking-wider">📍 Landmark: Near Infocity Square</p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative w-12 h-12 bg-amber-600/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-amber-500/20">
                        <Clock className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-amber-400 uppercase tracking-widest mb-1">Working Hours</p>
                      <p className="text-sm font-bold text-white">Monday - Saturday</p>
                      <p className="text-xs text-slate-300">9:00 AM - 6:00 PM IST</p>
                      <p className="text-[8px] text-emerald-400 mt-1">✅ Sunday Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links - Enhanced without Newsletter */}
        <div className="mb-12">
          <div className="flex flex-col items-center text-center">
            <h4 className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Heart className="w-3 h-3 text-rose-400" />
              Connect With Us
            </h4>
            
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.bg} rounded-2xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  <div className={`relative w-14 h-14 bg-slate-900/80 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 border border-slate-800 group-hover:border-transparent ${social.color}`}>
                    <social.icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[8px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest text-center md:text-left">
              © {currentYear} VIDY PROFESSIONAL EDUCATIONAL SERVICES. ALL RIGHTS RESERVED.
            </p>
          
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button 
                onClick={() => handleClick('privacy')}
                className="group relative text-[8px] text-slate-500 hover:text-white font-black uppercase tracking-widest transition-all duration-300 px-3 py-1"
              >
                <span className="relative z-10">Privacy</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              </button>
              <span className="text-slate-700 text-[8px]">•</span>
              <button 
                onClick={() => handleClick('terms')}
                className="group relative text-[8px] text-slate-500 hover:text-white font-black uppercase tracking-widest transition-all duration-300 px-3 py-1"
              >
                <span className="relative z-10">Terms</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              </button>
              <span className="text-slate-700 text-[8px]">•</span>
              <button 
                onClick={() => handleClick('disclaimer')}
                className="group relative text-[8px] text-slate-500 hover:text-white font-black uppercase tracking-widest transition-all duration-300 px-3 py-1"
              >
                <span className="relative z-10">Disclaimer</span>
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              </button>
              <span className="text-slate-700 text-[8px]">•</span>
              <div className="flex items-center gap-1 text-[8px] text-slate-600 group cursor-default">
                <Heart className="w-3 h-3 text-rose-500 group-hover:scale-125 transition-transform duration-300" />
                <span>Made with ❤️ for Students</span>
              </div>
            </div>
          </div>
          
          {/* Bhubaneswar Tagline */}
          <div className="mt-6 text-center">
            <p className="text-[8px] text-slate-700 uppercase tracking-[0.5em]">
              🌺 सेवा • शिक्षा • संस्कार • भुवनेश्वर 🌺
            </p>
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
    </footer>
  );
};

export default Footer;