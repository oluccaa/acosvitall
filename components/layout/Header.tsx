
import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Search, Phone, ChevronRight, Package, Calculator, FileText, Award, Mail, Layers, Settings, Box, Factory, Home, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { NavLinks } from './NavLinks';
import WhatsappIcon from '../common/icons/WhatsappIcon';
import Logo from '../common/Logo';
import { SOCIAL_LINKS, NAV_LINKS, PRODUCT_CATEGORIES } from '../../lib/constants';
import CommandPalette from '../common/CommandPalette';
import { useRouter } from '../../hooks/useRouter';

const SOCIAL_ICONS: Record<string, any> = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
};

const Header: React.FC = () => {
    const { t } = useTranslation();
    const currentRoute = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Mobile Menu States
    const [activeProductGroup, setActiveProductGroup] = useState<string | null>(null);
    const [isProductsExpanded, setIsProductsExpanded] = useState(false);

    const QUALITY_PORTAL_URL = "https://portaldaqualidade.acosvital.com.br/login";

    const MOBILE_PRODUCT_GROUPS = [
        {
            id: 'tubular',
            label: t('header.mobileGroups.tubular'),
            icon: <Layers size={20} />,
            description: t('header.mobileGroups.tubularDesc'),
            items: ['tubos', 'conduits', 'grooved']
        },
        {
            id: 'conexoes',
            label: t('header.mobileGroups.connections'),
            icon: <Settings size={20} />,
            description: t('header.mobileGroups.connectionsDesc'),
            items: ['flanges', 'fittings', 'valves']
        },
        {
            id: 'estrutural',
            label: t('header.mobileGroups.structural'),
            icon: <Box size={20} />,
            description: t('header.mobileGroups.structuralDesc'),
            items: ['profiles', 'plates', 'gratings', 'tiles', 'civil']
        },
        {
            id: 'industrial',
            label: t('header.mobileGroups.industrial'),
            icon: <Factory size={20} />,
            description: t('header.mobileGroups.industrialDesc'),
            items: ['boilermaking', 'cutting', 'tanks']
        }
    ];

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setActiveProductGroup(null);
        setIsProductsExpanded(false);
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const navLinksData = NAV_LINKS.map(link => ({
        key: link.key,
        text: t(`header.navLinks.${link.key}`),
        href: link.href
    }));

    const isLinkActive = (href: string) => currentRoute === href || (currentRoute.startsWith(href) && href !== '/');

    return (
        <>
            {/* Header Sticky Container */}
            <header className={`sticky top-0 z-[100] w-full transition-all duration-300 ${isScrolled ? 'bg-brand-blue-dark/95 backdrop-blur-md shadow-lg' : 'bg-brand-blue-dark'}`}>
                {/* Top Bar */}
                <div className={`w-full bg-brand-blue-dark border-b border-white/5 transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'py-2.5 h-auto opacity-100'}`}>
                     <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl flex justify-between items-center text-[11px] font-medium tracking-wide text-gray-400">
                         <div className="flex items-center gap-4">
                            <a href="tel:1147972352" className="hover:text-brand-orange flex items-center gap-1.5 transition-colors">
                                <Phone size={11} className="text-brand-orange" /> (11) 4797-2352
                            </a>
                            <span className="hidden sm:inline w-px h-3 bg-white/10"></span>
                            <span className="hidden sm:inline">{t('layout.schedule')}</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <a 
                                href={QUALITY_PORTAL_URL} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 hover:text-brand-orange transition-colors font-bold uppercase tracking-wider"
                            >
                                <ShieldCheck size={12} className="text-brand-orange" />
                                <span>{t('header.navLinks.qualityPortal')}</span>
                            </a>
                            <span className="w-px h-3 bg-white/10"></span>
                            <nav aria-label="Redes sociais" className="hidden sm:block">
                                <ul className="flex items-center space-x-3">
                                    {SOCIAL_LINKS.map((link) => {
                                        const Icon = SOCIAL_ICONS[link.key];
                                        return (
                                            <li key={link.key}>
                                                <a href={link.href} aria-label={link.key} className="hover:text-white transition-colors block">
                                                    {Icon && <Icon size={13} aria-hidden="true" />}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                            <span className="hidden sm:inline w-px h-3 bg-white/10"></span>
                            <LanguageSwitcher />
                         </div>
                     </div>
                </div>

                {/* Main Header Content */}
                <div className="w-full">
                    <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl relative">
                        <div className="flex justify-between items-center gap-6">
                            
                            {/* Logo */}
                            <a href="/" aria-label="Aços Vital Home" className="flex-shrink-0 z-50 transition-transform duration-300 hover:scale-105 origin-left">
                                <Logo className={`transition-all duration-300 ${isScrolled ? 'h-[35px] md:h-[40px]' : 'h-[45px] md:h-[55px]'}`} />
                            </a>
                            
                            {/* Desktop Nav */}
                            <div className="hidden lg:flex flex-1 justify-center">
                                <NavLinks links={navLinksData} isScrolled={isScrolled} />
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center gap-3 z-50 flex-shrink-0">
                                <button 
                                    onClick={() => setIsSearchOpen(true)}
                                    className="hidden lg:flex items-center justify-center w-10 h-10 text-white hover:text-brand-orange transition-colors rounded-full hover:bg-white/5 focus:outline-none"
                                    aria-label="Pesquisar (Ctrl+K)"
                                    title="Pesquisar (Ctrl+K)"
                                >
                                    <Search size={20} />
                                </button>
                                
                                <div className="lg:hidden">
                                    <button 
                                        onClick={toggleMobileMenu} 
                                        className="p-2 focus:outline-none text-white hover:text-brand-orange transition-colors relative z-50 group"
                                        aria-label={isMobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
                                    >
                                        <div className="relative w-6 h-5 flex flex-col justify-between items-end">
                                            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5 w-full' : ''}`} />
                                            <span className={`w-3/4 h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'group-hover:w-full'}`} />
                                            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 w-full' : ''}`} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- PREMIUM MOBILE MENU OVERLAY --- */}
            <div 
                className={`
                    fixed inset-0 z-[150] bg-brand-blue-dark
                    flex flex-col h-[100dvh] w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
                `}
            >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue-light/5 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10 relative z-10">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('layout.menu')}</span>
                     <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <button 
                            onClick={closeMobileMenu}
                            className="p-2 -mr-2 text-white/70 hover:text-white bg-white/5 hover:bg-brand-orange rounded-full transition-all duration-300"
                            aria-label="Fechar"
                        >
                            <X size={20} />
                        </button>
                     </div>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-6 py-6 relative z-10">
                    <div 
                        className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 mb-8 text-gray-200 active:bg-white/10 transition-colors cursor-text hover:border-brand-orange/30"
                        onClick={() => { closeMobileMenu(); setIsSearchOpen(true); }}
                    >
                        <Search size={20} className="mr-3 text-brand-orange" />
                        <span className="text-sm font-medium opacity-80">{t('layout.searchPlaceholder')}</span>
                    </div>

                    <nav className="flex flex-col gap-1">
                        <a 
                            href="/" 
                            onClick={closeMobileMenu}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isLinkActive('/') ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/5'}`}
                        >
                            <Home size={20} className={isLinkActive('/') ? 'text-brand-orange' : 'text-gray-400'} />
                            <span className="font-bold text-lg">{t('header.navLinks.home')}</span>
                        </a>

                        <a 
                            href="/about" 
                            onClick={closeMobileMenu}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isLinkActive('/about') ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/5'}`}
                        >
                            <Award size={20} className={isLinkActive('/about') ? 'text-brand-orange' : 'text-gray-400'} />
                            <span className="font-bold text-lg">{t('header.navLinks.about')}</span>
                        </a>

                        <div className="border-y border-white/5 my-2 py-2">
                            <button 
                                onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${isProductsExpanded ? 'text-white' : 'text-gray-200'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <Package size={20} className="text-brand-orange" />
                                    <span className="font-bold text-lg">{t('header.navLinks.products')}</span>
                                </div>
                                <ChevronRight size={20} className={`transition-transform duration-300 ${isProductsExpanded ? 'rotate-90 text-brand-orange' : 'text-gray-500'}`} />
                            </button>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isProductsExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pl-4 pr-2 pb-4 space-y-3">
                                    {MOBILE_PRODUCT_GROUPS.map((group) => {
                                        const isActiveGroup = activeProductGroup === group.id;
                                        const groupProducts = PRODUCT_CATEGORIES.filter(prod => group.items.includes(prod.id));

                                        return (
                                            <div key={group.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/5">
                                                <button 
                                                    onClick={() => setActiveProductGroup(isActiveGroup ? null : group.id)}
                                                    className="w-full flex items-center justify-between p-4 text-left"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`mt-0.5 ${isActiveGroup ? 'text-brand-orange' : 'text-gray-400'}`}>
                                                            {group.icon}
                                                        </div>
                                                        <div>
                                                            <span className={`block font-bold text-sm ${isActiveGroup ? 'text-white' : 'text-gray-200'}`}>{group.label}</span>
                                                            <span className="block text-[10px] text-gray-500 mt-0.5">{group.description}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={16} className={`transition-transform ${isActiveGroup ? 'rotate-90 text-brand-orange' : 'text-gray-500'}`} />
                                                </button>

                                                {isActiveGroup && (
                                                    <div className="bg-black/20 p-2 grid grid-cols-1 gap-1 animate-slide-in">
                                                        {groupProducts.map(prod => (
                                                            <a 
                                                                key={prod.id} 
                                                                href={prod.href}
                                                                onClick={closeMobileMenu}
                                                                className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 transition-colors text-gray-300 hover:text-white group"
                                                            >
                                                                <span className="text-xs font-medium uppercase tracking-wide">
                                                                    {t(`productsPage.categories.${prod.id}`)}
                                                                </span>
                                                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-orange" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    
                                    <a 
                                        href="/catalog" 
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-center gap-2 w-full p-4 mt-2 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-bold text-xs uppercase tracking-wide hover:bg-brand-orange hover:text-white transition-all"
                                    >
                                        <FileText size={16} /> {t('header.mobileLinks.downloadCatalog')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <a 
                            href="/calculator" 
                            onClick={closeMobileMenu}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isLinkActive('/calculator') ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/5'}`}
                        >
                            <Calculator size={20} className={isLinkActive('/calculator') ? 'text-brand-orange' : 'text-gray-400'} />
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">{t('header.mobileLinks.calculatorTitle')}</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold">{t('header.mobileLinks.calculatorDesc')}</span>
                            </div>
                        </a>

                        <a 
                            href="/tables" 
                            onClick={closeMobileMenu}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isLinkActive('/tables') ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/5'}`}
                        >
                            <FileText size={20} className={isLinkActive('/tables') ? 'text-brand-orange' : 'text-gray-400'} />
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">{t('header.mobileLinks.tablesTitle')}</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold">{t('header.mobileLinks.tablesDesc')}</span>
                            </div>
                        </a>
                        
                         <a 
                            href="/contact" 
                            onClick={closeMobileMenu}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isLinkActive('/contact') ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/5'}`}
                        >
                            <Mail size={20} className={isLinkActive('/contact') ? 'text-brand-orange' : 'text-gray-400'} />
                            <span className="font-bold text-lg">{t('header.navLinks.contact')}</span>
                        </a>

                        {/* Portal da Qualidade Mobile */}
                        <a 
                            href={QUALITY_PORTAL_URL} 
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-4 p-4 rounded-xl transition-all bg-brand-orange/5 text-white border border-brand-orange/10 mt-4 group"
                        >
                            <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
                                <ShieldCheck size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg text-brand-orange">{t('header.navLinks.qualityPortal')}</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold">{t('header.mobileLinks.clientArea')}</span>
                            </div>
                        </a>

                    </nav>
                </div>

                <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md relative z-20">
                     <a 
                        href="https://wa.me/551147972352" 
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobileMenu} 
                        className="flex w-full items-center justify-center gap-3 bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-base shadow-[0_0_20px_rgba(37,211,102,0.2)] active:scale-95 transition-all mb-6"
                    >
                        <WhatsappIcon size={20} />
                        {t('header.mobileLinks.whatsappSupport')}
                    </a>
                    
                    <div className="flex justify-between items-end">
                        <div className="flex gap-6">
                             {SOCIAL_LINKS.map((link) => {
                                const Icon = SOCIAL_ICONS[link.key];
                                return (
                                    <a key={link.key} href={link.href} className="text-gray-500 hover:text-brand-orange transition-colors">
                                        {Icon && <Icon size={20} />}
                                    </a>
                                );
                            })}
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] text-gray-500 font-bold uppercase">© Aços Vital</p>
                        </div>
                    </div>
                </div>
            </div>

            <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Header;
