'use client';

import React, { useState } from 'react';
import { MOCK_COMPARISON_ITEMS } from '../data/mockData';

interface DealComparerProps {
  darkMode: boolean;
}

export default function DealComparer({ darkMode }: DealComparerProps) {
  const [items] = useState(MOCK_COMPARISON_ITEMS);

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <section id="deal-comparison" className={`py-16 transition-colors border-t ${
      darkMode 
        ? 'bg-[#021B12] border-emerald-900/60 text-white' 
        : 'bg-slate-50 border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-2 border ${
            darkMode 
              ? 'text-emerald-300 bg-emerald-900/60 border-emerald-700' 
              : 'text-emerald-800 bg-emerald-50 border-emerald-200'
          }`}>
            <span>Direct Spec Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Side-by-Side Deal Comparison
          </h2>
          <p className={`text-xs sm:text-sm mt-2 ${
            darkMode ? 'text-emerald-300/80' : 'text-slate-600'
          }`}>
            Compare flagship models across current Nigerian market pricing, cameras, battery health, and chipsets.
          </p>
          <p className={`sm:hidden text-[11px] mt-2 font-bold ${
            darkMode ? 'text-emerald-400' : 'text-emerald-700'
          }`}>
            👈 Swipe horizontally to compare all models 👉
          </p>
        </div>

        {/* Comparison Table */}
        <div className={`overflow-x-auto border rounded-3xl transition-colors ${
          darkMode 
            ? 'bg-emerald-950/40 border-emerald-800/80 shadow-xl' 
            : 'bg-white border-slate-200/80 shadow-lg shadow-slate-200/50'
        }`}>
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className={darkMode ? 'bg-emerald-950 border-b border-emerald-800 text-white' : 'bg-slate-900 border-b border-slate-800 text-white'}>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider w-1/4">Specification</th>
                {items.map((phone) => (
                  <th key={phone.id} className={`p-4 text-center w-1/4 border-l ${
                    darkMode ? 'border-emerald-800' : 'border-slate-800'
                  }`}>
                    {phone.badge && (
                      <span className="inline-block text-[10px] font-extrabold text-slate-950 bg-emerald-400 px-2 py-0.5 rounded shadow-xs mb-1">
                        {phone.badge}
                      </span>
                    )}
                    <p className="font-extrabold text-sm sm:text-base text-white">{phone.title}</p>
                    <p className="text-emerald-400 font-black font-mono text-base sm:text-lg mt-0.5 tabular-nums">
                      {formatNaira(phone.priceNgn)}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y text-xs sm:text-sm ${
              darkMode ? 'divide-emerald-900/60' : 'divide-slate-200'
            }`}>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-950/60 text-emerald-300' : 'bg-slate-100/80 text-slate-900'}`}>Display & Refresh Rate</td>
                {items.map((phone) => (
                  <td key={phone.id} className={`p-4 text-center border-l font-medium ${darkMode ? 'border-emerald-900/40' : 'border-slate-200'}`}>
                    {phone.display}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-950/60 text-emerald-300' : 'bg-slate-100/80 text-slate-900'}`}>Processor Chipset</td>
                {items.map((phone) => (
                  <td key={phone.id} className={`p-4 text-center border-l font-medium ${darkMode ? 'border-emerald-900/40' : 'border-slate-200'}`}>
                    {phone.processor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-950/60 text-emerald-300' : 'bg-slate-100/80 text-slate-900'}`}>Camera Configuration</td>
                {items.map((phone) => (
                  <td key={phone.id} className={`p-4 text-center border-l font-medium ${darkMode ? 'border-emerald-900/40' : 'border-slate-200'}`}>
                    {phone.camera}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-950/60 text-emerald-300' : 'bg-slate-100/80 text-slate-900'}`}>Battery & Charging Speed</td>
                {items.map((phone) => (
                  <td key={phone.id} className={`p-4 text-center border-l font-medium ${darkMode ? 'border-emerald-900/40' : 'border-slate-200'}`}>
                    {phone.battery}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-950/60 text-emerald-300' : 'bg-slate-100/80 text-slate-900'}`}>Standard RAM & Storage</td>
                {items.map((phone) => (
                  <td key={phone.id} className={`p-4 text-center border-l font-medium ${darkMode ? 'border-emerald-900/40' : 'border-slate-200'}`}>
                    {phone.ramStorage}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
