import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Mail, MessageCircle, Phone, BookOpen, Briefcase, FileText, Shield, Sparkles, Award, GraduationCap, Users, Globe, Star, ChevronRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'jobs' | 'syllabus' | 'account' | 'technical';
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      category: 'general',
      question: 'Is Vidy really free?',
      answer: 'Yes, Vidy is completely free for all students. We do not charge any fees for accessing job notifications, syllabus, research tools, or news. Our mission is to make quality educational resources accessible to every student in India.'
    },
    {
      category: 'general',
      question: 'Do I need to create an account?',
      answer: 'No, you do not need to create an account. All features of Vidy are accessible without registration. You can browse jobs, download syllabus, use research tools, and read news anonymously.'
    },
    {
      category: 'jobs',
      question: 'How accurate is the job data?',
      answer: 'We source job notifications directly from official government websites including SSC, UPSC, RRB, IBPS, and state government portals. We verify each notification before posting. However, we recommend checking the official website for the most up-to-date information.'
    },
    {
      category: 'jobs',
      question: 'How often are jobs updated?',
      answer: 'Our job feed updates automatically every 6 hours. You can also click the "Sync Now" button to manually refresh and get the latest notifications instantly.'
    },
    {
      category: 'jobs',
      question: 'Are these jobs only for government positions?',
      answer: 'We focus primarily on government jobs, but we also include notifications from public sector undertakings (PSUs) and other verified educational institutions. All jobs listed are from official sources.'
    },
    {
      category: 'syllabus',
      question: 'Where do you get the syllabus from?',
      answer: 'Our syllabus section provides direct links to official sources like CBSE, ICSE, State Boards, UGC, AICTE, and various universities. We always link to the official websites to ensure you get the most current syllabus.'
    },
    {
      category: 'syllabus',
      question: 'Can I download syllabus PDFs?',
      answer: 'Yes, our syllabus section provides download links to official PDFs. Simply click on the "Download" button next to any syllabus item to access the official document.'
    },
    {
      category: 'technical',
      question: 'Why is the search not working?',
      answer: 'Our research lab uses Wikipedia and DuckDuckGo for searches. If search is not working, please check your internet connection. If the problem persists, try refreshing the page or contact our support team.'
    },
    {
      category: 'technical',
      question: 'Is my data safe?',
      answer: 'We take your privacy seriously. We do not store any personal information. All searches are anonymous, and we do not use tracking cookies. Our platform is secured with 256-bit encryption.'
    },
    {
      category: 'account',
      question: 'How can I contact support?',
      answer: 'You can reach our support team via email at support@vidy.edu.in, WhatsApp at +91 98765 43210, or use the contact form in the Help Desk sidebar. We typically respond within 24 hours.'
    },
    {
      category: 'account',
      question: 'Do you have a mobile app?',
      answer: 'Currently, Vidy is available as a web application that works perfectly on all devices including mobile phones. We are working on a dedicated mobile app that will be released soon.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle, color: 'from-indigo-500 to-purple-500' },
    { id: 'general', label: 'General', icon: Shield, color: 'from-emerald-500 to-teal-500' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { id: 'syllabus', label: 'Syllabus', icon: FileText, color: 'from-amber-500 to-orange-500' },
    { id: 'technical', label: 'Technical', icon: BookOpen, color: 'from-rose-500 to-pink-500' },
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <HelpCircle className="w-4 h-4" />
          Help Center
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Frequently Asked{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Questions
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
          </span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Find answers to common questions about Vidy and our services
        </p>
      </div>

      {/* Search Bar - Enhanced */}
      <div className="relative mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-20"></div>
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Search your question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-6 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 outline-none font-medium transition-all text-lg"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filters - Enhanced */}
      <div className="flex flex-wrap gap-3 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`group relative px-6 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all duration-500 overflow-hidden ${
              selectedCategory === cat.id
                ? 'text-white shadow-lg scale-105'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {selectedCategory === cat.id && (
              <div className={`absolute inset-0 bg-gradient-to-r ${cat.color}`}></div>
            )}
            <span className="relative z-10 flex items-center gap-2">
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* FAQ Items - Enhanced */}
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((item, index) => {
            const category = categories.find(c => c.id === item.category);
            return (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 rounded-2xl overflow-hidden hover:border-indigo-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category?.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group/btn"
                >
                  <div className="flex items-center gap-4 pr-8">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${category?.color} flex items-center justify-center opacity-80 group-hover/btn:scale-110 transition-transform duration-500`}>
                        {category && <category.icon className="w-5 h-5 text-white" />}
                      </div>
                    <span className="font-bold text-slate-900 group-hover/btn:text-indigo-600 transition-colors text-lg">
                      {item.question}
                    </span>
                  </div>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover/btn:text-indigo-600 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-8 pb-6 pl-20 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="mb-4">{item.answer}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        Category:
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black bg-gradient-to-r ${category?.color} text-white`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-12 h-12">
                  <div className={`absolute top-0 right-0 w-0 h-0 border-t-[24px] border-r-[24px] border-t-transparent border-r-indigo-600/20 group-hover:border-r-indigo-600/40 transition-all duration-500`}></div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-100">
            <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No questions found matching your search.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 px-6 py-3 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Still Have Questions - Enhanced */}
      <div className="mt-16 p-8 sm:p-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-[2rem] border border-indigo-100 text-center relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative">
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Still Have Questions?</h3>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@vidy.edu.in"
              className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Support
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            </a>
            
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-white" />
                WhatsApp
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#128C7E] to-[#075E54] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;