import React from 'react';
import { LayoutDashboard, TrendingUp, Calculator, MessageSquare, HelpCircle, ShoppingCart, Globe, ExternalLink, Share2 } from 'lucide-react';
import { STORE_URL, DISCORD_URL } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onShare: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onShare }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'methods', icon: TrendingUp, label: 'Money Methods' },
    { id: 'calculator', icon: Calculator, label: 'Profit Calc' },
    { id: 'assistant', icon: MessageSquare, label: 'AI Strategy' },
  ];

  return (
    <aside 
      className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-black border-r border-neutral-800 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
          <span className="text-yellow-500 text-3xl">🍩</span>
          DONUT<span className="text-yellow-500">GUIDE</span>
        </h1>
        <p className="text-neutral-500 text-xs mt-2 uppercase tracking-widest">Unofficial Companion</p>
      </div>

      <nav className="mt-2 px-3 space-y-2 flex-1">
        <div className="text-xs font-bold text-neutral-600 px-4 py-2 uppercase tracking-wider">Menu</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${activeTab === item.id 
                  ? 'bg-neutral-900 text-yellow-400 shadow-md border border-neutral-800' 
                  : 'text-gray-400 hover:text-white hover:bg-neutral-900/50'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}

        <div className="mt-8 text-xs font-bold text-neutral-600 px-4 py-2 uppercase tracking-wider">Official Links</div>
        
        <a 
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-900/50 transition-all group"
        >
          <ShoppingCart className="w-5 h-5 group-hover:text-green-400 transition-colors" />
          <span className="font-medium text-sm">Server Store</span>
          <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        <a 
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-900/50 transition-all group"
        >
          <Globe className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
          <span className="font-medium text-sm">Discord</span>
          <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </nav>

      <div className="p-4 border-t border-neutral-900 space-y-4">
        
        <button 
          onClick={onShare}
          className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-neutral-700"
        >
          <Share2 className="w-4 h-4" />
          Share App Link
        </button>

        <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-lg p-4">
          <h4 className="text-white text-sm font-bold mb-1 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-indigo-400"/> Pro Tip</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Always check /ah prices before selling to shop. Some items sell for 2x to players!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;