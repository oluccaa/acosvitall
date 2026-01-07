import React from 'react';
import { TableItem } from './shared/types';

interface TechnicalTableProps {
    table: TableItem;
    highlightTerm?: string;
}

const Highlight: React.FC<{ text: string; term?: string }> = ({ text, term }) => {
    if (!term || !text.toLowerCase().includes(term.toLowerCase())) return <>{text}</>;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return (
        <>
            {parts.map((part, i) => 
                part.toLowerCase() === term.toLowerCase() 
                    ? <mark key={i} className="bg-brand-orange/30 text-brand-blue-dark font-bold rounded-sm px-0.5">{part}</mark> 
                    : part
            )}
        </>
    );
};

export const TechnicalTable: React.FC<TechnicalTableProps> = ({ table, highlightTerm }) => {
    return (
        <div className="w-full overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead className="bg-brand-blue-dark text-white sticky top-0 z-10">
                        {table.headerGroups?.map((group, gi) => (
                            <tr key={gi}>
                                {group.map((cell, ci) => (
                                    <th 
                                        key={ci} 
                                        colSpan={cell.colSpan} 
                                        rowSpan={cell.rowSpan}
                                        className={`p-3 font-bold uppercase tracking-wider text-center border border-white/10 ${cell.className || ''}`}
                                    >
                                        {cell.text}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        {table.headers && (
                            <tr>
                                {table.headers.map((h, i) => (
                                    <th key={i} className="p-3 font-bold uppercase text-[10px] tracking-widest text-center border border-white/10 bg-brand-blue-dark/90">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        )}
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {table.rows?.map((row, ri) => (
                            <tr key={ri} className="hover:bg-brand-orange/5 transition-colors">
                                {row.map((cell, ci) => (
                                    <td key={ci} className={`p-3 text-center border-r border-gray-50 last:border-0 ${ci === 0 ? 'font-bold bg-gray-50/50' : 'text-gray-600'}`}>
                                        <Highlight text={cell} term={highlightTerm} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};