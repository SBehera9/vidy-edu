import React, { useEffect, useRef } from 'react';
import { 
  Zap, Briefcase, GraduationCap, Search, Newspaper, 
  ArrowRight, Sparkles, TrendingUp, Users, Award, 
  Shield, Rocket, BookOpen, Star, Globe, ChevronRight,
  MessageCircle, Phone, Mail, Play, Pause
} from 'lucide-react';

interface HomePageProps {
  setSection: (section: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setSection }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Briefcase, title: 'Latest Jobs', desc: '10,000+ Govt vacancies', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', section: 'jobs' },
    { icon: GraduationCap, title: 'Syllabus Hub', desc: 'All boards & universities', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', section: 'syllabus' },
    { icon: Search, title: 'Research Lab', desc: 'AI-powered academic search', color: 'from-purple-500 to-pink-600', bg: 'bg-purple-50', section: 'search' },
    { icon: Newspaper, title: 'News Updates', desc: 'Real-time exam alerts', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', section: 'news' },
  ];

  const stats = [
    { label: 'Active Users', value: '10L+', icon: Users, color: 'text-blue-600' },
    { label: 'Job Updates', value: '50K+', icon: TrendingUp, color: 'text-emerald-600' },
    { label: 'Govt Sources', value: '100+', icon: Shield, color: 'text-purple-600' },
    { label: 'Success Stories', value: '25K+', icon: Award, color: 'text-amber-600' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'JEE Aspirant', text: 'Found latest syllabus and exam patterns instantly. The research lab is a game-changer!', rating: 5, image: '👩‍🎓' },
    { name: 'Rahul Verma', role: 'UPSC Candidate', text: 'Real-time job alerts helped me never miss a deadline. Absolutely free and reliable.', rating: 5, image: '👨‍🎓' },
    { name: 'Neha Gupta', role: 'College Student', text: 'The WhatsApp support is super quick. Got career guidance within minutes!', rating: 5, image: '👩‍💼' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Floating Elements */}
          <div className="absolute top-40 left-10 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 opacity-10 animate-spin-slow"></div>
          <div className="absolute bottom-40 right-10 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full opacity-10 animate-pulse-slow"></div>

          <div className="text-center relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-8 shadow-lg shadow-indigo-500/30 animate-bounce-slow group">
              <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              India's #1 Free Student Portal
              <Sparkles className="w-4 h-4 ml-2 text-yellow-300" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                Master Your
              </span>
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Educational Journey
                </span>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Your all-in-one platform for{' '}
              <span className="font-bold text-indigo-600 relative inline-block">
                real-time job alerts
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-200"></span>
              </span>
              ,{' '}
              <span className="font-bold text-purple-600">official syllabus</span>
              , and{' '}
              <span className="font-bold text-pink-600">AI-powered research</span>
              . Free forever, for every Indian student.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => setSection('jobs')}
                className="group relative px-10 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Opportunities
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => setSection('search')}
                className="group px-10 py-6 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black uppercase text-sm tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Launch Research Lab
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group animate-on-scroll">
                  <div className="inline-flex p-4 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Everything You Need in{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                One Place
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive tools designed to accelerate your academic and career success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setSection(feature.section)}
                className="group relative p-8 bg-white rounded-3xl border border-slate-100 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-on-scroll overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-8 h-8 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 mb-6">{feature.desc}</p>
                
                <div className="flex items-center text-sm font-bold text-indigo-600 group-hover:gap-2 transition-all">
                  Explore Now
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                </div>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-indigo-600/20 group-hover:border-r-indigo-600/40 transition-all duration-500"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Video Section */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6">
                <Play className="w-3 h-3 fill-indigo-600" />
                Watch in Action
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
                See How Vidy
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Transforms Learning
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Experience the power of real-time job alerts, AI-powered research, 
                and comprehensive syllabus access - all in one seamless platform.
              </p>
              <div className="space-y-4">
                {['Instant job notifications', 'Official syllabus downloads', 'AI academic research'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-on-scroll">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <video
                  ref={videoRef}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                  loop
                >
                  <source src="#" type="video/mp4" />
                </video>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      if (isPlaying) {
                        videoRef.current.pause();
                      } else {
                        videoRef.current.play();
                      }
                      setIsPlaying(!isPlaying);
                    }
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-20"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-indigo-600" />
                  ) : (
                    <Play className="w-8 h-8 text-indigo-600 ml-1" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-indigo-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                10L+ Students
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of successful students who trust Vidy for their educational journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-on-scroll"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-6 transition-transform duration-500">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Connect */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[3rem] p-12 sm:p-16 text-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Need Instant Help?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                Our counselors are available 24/7 to guide you through your academic journey
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-slate-100 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <MessageCircle className="w-5 h-5 fill-[#25D366] text-[#25D366] group-hover:scale-110 transition-transform" />
                  WhatsApp Chat
                </a>
                
                <a
                  href="tel:+919876543210"
                  className="group inline-flex items-center gap-3 px-8 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Call Now
                </a>
                
                <a
                  href="mailto:support@vidy.edu.in"
                  className="group inline-flex items-center gap-3 px-8 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
                >
                  <Mail className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-40px) scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.2); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .bg-grid-white {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;