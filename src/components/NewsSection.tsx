import React, { useEffect, useState } from 'react';
import { fetchEducationalNews } from '../services/eduService';
import { NewsItem } from '../types';
import { 
  ArrowUpRight, Newspaper, Zap, RefreshCw, Clock, Filter, 
  Star, TrendingUp, School, GraduationCap, Award, Cpu, Globe,
  Home, BookOpen, Building2, Mic
} from 'lucide-react';

const NEWS_FILTERS = [
  { id: 'all', label: 'All News', icon: Newspaper, color: 'indigo' },
  { id: 'all-india', label: 'All India News', icon: Globe, color: 'emerald' },
  { id: 'state-wise', label: 'State-wise News', icon: Home, color: 'amber' },
  { id: 'educational', label: 'Educational News', icon: BookOpen, color: 'blue' },
  { id: 'politics', label: 'Politics News', icon: Building2, color: 'rose' },
  { id: 'general', label: 'General News', icon: Mic, color: 'purple' },
];

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock news data
  const mockNews: NewsItem[] = [
    // All India News
    {
      id: '1',
      title: "CBSE Board Exams 2026: Date Sheet Released for Class 10 and 12",
      source: "CBSE Official",
      date: "Mar 15, 2026",
      link: "http://cbseacademic.nic.in",
      snippet: "CBSE has released the date sheet for Class 10 and 12 board examinations 2026. Exams to start from May 1.",
      category: "educational",
      postedDate: "2026-03-15",
      isNew: true,
      filterType: 'all-india'
    },
    {
      id: '2',
      title: "JEE Main 2026 Session 2 Registration Begins",
      source: "NTA",
      date: "Mar 10, 2026",
      link: "https://jeemain.nta.nic.in",
      snippet: "Online registration for JEE Main 2026 session 2 has started. Last date to apply is March 30.",
      category: "educational",
      postedDate: "2026-03-10",
      isNew: true,
      filterType: 'all-india'
    },
    {
      id: '3',
      title: "UPSC Civil Services 2026 Notification Released with 1200 Vacancies",
      source: "UPSC",
      date: "Feb 28, 2026",
      link: "https://upsc.gov.in",
      snippet: "UPSC has released 1200 vacancies for Civil Services Examination 2026. Apply by March 20.",
      category: "educational",
      postedDate: "2026-02-28",
      isNew: false,
      filterType: 'all-india'
    },

    // State-wise News
    {
      id: '4',
      title: "UP Board Exams 2026: Dates Announced for High School and Intermediate",
      source: "UP Madhyamik Shiksha Parishad",
      date: "Mar 12, 2026",
      link: "https://upmsp.edu.in",
      snippet: "UP Board has announced the exam schedule for High School and Intermediate examinations 2026.",
      category: "educational",
      postedDate: "2026-03-12",
      isNew: true,
      filterType: 'state-wise',
      state: 'Uttar Pradesh'
    },
    {
      id: '5',
      title: "Maharashtra HSC Result 2026 Expected in May",
      source: "Maharashtra Board",
      date: "Mar 08, 2026",
      link: "https://mahahsscboard.in",
      snippet: "Maharashtra HSC board exams concluded, results expected in May 2026.",
      category: "educational",
      postedDate: "2026-03-08",
      isNew: true,
      filterType: 'state-wise',
      state: 'Maharashtra'
    },
    {
      id: '6',
      title: "Tamil Nadu 12th Supply Exam Dates 2026 Released",
      source: "TN DGE",
      date: "Mar 05, 2026",
      link: "https://dge.tn.gov.in",
      snippet: "Tamil Nadu Directorate of Government Examinations releases supplementary exam dates.",
      category: "educational",
      postedDate: "2026-03-05",
      isNew: false,
      filterType: 'state-wise',
      state: 'Tamil Nadu'
    },

    // Politics News
    {
      id: '7',
      title: "New Education Policy 2026: Parliament Passes Landmark Bill",
      source: "Times of India",
      date: "Mar 14, 2026",
      link: "https://timesofindia.indiatimes.com",
      snippet: "Parliament passes the New Education Policy 2026 with major reforms in school and higher education.",
      category: "politics",
      postedDate: "2026-03-14",
      isNew: true,
      filterType: 'politics'
    },
    {
      id: '8',
      title: "Budget 2026: Education Sector Gets 20% Allocation Increase",
      source: "Economic Times",
      date: "Feb 28, 2026",
      link: "https://economictimes.indiatimes.com",
      snippet: "Finance Minister announces 20% increase in education budget with focus on digital learning.",
      category: "politics",
      postedDate: "2026-02-28",
      isNew: false,
      filterType: 'politics'
    },

    // General News
    {
      id: '9',
      title: "IITs to Introduce New AI and Data Science Courses from 2026",
      source: "IIT Council",
      date: "Mar 09, 2026",
      link: "https://iitcouncil.ac.in",
      snippet: "All IITs will offer specialized AI and Data Science courses from the academic year 2026-27.",
      category: "general",
      postedDate: "2026-03-09",
      isNew: true,
      filterType: 'general'
    },
    {
      id: '10',
      title: "National Digital Library Adds 1 Million New Resources",
      source: "NDL India",
      date: "Mar 07, 2026",
      link: "https://ndl.iitkgp.ac.in",
      snippet: "National Digital Library expands collection with 1 million new academic resources for students.",
      category: "general",
      postedDate: "2026-03-07",
      isNew: false,
      filterType: 'general'
    }
  ];

  const loadNews = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filtered = [...mockNews];
    
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(item => item.filterType === selectedFilter);
    }
    
    setNews(filtered);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => { 
    loadNews(); 
  }, [selectedFilter]);

  // Auto refresh every 6 hours
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        loadNews();
      }
    }, 6 * 60 * 60 * 1000); // 6 hours

    return () => clearInterval(interval);
  }, [selectedFilter, loading]);

  const getFilterColor = (filterId: string) => {
    const filter = NEWS_FILTERS.find(f => f.id === filterId);
    return filter?.color || 'indigo';
  };

  return (
    <div className="max-w-7xl mx-auto py-16 sm:py-32 px-4 sm:px-6 text-left animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 text-rose-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em]">
            <Newspaper className="w-3.5 h-3.5" /> Vidy Gazette
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-4 sm:mb-6">
            News <span className="text-rose-600">Updates</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-xl font-medium">
            Latest education news, exam alerts, and policy updates. Auto-refresh every 6 hours.
          </p>
          <div className="flex items-center gap-2 mt-4 text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refresh enabled
          </div>
        </div>
        <button 
          onClick={loadNews} 
          disabled={loading} 
          className="px-8 sm:px-10 py-4 sm:py-5 bg-slate-900 text-white rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-[9px] sm:text-[10px] tracking-widest hover:bg-rose-500 transition-all flex items-center gap-3 shadow-xl disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 
          {loading ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {/* News Filters */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-2 mb-4 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <Filter className="w-3 h-3 sm:w-4 sm:h-4" /> Filter News by:
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {NEWS_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-extrabold text-[8px] sm:text-[10px] uppercase tracking-widest transition-all flex items-center gap-1 sm:gap-2 ${
                selectedFilter === filter.id
                  ? `bg-rose-600 text-white shadow-lg scale-105`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <filter.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* New Badge Section */}
      {!loading && news.filter(item => item.isNew).length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" /> Breaking News
            </div>
            <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Just Published
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          <div className="lg:col-span-2 h-[400px] sm:h-[500px] bg-slate-50 rounded-[2rem] sm:rounded-[4rem] animate-pulse"></div>
          <div className="h-[400px] sm:h-[500px] bg-slate-50 rounded-[2rem] sm:rounded-[4rem] animate-pulse"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          {/* Main Feature */}
          {news.length > 0 && (
            <>
              <div className="lg:col-span-2 group relative bg-slate-900 rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-16 overflow-hidden flex flex-col justify-end min-h-[400px] sm:min-h-[500px] shadow-2xl">
                <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-rose-500/10 rounded-full blur-[60px] sm:blur-[100px]"></div>
                <div className="relative z-10">
                  {news[0]?.isNew && (
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-white rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest mb-4">
                      Breaking News
                    </span>
                  )}
                  <span className="text-rose-400 font-black text-[8px] sm:text-[10px] uppercase tracking-widest block mb-4 sm:mb-6">
                    Featured • {news[0]?.source} 
                    {news[0]?.state && ` • ${news[0]?.state}`}
                  </span>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-8 leading-tight group-hover:text-rose-200 transition-colors line-clamp-3">
                    {news[0]?.title}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-lg mb-6 sm:mb-12 line-clamp-3 font-medium">
                    {news[0]?.snippet}
                  </p>
                  <a 
                    href={news[0]?.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 bg-white text-slate-900 rounded-xl sm:rounded-2xl font-black uppercase text-[8px] sm:text-[10px] tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                  >
                    Read Full Article <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[4rem] border border-slate-100">
                <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 sm:mb-10 pb-4 border-b border-slate-50">
                  Latest Bulletins
                </h4>
                <div className="space-y-6 sm:space-y-8">
                  {news.slice(1, 6).map((item, i) => (
                    <a 
                      key={i} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`block group border-b border-slate-50 last:border-0 pb-6 last:pb-0 ${
                        item.isNew ? 'bg-emerald-50/30 -m-2 p-2 rounded-xl' : ''
                      }`}
                    >
                      {item.isNew && (
                        <span className="inline-block px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[6px] font-black uppercase tracking-widest mb-2">
                          New
                        </span>
                      )}
                      <span className="text-[8px] sm:text-[9px] font-black text-rose-500 block mb-1 sm:mb-2 uppercase tracking-widest">
                        {item.source} • {item.filterType?.replace('-', ' ') || item.category}
                        {item.state && ` • ${item.state}`}
                      </span>
                      <h5 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug text-sm sm:text-base">
                        {item.title}
                      </h5>
                      <span className="text-[8px] sm:text-[9px] text-slate-300 font-bold uppercase mt-2 sm:mt-3 block tracking-widest">
                        {item.date}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsSection;