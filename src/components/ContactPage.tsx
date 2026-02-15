import React, { useState } from 'react';
import { 
  MessageSquare, Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  MessageCircle, ShieldCheck, User, HelpCircle, Globe, Facebook, 
  Twitter, Linkedin, Youtube, Instagram 
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
    { name: 'Academic Counseling', email: 'academics@vidy.edu.in', phone: '+91 98765 43211' },
    { name: 'Technical Support', email: 'tech@vidy.edu.in', phone: '+91 98765 43212' },
    { name: 'Career Guidance', email: 'career@vidy.edu.in', phone: '+91 98765 43213' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="text-center mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6">
          <MessageSquare className="w-4 h-4" />
          Get in Touch
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Contact <span className="text-indigo-600">Support</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          We're here to help you with any questions about our services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Contact Cards */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
            <h3 className="text-xl font-black text-slate-900 mb-6">Quick Connect</h3>
            
            <div className="space-y-6">
              <a href="mailto:support@vidy.edu.in" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Mail className="w-5 h-5 text-indigo-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="font-bold text-slate-900">support@vidy.edu.in</p>
                </div>
              </a>

              <a href="tel:+919876543210" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                  <p className="font-bold text-slate-900">+91 98765 43210</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Hours</p>
                  <p className="font-bold text-slate-900">Mon-Sat, 9AM-6PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Office</p>
                  <p className="font-bold text-slate-900">Sector 62, Noida</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-[#25D366]/10 p-8 rounded-[2rem] border border-[#25D366]/20">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 fill-[#25D366] text-[#25D366]" />
              <h3 className="font-black text-slate-900">WhatsApp Support</h3>
            </div>
            <p className="text-slate-600 text-sm mb-6">
              Get instant help on WhatsApp. Our counselors typically respond within minutes.
            </p>
            <button
              onClick={handleWhatsApp}
              className="w-full py-4 bg-[#25D366] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Start WhatsApp Chat
            </button>
          </div>

          {/* Social Links */}
          <div className="bg-slate-50 p-8 rounded-[2rem]">
            <h3 className="font-black text-slate-900 mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-blue-600 group transition-colors">
                <Facebook className="w-5 h-5 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-sky-500 group transition-colors">
                <Twitter className="w-5 h-5 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-blue-700 group transition-colors">
                <Linkedin className="w-5 h-5 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-red-600 group transition-colors">
                <Youtube className="w-5 h-5 text-slate-600 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 sm:p-12">
              {isSuccess ? (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-8">
                    We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none font-bold transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none font-bold transition-all"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none font-bold transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                        Your Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.query}
                        onChange={(e) => setFormData({...formData, query: e.target.value})}
                        className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none font-bold transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-8 flex items-center gap-2 text-[8px] text-slate-400 font-black uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" />
                    Your information is secure and encrypted
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Support Team Section */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {supportTeam.map((member, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-xl text-center">
                <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                  {member.name}
                </p>
                <a href={`mailto:${member.email}`} className="text-xs font-bold text-slate-900 hover:text-indigo-600 block mb-1">
                  {member.email}
                </a>
                <p className="text-[8px] text-slate-400">{member.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;