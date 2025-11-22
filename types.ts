export enum MethodCategory {
  FARMING = 'Farming',
  GRINDING = 'Grinding',
  ECONOMY = 'Economy',
  PVP = 'PvP',
  OTHER = 'Other'
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  EXTREME = 'Extreme'
}

export interface MoneyMethod {
  id: string;
  title: string;
  description: string;
  category: MethodCategory;
  difficulty: Difficulty;
  investment: string; // e.g., "Low", "$1M"
  estimatedReturn: string; // e.g., "$100k/hr"
  pros: string[];
  cons: string[];
  icon: string; // Lucide icon name mapping
}

export interface CalculatorState {
  spawnerCount: number;
  itemPrice: number;
  itemsPerMinute: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  groundingUrls?: string[];
}
