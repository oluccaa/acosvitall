
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TableItem {
    id: string;
    label: string;
}

interface TableCategory {
    id: string;
    label: string;
    icon: React.ReactNode;
    items: TableItem[];
}

interface TablesSidebarProps {
    categories: TableCategory[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

const TablesSidebar: React.FC<TablesSidebarProps> = ({ categories, selectedId, onSelect }) => {
    const [expandedCats, setExpandedCats] = useState<string[]>(['tubes']);

    const toggleCat = (id: string) => {
        setExpandedCats(prev => 
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    return (
        <nav className="p-4 space-y-2">
            {categories.map((cat) => {
                const isExpanded = expandedCats.includes(cat.id);
                return (
                    <div key={cat.id} className="space-y-1">
                        <button
                            onClick={() => toggleCat(cat.id)}
                            className={`
                                w-full flex items-center justify-between p-3 rounded-lg transition-colors group
                                ${isExpanded ? 'bg-white/5 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <span className={isExpanded ? 'text-brand-orange' : 'text-gray-500 group-hover:text-gray-300'}>
                                    {cat.icon}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider">{cat.label}</span>
                            </div>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="pl-10 space-y-1 py-1">
                                {cat.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onSelect(item.id)}
                                        className={`
                                            w-full text-left p-2 rounded-md text-[11px] font-medium transition-all flex items-center gap-2
                                            ${selectedId === item.id 
                                                ? 'bg-brand-orange text-white shadow-lg' 
                                                : 'text-gray-400 hover:text-white hover:pl-3'}
                                        `}
                                    >
                                        <ChevronRight size={10} className={selectedId === item.id ? 'opacity-100' : 'opacity-0'} />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </nav>
    );
};

export default TablesSidebar;
