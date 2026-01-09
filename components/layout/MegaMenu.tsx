
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    Layers, Settings, Box, Factory, ArrowRight, 
    ChevronRight, Download, Calculator
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../../lib/constants';

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isScrolled?: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, isScrolled = false }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const GROUPS = [
        {
            id: 'tubular',
            title: t('header.mobileGroups.tubular'),
            icon: <Layers size={18} />,
            items: ['tubes', 'conduits', 'grooved']
        },
        {
            id: 'connections',
            title: t('header.mobileGroups.connections'),
            icon: <Settings size={18} />,
            items: ['flanges', 'fittings', 'valves']
        },
        {
            id: 'structural',
            title: t('header.mobileGroups.structural'),
            icon: <Box size={18} />,
            items: ['profiles', 'plates', 'gratings', 'tiles']
        },
        {
            id: 'industrial',
            title: t('header.mobileGroups.industrial'),
            icon: <Factory size={18} />,
            items: ['civil', 'boilermaking', 'cutting', 'tanks']
        }
    ];

    return (
        <div 
            className={`fixed inset-x-0 z-[200] flex justify-center px-6 sm:px-12 lg:px-24 transition-all duration-500 animate-in fade-in slide-in-from-top-4
                ${isScrolled ? 'top-[60px]' : 'top-[110px]'}
            `}
        >
            <div className="w-full max-w-7xl bg-[#081437] border border-white/10 rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden ring-1 ring-white/5">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex-1 flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 px-8 lg:px-10 pt-10 pb-4 border-b border-white/5">
                            {GROUPS.map((group) => (
                                <div key={group.id} className="flex items-center gap-3">
                                    <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                                        {group.icon}
                                    </div>
                                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                                        {group.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 px-8 lg:px-10 py-6 pb-10">
                            {GROUPS.map((group) => (
                                <ul key={group.id} className="space-y-0.5">
                                    {group.items.map((itemId) => {
                                        const product = PRODUCT_CATEGORIES.find(p => p.id === itemId);
                                        if (!product) return null;
                                        
                                        return (
                                            <li key={itemId}>
                                                <Link 
                                                    to={product.href}
                                                    onClick={onClose}
                                                    className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all"
                                                >
                                                    <span className="text-[10px] font-bold text-gray-400 group-hover/item:text-brand-orange uppercase tracking-wider transition-colors">
                                                        {t(`productsPage.categories.${product.id}`)}
                                                    </span>
                                                    <ChevronRight size={14} className="text-gray-600 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-[320px] bg-black/20 border-t lg:border-t-0 lg:border-l border-white/5 p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            <span className="text-[9px] font-black text-brand-orange uppercase tracking-[0.25em] block mb-4">Engenharia Vital</span>
                            <h4 className="text-white font-bold text-base leading-tight mb-4">
                                Vital Steel Suite v5.0
                            </h4>
                            <p className="text-[11px] text-gray-400 leading-relaxed mb-6">
                                Workstation de alta precisão para cálculos técnicos e orçamentação industrial.
                            </p>
                            <Link 
                                to="/calculator"
                                onClick={onClose}
                                className="inline-flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest hover:text-brand-orange transition-colors group"
                            >
                                <Calculator size={14} className="text-brand-orange" />
                                Acessar Workstation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform ml-1" />
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5">
                            <Link 
                                to="/catalog"
                                onClick={onClose}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 hover:bg-brand-orange transition-all group"
                            >
                                <div className="p-2.5 bg-brand-orange rounded-xl text-white group-hover:bg-white group-hover:text-brand-orange transition-colors shadow-lg">
                                    <Download size={20} />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[9px] font-black text-brand-orange uppercase group-hover:text-white transition-colors">Download</span>
                                    <span className="block text-xs font-bold text-white uppercase tracking-tight">Catálogo 2025</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent"></div>
            </div>
        </div>
    );
};

export default MegaMenu;
