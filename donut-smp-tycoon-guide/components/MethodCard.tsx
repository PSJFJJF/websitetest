import React from 'react';
import { MoneyMethod, Difficulty } from '../types';
import { Pickaxe, Sprout, Gavel, Flame, Gift, Wheat, Trophy, Anchor, Sword, DollarSign } from 'lucide-react';

interface MethodCardProps {
  method: MoneyMethod;
}

const MethodCard: React.FC<MethodCardProps> = ({ method }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Anvil': return <Anchor className="w-6 h-6 text-gray-900" />;
      case 'Sprout': return <Sprout className="w-6 h-6 text-green-900" />;
      case 'Gavel': return <Gavel className="w-6 h-6 text-amber-900" />;
      case 'Flame': return <Flame className="w-6 h-6 text-orange-900" />;
      case 'Gift': return <Gift className="w-6 h-6 text-purple-900" />;
      case 'Wheat': return <Wheat className="w-6 h-6 text-yellow-900" />;
      default: return <DollarSign className="w-6 h-6 text-gray-900" />;
    }
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.EASY: return 'text-green-400';
      case Difficulty.MEDIUM: return 'text-yellow-400';
      case Difficulty.HARD: return 'text-orange-500';
      case Difficulty.EXTREME: return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  const getBgColor = (iconName: string) => {
     switch (iconName) {
      case 'Anvil': return 'bg-gray-400';
      case 'Sprout': return 'bg-green-400';
      case 'Gavel': return 'bg-amber-400';
      case 'Flame': return 'bg-orange-400';
      case 'Gift': return 'bg-purple-400';
      case 'Wheat': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/20 group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${getBgColor(method.icon)} shadow-inner`}>
          {getIcon(method.icon)}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded bg-neutral-800 border border-neutral-700 uppercase tracking-wider ${getDifficultyColor(method.difficulty)}`}>
          {method.difficulty}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{method.title}</h3>
      <p className="text-gray-400 text-sm mb-4 flex-grow">{method.description}</p>
      
      <div className="space-y-2 text-sm border-t border-neutral-800 pt-4 mt-auto">
        <div className="flex justify-between">
          <span className="text-gray-500">Investment</span>
          <span className="text-gray-200 font-medium">{method.investment}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Est. Return</span>
          <span className="text-green-400 font-bold">{method.estimatedReturn}</span>
        </div>
      </div>
    </div>
  );
};

export default MethodCard;
