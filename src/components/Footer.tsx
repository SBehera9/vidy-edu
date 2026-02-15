import React from 'react';
import { 
  Zap, Mail, Phone, MapPin, Clock, Facebook, Twitter, 
  Linkedin, Youtube, Instagram, ChevronRight, Shield, 
  FileText, HelpCircle, MessageSquare, Scale, Lock,
  ExternalLink, Heart, Globe, BookOpen
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', icon: Zap, section: 'home' },
    { name: 'Jobs', icon: BookOpen, section: 'jobs' },
    { name: 'Syllabus', icon: FileText, section: 'syllabus' },
    { name: 'Research', icon: Globe, section: 'search' },
    { name: 'News', icon: MessageSquare, section: 'news' },
  ];

  const policyLinks = [
    { name: 'Privacy Policy', icon: Lock, section: 'privacy' },
    { name: 'Terms of Use', icon: Scale, section: 'terms' },
    { name: 'Disclaimer', icon: Shield, section: 'disclaimer' },
    { name: 'FAQ', icon: HelpCircle, section: 'faq' },
    { name: 'Contact Us', icon: MessageSquare, section: 'contact_page' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, link: 'https://facebook.com/vidyportal', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: Twitter, link: 'https://twitter.com/vidyportal', color: 'hover:bg-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, link: 'https://linkedin.com/company/vidyportal', color: 'hover:bg-blue-700' },
    { name: 'YouTube', icon: Youtube, link: 'https://youtube.com/@vidyportal', color: 'hover:bg-red-600' },
    { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/vidyportal', color: 'hover:bg-pink-600' },
  ];

  const handleClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 sm:mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleClick('home')}>
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-[-8deg] transition-all duration-500">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-3xl tracking-tighter bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                Vidy
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              India's #1 free educational portal for students. Real-time job alerts, 
              official syllabus, and AI-powered research tools.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest block">Trusted by</span>
                <span className="text-sm font-bold text-white">10L+ Students</span>
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest block">Verified by</span>
                <span className="text-sm font-bold text-white">Govt. Sources</span>
              </div>
            </div>
          </div>

          {/* Quick Access Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6">
              Quick Access
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleClick(link.section)}
                    className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <link.icon className="w-4 h-4 text-indigo-500 group-hover:text-indigo-400" />
                    <span className="text-sm font-bold">{link.name}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6">
              Policies
            </h4>
            <ul className="space-y-4">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleClick(link.section)}
                    className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <link.icon className="w-4 h-4 text-indigo-500 group-hover:text-indigo-400" />
                    <span className="text-sm font-bold">{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6">
              Contact Us
            </h4>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center group-hover:bg-indigo-600/20 transition-colors">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    Email Support
                  </p>
                  <a 
                    href="mailto:support@vidy.edu.in" 
                    className="text-sm font-bold text-white hover:text-indigo-400 transition-colors"
                  >
                    support@vidy.edu.in
                  </a>
                  <p className="text-[10px] text-slate-600 mt-1">24/7 Response within 24h</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-emerald-600/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-600/20 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    Helpline
                  </p>
                  <a 
                    href="tel:+919876543210" 
                    className="text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    +91 98765 43210
                  </a>
                  <p className="text-[10px] text-slate-600 mt-1">Mon-Sat, 9AM - 6PM IST</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-rose-600/10 rounded-xl flex items-center justify-center group-hover:bg-rose-600/20 transition-colors">
                  <MapPin className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    Office
                  </p>
                  <p className="text-sm font-bold text-white">
                    Vidy Educational Services
                  </p>
                  <p className="text-xs text-slate-400">
                    Sector 62, Noida<br />
                    Uttar Pradesh, India - 201309
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-amber-600/10 rounded-xl flex items-center justify-center group-hover:bg-amber-600/20 transition-colors">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    Working Hours
                  </p>
                  <p className="text-sm font-bold text-white">
                    Monday - Saturday
                  </p>
                  <p className="text-xs text-slate-400">
                    9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Social Links */}
          <div>
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 ${social.color} group`}
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">
              Stay Updated
            </h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-[8px] text-slate-600 mt-3">
              Get latest updates on jobs, exams, and education news. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest">
            © {currentYear} VIDY PROFESSIONAL EDUCATIONAL SERVICES. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleClick('privacy')}
              className="text-[8px] text-slate-600 hover:text-white font-black uppercase tracking-widest transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => handleClick('terms')}
              className="text-[8px] text-slate-600 hover:text-white font-black uppercase tracking-widest transition-colors"
            >
              Terms
            </button>
            <button 
              onClick={() => handleClick('disclaimer')}
              className="text-[8px] text-slate-600 hover:text-white font-black uppercase tracking-widest transition-colors"
            >
              Disclaimer
            </button>
            <div className="flex items-center gap-1 text-[8px] text-slate-700">
              <Heart className="w-3 h-3 text-rose-500" />
              <span>Made for Students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;