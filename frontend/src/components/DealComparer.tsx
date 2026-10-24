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
        ? 'bg-[#021B12] border-emerald-900 text-white' 
        : 'bg-white border-emerald-100 text-emerald-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-900 px-3 py-1 rounded-full mb-2 border border-emerald-700">
            <span>Direct Spec Matrix</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-emerald-950'
          }`}>
            Side-by-Side Deal Comparison
          </h2>
          <p className={`text-xs sm:text-sm mt-2 ${
            darkMode ? 'text-emerald-200' : 'text-emerald-800'
          }`}>
            Compare flagship models across NGN pricing, battery capacity, camera setup, and processor performance.
          </p>
        </div>

        {/* Comparison Table */}
        <div className={`overflow-x-auto border rounded-2xl shadow-lg transition-colors ${
          darkMode 
            ? 'bg-emerald-950/80 border-emerald-800' 
            : 'bg-white border-emerald-200'
        }`}>
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-emerald-900 text-white border-b border-emerald-800">
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider w-1/4">Specification</th>
                {items.map((phone) => (
                  <th key={phone.id} className="p-4 text-center w-1/4 border-l border-emerald-800">
                    {phone.badge && (
                      <span className="inline-block text-[10px] font-extrabold text-emerald-950 bg-emerald-400 px-2 py-0.5 rounded shadow-sm mb-1">
                        {phone.badge}
                      </span>
                    )}
                    <p className="font-extrabold text-sm sm:text-base text-white">{phone.title}</p>
                    <p className="text-emerald-300 font-black font-mono text-base sm:text-lg mt-0.5 tabular-nums">
                      {formatNaira(phone.priceNgn)}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y text-xs sm:text-sm ${
              darkMode ? 'divide-emerald-900' : 'divide-emerald-100'
            }`}>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-900/40 text-emerald-200' : 'bg-emerald-50 text-emerald-900'}`}>Display & Refresh Rate</td>
                {items.map((phone) => (
                  <td key={phone.id} className="p-4 text-center border-l border-emerald-100/10 font-medium">
                    {phone.display}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-900/40 text-emerald-200' : 'bg-emerald-50 text-emerald-900'}`}>Processor Chipset</td>
                {items.map((phone) => (
                  <td key={phone.id} className="p-4 text-center border-l border-emerald-100/10 font-medium">
                    {phone.processor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-900/40 text-emerald-200' : 'bg-emerald-50 text-emerald-900'}`}>Camera Configuration</td>
                {items.map((phone) => (
                  <td key={phone.id} className="p-4 text-center border-l border-emerald-100/10 font-medium">
                    {phone.camera}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-900/40 text-emerald-200' : 'bg-emerald-50 text-emerald-900'}`}>Battery & Charging Speed</td>
                {items.map((phone) => (
                  <td key={phone.id} className="p-4 text-center border-l border-emerald-100/10 font-medium">
                    {phone.battery}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-900/40 text-emerald-200' : 'bg-emerald-50 text-emerald-900'}`}>RAM / Storage Config</td>
                {items.map((phone) => (
                  <td key={phone.id} className="p-4 text-center border-l border-emerald-100/10 font-medium">
                    {phone.ramStorage}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={`p-4 font-extrabold ${darkMode ? 'bg-emerald-900/40 text-emerald-200' : 'bg-emerald-50 text-emerald-900'}`}>User Satisfaction Score</td>
                {items.map((phone) => (
                  <td key={phone.id} className="p-4 text-center border-l border-emerald-100/10">
                    <span className="font-black text-emerald-500 font-mono text-base">★ {phone.rating}</span>
                    <span className="text-emerald-600 text-xs block">/ 5.0</span>
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
