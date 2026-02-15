import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Mail, MessageCircle, Phone, BookOpen, Briefcase, FileText, Shield } from 'lucide-react';

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
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General', icon: Shield },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'syllabus', label: 'Syllabus', icon: FileText },
    { id: 'technical', label: 'Technical', icon: BookOpen },
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
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="text-center mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6">
          <HelpCircle className="w-4 h-4" />
          Help Center
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Frequently Asked <span className="text-indigo-600">Questions</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Find answers to common questions about Vidy and our services
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-12">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search your question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none font-medium transition-all"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-indigo-100 transition-all"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors pr-8">
                  {item.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {item.answer}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      Category: {item.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No questions found matching your search.</p>
          </div>
        )}
      </div>

      {/* Still Have Questions */}
      <div className="mt-16 p-8 sm:p-12 bg-indigo-50 rounded-[2rem] border border-indigo-100 text-center">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">Still Have Questions?</h3>
        <p className="text-slate-600 mb-8 max-w-lg mx-auto">
          Can't find the answer you're looking for? Please reach out to our support team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@vidy.edu.in"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all"
          >
            <Mail className="w-4 h-4" />
            Email Support
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#128C7E] transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;