
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'pt', label: 'Português', flag: '🇧🇷' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'es', label: 'Español', flag: '🇪🇸' }
    ];

    const currentLang = languages.find(l => l.code === (i18n.language?.substring(0, 2) || 'pt')) || languages[0];

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300
                    ${isOpen ? 'bg-white/10 border-brand-orange text-white' : 'bg-transparent border-white/5 text-gray-400 hover:text-white hover:bg-white/5'}
                `}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <Globe size={14} className={isOpen ? 'text-brand-orange' : 'text-gray-500'} />
                <span className="text-[10px] font-black uppercase tracking-widest">{currentLang.code}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-orange' : 'text-gray-600'}`} />
            </button>
            
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-blue-dark border border-white/10 rounded-xl shadow-2xl z-[200] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`
                                    w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors
                                    ${currentLang.code === lang.code 
                                        ? 'bg-brand-orange/10 text-brand-orange' 
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{lang.flag}</span>
                                    <span className="font-bold">{lang.label}</span>
                                </div>
                                {currentLang.code === lang.code && <Check size={16} />}
                            </button>
                        ))}
                    </div>
                    <div className="bg-white/5 p-2 text-center border-t border-white/5">
                         <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Select Language</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
