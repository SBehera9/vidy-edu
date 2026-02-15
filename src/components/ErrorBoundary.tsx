import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCcw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children?: ReactNode;
  sectionName?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ErrorBoundary] Caught error in ${this.props.sectionName || 'Component'}:`, error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="max-w-2xl w-full bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-indigo-500 to-blue-500"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50"></div>
            
            <div className="p-10 md:p-16 text-center relative z-10">
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                <ShieldAlert className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Section <span className="text-rose-500">Optimization</span> in Progress
              </h2>
              
              <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed max-w-md mx-auto">
                The <span className="font-bold text-slate-800">{this.props.sectionName || 'requested module'}</span> encountered a technical sync issue. Our engineers have been notified.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={this.handleReload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 uppercase text-[10px] tracking-widest"
                >
                  <RefreshCcw className="w-4 h-4" /> Hard Refresh Portal
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase text-[10px] tracking-widest"
                >
                  <Home className="w-4 h-4" /> Return to Home
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                  Diagnostic ID: {Math.random().toString(36).substring(7).toUpperCase()} • Vidy Gateway Protection
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;