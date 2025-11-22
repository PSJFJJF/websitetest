import React, { useState, useEffect } from 'react';
import { Menu, X, DollarSign, Trophy, Copy, Check, ExternalLink, Link as LinkIcon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MethodCard from './components/MethodCard';
import ProfitCalculator from './components/ProfitCalculator';
import AiAssistant from './components/AiAssistant';
import { MONEY_METHODS, SERVER_IP, STORE_URL } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    showNotification(`Server IP (${SERVER_IP}) copied to clipboard!`);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showNotification("App link copied! Send it to your friends.");
    setSidebarOpen(false);
  };

  // Filter top methods for dashboard
  const topMethods = MONEY_METHODS.filter(m => m.investment !== 'High ($ millions)').slice(0, 3);

  return (
    <div className="flex h-screen bg-neutral-950 text-gray-100 font-sans">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 toast-enter">
          <div className="bg-neutral-900 border border-yellow-500/30 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-full">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-bold text-sm">Success</p>
              <p className="text-sm text-gray-300">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }} 
        isOpen={sidebarOpen} 
        onShare={handleShare}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-black border-b border-neutral-800 flex items-center justify-between px-4 z-20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍩</span>
            <span className="font-bold text-white">DONUT GUIDE</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in pb-10">
              
              {/* Hero Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-600 via-amber-700 to-orange-800 p-8 lg:p-12 text-white shadow-2xl border border-yellow-600/20">
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">Master the Economy</h2>
                  <p className="text-yellow-50 text-lg mb-8 font-medium opacity-90">
                    The ultimate unofficial companion for Donut SMP. Maximize profits, calculate farm yields, and dominate the server.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setActiveTab('methods')}
                      className="bg-white text-amber-800 font-bold py-3 px-8 rounded-lg hover:bg-yellow-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Explore Methods
                    </button>
                    <button 
                      onClick={() => setActiveTab('assistant')}
                      className="bg-black/30 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg hover:bg-black/40 transition-all border border-white/20"
                    >
                      Ask AI Assistant
                    </button>
                  </div>
                </div>
                {/* Decorative Background Pattern */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-20 w-56 h-56 bg-black/20 rounded-full blur-2xl"></div>
              </div>

              {/* Server IP Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-black/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Join the Server</h3>
                      <p className="text-gray-400 text-sm">Play now on <span className="text-yellow-500 font-mono">Java & Bedrock</span></p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto bg-black/50 p-2 rounded-lg border border-neutral-800">
                    <code className="text-green-400 font-mono font-bold px-2">{SERVER_IP}</code>
                    <button 
                      onClick={copyIp}
                      className="px-4 py-2 rounded-md text-sm font-bold bg-neutral-700 hover:bg-neutral-600 text-white transition-all flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy IP
                    </button>
                  </div>
                </div>

                <a 
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-xl p-6 flex flex-col justify-center items-center text-center text-white group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2 justify-center">
                      Visit Store <ExternalLink className="w-5 h-5" />
                    </h3>
                    <p className="text-indigo-100 text-sm">Get ranks, crate keys, and spawners.</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </a>
              </div>

              <h3 className="text-2xl font-bold text-white flex items-center gap-2 pt-4">
                <Trophy className="text-yellow-500" /> Top Beginner Strategies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topMethods.map(method => (
                  <MethodCard key={method.id} method={method} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign className="text-green-500" /> Quick Tips
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Start with a basic pumpkin/melon farm. It requires zero redstone to start manually.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Always vote! Voting keys can drop huge amounts of cash or spawners.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Check /warp shops or player warps for cheaper spawners than the server shop.</span>
                    </li>
                  </ul>
                </div>
                
                {/* Mini Calculator Preview */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <DollarSign className="w-32 h-32 text-white" />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2 relative z-10">Planning a Farm?</h3>
                   <p className="text-gray-400 mb-6 relative z-10">Use our advanced calculator to see how much your spawners will make overnight.</p>
                   <button 
                     onClick={() => setActiveTab('calculator')}
                     className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors border border-neutral-700 relative z-10 font-medium"
                   >
                     Open Calculator
                   </button>
                </div>
              </div>
            </div>
          )}

          {/* METHODS VIEW */}
          {activeTab === 'methods' && (
            <div className="animate-fade-in space-y-6 pb-10">
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <h2 className="text-3xl font-bold text-white">Money Making Methods</h2>
                   <p className="text-gray-400 mt-1">Comprehensive list of income streams on Donut SMP.</p>
                 </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MONEY_METHODS.map(method => (
                  <MethodCard key={method.id} method={method} />
                ))}
               </div>
            </div>
          )}

          {/* CALCULATOR VIEW */}
          {activeTab === 'calculator' && (
             <div className="animate-fade-in max-w-4xl mx-auto pb-10">
               <ProfitCalculator />
             </div>
          )}

          {/* ASSISTANT VIEW */}
          {activeTab === 'assistant' && (
            <div className="animate-fade-in max-w-4xl mx-auto pb-10">
               <div className="mb-6 text-center">
                 <h2 className="text-3xl font-bold text-white mb-2">Donut Strategy Assistant</h2>
                 <p className="text-gray-400">Powered by AI with real-time search to find the latest server meta.</p>
               </div>
               <AiAssistant />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}