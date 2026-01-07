
import React from 'react';
import { Search, X } from 'lucide-react';

interface TableSearchProps {
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
}

const TableSearch: React.FC<TableSearchProps> = ({ value, onChange, placeholder }) => {
    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-orange transition-colors">
                <Search size={20} />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-12 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all shadow-inner placeholder:text-gray-400"
                placeholder={placeholder}
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-blue-dark transition-colors"
                    title="Limpar busca"
                >
                    <X size={20} />
                </button>
            )}
        </div>
    );
};

export default TableSearch;
