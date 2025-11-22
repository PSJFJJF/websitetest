import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalculatorState } from '../types';

const ProfitCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    spawnerCount: 10,
    itemPrice: 50,
    itemsPerMinute: 12, // Avg drop for a spawner per min approx
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  // Calculate projections
  const data = useMemo(() => {
    const profitPerMinute = state.spawnerCount * state.itemsPerMinute * state.itemPrice;
    const profitPerHour = profitPerMinute * 60;
    const profitPerDay = profitPerHour * 24;

    return [
      { name: '1 Hour', amount: profitPerHour },
      { name: '12 Hours', amount: profitPerHour * 12 },
      { name: '24 Hours', amount: profitPerDay },
    ];
  }, [state]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-yellow-500">$</span> AFK Farm Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Number of Spawners</label>
          <input
            type="number"
            name="spawnerCount"
            value={state.spawnerCount}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Sell Price (per item)</label>
          <input
            type="number"
            name="itemPrice"
            value={state.itemPrice}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Avg Drops / Min (per spawner)</label>
          <input
            type="number"
            name="itemsPerMinute"
            value={state.itemsPerMinute}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="h-64 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
            <YAxis 
              stroke="#666" 
              tick={{fill: '#888'}} 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
              itemStyle={{ color: '#fbbf24' }}
              formatter={(value: number) => formatMoney(value)}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
               {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 2 ? '#fbbf24' : '#4b5563'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex justify-between items-center">
        <span className="text-yellow-200 font-medium">Daily Potential (24h AFK)</span>
        <span className="text-2xl font-bold text-yellow-400">{formatMoney(data[2].amount)}</span>
      </div>
    </div>
  );
};

export default ProfitCalculator;
