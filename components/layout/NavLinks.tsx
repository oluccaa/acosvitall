import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { ChevronDown, ArrowRight, FileText, Layers, Box, Settings, Factory, ShieldCheck, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../../lib/constants';
import { useTranslation } from 'react-i18next';

export interface NavLinkData {
    key?: string;
    text: string;
    href: string;
}

interface NavLinksProps {
  className?: string;
  links: NavLinkData[];
  onLinkClick?: () => void;
  isMobile?: boolean; 
  isScrolled?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({ className = '', links, onLinkClick, isMobile = false, isScrolled = false }) => {
    const { t } = useTranslation();
    const currentHash = useRouter();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [activeGroup, setActiveGroup] = useState<string>('tubular'); 
    const closeTimeoutRef = useRef<number | null>(null);

    const PRODUCT_GROUPS = useMemo(() => [
        {
            id: 'tubular',
            label: t('header.mobileGroups.tubular'),
            icon: <Layers size={18} />,
            description: t('header.mobileGroups.tubularDesc'),
            items: ['tubes', 'conduits', 'grooved']
        },
        {
            id: 'conexoes',
            label: t('header.mobileGroups.connections'),
            icon: <Settings size={18} />,
            description: t('header.mobileGroups.connectionsDesc'),
            items: ['flanges', 'fittings', 'valves']
        },
        {
            id: 'estrutural',
            label: t('header.mobileGroups.structural'),
            icon: <Box size={18} />,
            description: t('header.mobileGroups.structuralDesc'),
            items: ['profiles', 'plates', 'gratings', 'tiles', 'civil']
        },
        {
            id: 'industrial',
            label: t('header.mobileGroups.industrial'),
            icon: <Factory size={18} />,
            description: t('header.mobileGroups.industrialDesc'),
            items: ['boilermaking', 'cutting', 'tanks']
        }
    ], [t]);

    const handleMouseEnter = useCallback((key: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setHoveredLink(key);
    }, []);

    const handleMouseLeave = useCallback(() => {
        closeTimeoutRef.current = window.setTimeout(() => {
            setHoveredLink(null);
        }, 200);
    }, []);

    const isActive = (href: string): boolean => {
        if (href === '#/') return currentHash === '' || currentHash === '#/';
        return currentHash.startsWith(href);
    };

    const currentGroupProducts = useMemo(() => {
        const group = PRODUCT_GROUPS.find(g => g.id === activeGroup);
        return group ? PRODUCT_CATEGORIES.filter(prod => group.items.includes(prod.id)) : [];
    }, [activeGroup, PRODUCT_GROUPS]);

    if (isMobile) return null;

    return (
        <nav 
            className={`flex flex-row items-center space-x-1 ${className}`}
            onMouseLeave={handleMouseLeave}
            role="menubar"
        >
             {links.map((link) => {
                 const active = isActive(link.href);
                 const isProducts = link.key === 'products';
                 const isMegaMenuOpen = isProducts && hoveredLink === 'products';

                 return (
                    <div 
                        key={link.href} 
                        className="relative"
                        role="none"
                        onMouseEnter={() => handleMouseEnter(link.key || '')}
                    >
                        <a 
                            href={link.href} 
                            onClick={onLinkClick}
                            role="menuitem"
                            aria-haspopup={isProducts ? "true" : undefined}
                            aria-expanded={isProducts ? isMegaMenuOpen : undefined}
                            className={`
                                relative flex items-center justify-start gap-1 transition-colors duration-200 whitespace-nowrap
                                px-4 py-4 text-xs font-bold tracking-widest text-gray-300 hover:text-white uppercase
                                ${active ? 'text-brand-orange' : ''}
                            `}
                        >
                            {link.text}
                            {isProducts && (
                                <ChevronDown 
                                    size={12} 
                                    aria-hidden="true"
                                    className={`transition-transform duration-300 ease-out ${isMegaMenuOpen ? 'rotate-180 text-brand-orange' : ''}`} 
                                />
                            )}
                            <span className={`absolute bottom-3 left-4 right-4 h-[2px] bg-brand-orange transform origin-left transition-transform duration-300 ease-out ${active || hoveredLink === link.key ? 'scale-x-100' : 'scale-x-0'}`} aria-hidden="true"></span>
                        </a>

                        {isProducts && (
                            <div 
                                id="mega-menu-products"
                                role="region"
                                aria-label="Menu de Produtos"
                                className={`
                                    absolute left-1/2 -translate-x-1/2 w-[92vw] max-w-6xl z-[60] pt-4
                                    transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) origin-top
                                    ${isMegaMenuOpen 
                                        ? 'opacity-100 scale-100 visible translate-y-0' 
                                        : 'opacity-0 scale-[0.99] invisible -translate-y-2 pointer-events-none'
                                    }
                                `}
                            >
                                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.35)] border-t-[5px] border-brand-orange overflow-hidden ring-1 ring-black/5">
                                    <div className="flex h-[440px]">
                                        
                                        {/* COL 1: SIDEBAR DE CATEGORIAS */}
                                        <div className="w-1/4 bg-gray-50/90 border-r border-gray-100 p-4 flex flex-col gap-2" role="tablist" aria-orientation="vertical">
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-3 py-3 mb-1 border-b border-gray-200/50" aria-hidden="true">
                                                {t('layout.departments')}
                                            </div>
                                            {PRODUCT_GROUPS.map((group) => (
                                                <button
                                                    key={group.id}
                                                    role="tab"
                                                    aria-selected={activeGroup === group.id}
                                                    aria-controls={`panel-${group.id}`}
                                                    id={`tab-${group.id}`}
                                                    onMouseEnter={() => setActiveGroup(group.id)}
                                                    className={`
                                                        text-left px-4 py-3 rounded-xl transition-colors duration-150 group/btn flex items-start gap-3 relative
                                                        ${activeGroup === group.id 
                                                            ? 'bg-white shadow-md text-brand-blue-dark border border-gray-200' 
                                                            : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-800'
                                                        }
                                                    `}
                                                >
                                                    {activeGroup === group.id && (
                                                        <span className="absolute left-1.5 top-3 bottom-3 w-1 bg-brand-orange rounded-full" aria-hidden="true"></span>
                                                    )}
                                                    <div className={`mt-0.5 transition-colors duration-150 ${activeGroup === group.id ? 'text-brand-orange' : 'text-gray-400 group-hover/btn:text-brand-blue-dark'}`}>
                                                        {React.cloneElement(group.icon as React.ReactElement<{ size: number }>, { size: 20 })}
                                                    </div>
                                                    <div className="flex-1 overflow-hidden">
                                                        <span className="block font-bold text-sm leading-none mb-1.5">{group.label}</span>
                                                        <span className="block text-[10px] opacity-70 font-semibold truncate uppercase tracking-tight">{group.description}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* COL 2: GRID DE PRODUTOS */}
                                        <div 
                                            className="w-2/4 p-8 bg-white flex flex-col"
                                            role="tabpanel"
                                            id={`panel-${activeGroup}`}
                                            aria-labelledby={`tab-${activeGroup}`}
                                        >
                                            <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                                                <div key={activeGroup} className="animate-in fade-in slide-in-from-left-2 duration-300">
                                                    <h3 className="text-xl font-extrabold text-brand-blue-dark tracking-tight">
                                                        {PRODUCT_GROUPS.find(g => g.id === activeGroup)?.label}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 font-medium">{t('calculatorPage.common.selectItem')}</p>
                                                </div>
                                                <a href="#/products" onClick={() => setHoveredLink(null)} className="text-xs font-bold text-brand-orange hover:text-brand-blue-dark transition-colors flex items-center gap-1.5 group/all">
                                                    {t('layout.viewAll')} 
                                                    <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
                                                {currentGroupProducts.map((cat, idx) => (
                                                    <a 
                                                        key={cat.id} 
                                                        href={cat.href} 
                                                        onClick={() => setHoveredLink(null)} 
                                                        className="group/card flex items-center gap-4 p-3 rounded-xl hover:bg-brand-blue-dark/5 transition-all duration-200 border border-transparent hover:border-gray-100 animate-in fade-in slide-in-from-bottom-1"
                                                    >
                                                        <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gray-50 p-0.5 overflow-hidden border border-gray-200 group-hover/card:border-brand-orange/50 group-hover/card:scale-[1.03] transition-transform duration-200">
                                                            <img src={cat.imageUrl} alt="" className="w-full h-full object-cover rounded-lg" loading="eager" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="block text-[11px] font-extrabold text-gray-800 group-hover/card:text-brand-orange transition-colors uppercase tracking-wider mb-0.5">
                                                                {t(`productsPage.categories.${cat.id}`)}
                                                            </span>
                                                            <span className="flex items-center text-[9px] text-gray-400 font-bold uppercase tracking-tight group-hover/card:text-brand-blue-dark">
                                                                {t('layout.viewSpecs')}
                                                                <ChevronRightIcon size={10} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                            </span>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>

                                        {/* COL 3: CATÁLOGO */}
                                        <div className="w-1/4 bg-brand-blue-dark p-8 flex flex-col justify-between relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange rounded-full blur-[100px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
                                            <div className="relative z-10">
                                                <div className="inline-flex p-3 rounded-2xl bg-white/10 text-brand-orange mb-6 shadow-inner border border-white/5 backdrop-blur-sm" aria-hidden="true">
                                                    <FileText size={24} />
                                                </div>
                                                <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{t('layout.catalogCall')}</h4>
                                                <p className="text-sm text-blue-100/70 leading-relaxed font-medium">
                                                    {t('layout.catalogDesc')}
                                                </p>
                                            </div>
                                            <div className="relative z-10 space-y-4">
                                                <div className="flex items-center gap-2.5 text-xs text-gray-400 font-bold tracking-widest uppercase">
                                                    <ShieldCheck size={14} className="text-green-400" aria-hidden="true" />
                                                    <span>{t('layout.updated')}</span>
                                                </div>
                                                <a 
                                                    href="#/catalog" 
                                                    onClick={() => setHoveredLink(null)} 
                                                    className="flex items-center justify-between w-full bg-brand-orange text-white text-xs font-extrabold py-4 px-6 rounded-xl hover:bg-white hover:text-brand-orange transition-all duration-300 shadow-xl group/cta transform hover:-translate-y-0.5 active:scale-95 uppercase tracking-widest"
                                                >
                                                    <span>{t('layout.downloadNow')}</span>
                                                    <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" aria-hidden="true" />
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};