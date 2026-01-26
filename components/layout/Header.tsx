
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Search, Phone, ChevronRight, Package, FileText, Award, Mail, Layers, Settings, Box, Factory, Home, Menu, X, ArrowRight, ShieldCheck, Globe, ChevronDown, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { NavLinks } from './NavLinks';
import WhatsappIcon from '../common/icons/WhatsappIcon';
import Logo from '../common/Logo';
import { SOCIAL_LINKS, NAV_LINKS, PRODUCT_CATEGORIES } from '../../lib/constants';
import CommandPalette from '../common/CommandPalette';
import { useRouter } from '../../hooks/useRouter';
import BottomBar from './BottomBar';

const SOCIAL_ICONS: Record<string, any> = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube
};

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const currentRoute = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Mobile Menu Accordion States
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ products: true });

    const MOBILE_PRODUCT_GROUPS = [
        {
            id: 'tubular',
            label: t('header.mobileGroups.tubular'),
            icon: <Layers size={18} />,
            items: ['tubes', 'conduits', 'grooved']
        },
        {
            id: 'connections',
            label: t('header.mobileGroups.connections'),
            icon: <Settings size={18} />,
            items: ['flanges', 'fittings', 'valves']
        },
        {
            id: 'structural',
            label: t('header.mobileGroups.structural'),
            icon: <Box size={18} />,
            items: ['profiles', 'plates', 'gratings', 'tiles']
        },
        {
            id: 'industrial',
            label: t('header.mobileGroups.industrial'),
            icon: <Factory size={18} />,
            items: ['civil', 'boilermaking', 'cutting', 'tanks']
        }
    ];

    const toggleGroup = (id: string) => {
        setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
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

    return (
        <>
            <header className={`sticky top-0 z-[100] w-full transition-all duration-500 ${isScrolled ? 'bg-brand-blue-dark/95 backdrop-blur-md shadow-2xl' : 'bg-brand-blue-dark'}`}>
                
                {/* Top Bar */}
                <div className={`w-full border-b border-white/5 transition-all duration-500 overflow-visible ${isScrolled ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[50px] opacity-100'}`}>
                     <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl flex justify-between items-center py-2 text-[10px] md:text-[11px] font-extrabold tracking-wider text-gray-300">
                         <div className="flex items-center gap-4 sm:gap-6">
                            <a href="tel:1147972352" className="group flex items-center gap-2.5 hover:text-white transition-all bg-white/5 px-4 py-1.5 rounded-full border border-white/10 hover:border-brand-orange/50 cursor-pointer">
                                <Phone size={13} className="text-brand-orange group-hover:scale-110 transition-transform" /> 
                                <span className="hidden md:inline">(11) 4797-2352</span>
                                <span className="md:hidden">Ligar</span>
                            </a>
                            <span className="hidden lg:flex items-center gap-2 opacity-50 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                {t('layout.schedule')}
                            </span>
                         </div>

                         <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-brand-orange/5 border border-brand-orange/20 rounded-full opacity-40 cursor-not-allowed group transition-all">
                                <ShieldCheck size={13} className="text-brand-orange" />
                                <span className="uppercase text-gray-400">{t('header.navLinks.qualityPortal')}</span>
                            </div>

                            <div className="h-4 w-px bg-white/10 mx-1 hidden xs:block"></div>
                            
                            <nav aria-label="Redes sociais" className="hidden lg:block">
                                <ul className="flex items-center space-x-5">
                                    {SOCIAL_LINKS.map((link) => {
                                        const Icon = SOCIAL_ICONS[link.key];
                                        return (
                                            <li key={link.key}>
                                                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-all transform hover:scale-125 block">
                                                    {Icon && <Icon size={14} aria-hidden="true" />}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                            
                            <div className="h-4 w-px bg-white/10 mx-1 hidden lg:block"></div>
                            <LanguageSwitcher />
                         </div>
                     </div>
                </div>

                {/* Main Header */}
                <div className="w-full">
                    <div className={`container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4 lg:py-5'}`}>
                        <div className="flex justify-between items-center gap-8">
                            
                            <Link to="/" aria-label="Aços Vital Home" className="flex-shrink-0 z-50 transition-all duration-500 hover:brightness-110">
                                <Logo className={`transition-all duration-500 ${isScrolled ? 'h-[38px] lg:h-[45px]' : 'h-[50px] lg:h-[60px]'}`} />
                            </Link>
                            
                            <div className="hidden lg:flex flex-1 justify-center">
                                <NavLinks links={navLinksData} isScrolled={isScrolled} />
                            </div>
                            
                            <div className="flex items-center gap-3 z-50 flex-shrink-0">
                                <button 
                                    onClick={() => setIsSearchOpen(true)}
                                    className="flex items-center justify-center w-10 h-10 text-white hover:text-brand-orange transition-all rounded-xl bg-white/5 border border-white/5 hover:border-brand-orange/40 shadow-lg group"
                                    aria-label="Pesquisar"
                                >
                                    <Search size={18} className="group-hover:scale-110 transition-transform" />
                                </button>
                                
                                {/* Menu Hambúrguer removido: Agora centralizado na BottomBar */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU OVERLAY */}
            <div 
                className={`fixed inset-0 z-[300] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
            >
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-brand-midnight/90 backdrop-blur-md"
                    onClick={closeMobileMenu}
                ></div>

                {/* Menu Panel */}
                <div 
                    className={`absolute top-0 right-0 h-full w-[90%] max-w-sm bg-brand-blue-dark shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Header do Menu */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-brand-midnight/50">
                        <Logo className="h-8" />
                        <button 
                            onClick={closeMobileMenu}
                            className="p-2 text-brand-orange hover:bg-brand-orange/10 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Conteúdo com Scroll */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pb-24">
                        <nav className="space-y-8">
                            
                            {/* Produtos - Mobile Mega Menu Vertical */}
                            <div className="space-y-4">
                                <button 
                                    onClick={() => toggleGroup('products')}
                                    className={`w-full flex items-center justify-between text-base font-black tracking-widest uppercase py-2 transition-colors ${expandedGroups.products ? 'text-brand-orange' : 'text-white'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Package size={20} className={expandedGroups.products ? 'text-brand-orange' : 'text-gray-500'} />
                                        {t(`header.navLinks.products`)}
                                    </div>
                                    <ChevronDown size={18} className={`transition-transform duration-300 ${expandedGroups.products ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {expandedGroups.products && (
                                    <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                                        {MOBILE_PRODUCT_GROUPS.map(group => (
                                            <div key={group.id} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                                <div className="flex items-center gap-3 mb-4 text-brand-orange">
                                                    <div className="p-2 bg-brand-orange/10 rounded-lg">
                                                        {group.icon}
                                                    </div>
                                                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{group.label}</span>
                                                </div>
                                                
                                                <ul className="grid grid-cols-1 gap-1">
                                                    {group.items.map(itemId => {
                                                        const product = PRODUCT_CATEGORIES.find(p => p.id === itemId);
                                                        return product ? (
                                                            <li key={itemId}>
                                                                <Link 
                                                                    to={product.href} 
                                                                    onClick={closeMobileMenu}
                                                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all group/link"
                                                                >
                                                                    <span className="text-xs font-bold uppercase tracking-wide">
                                                                        {t(`productsPage.categories.${product.id}`)}
                                                                    </span>
                                                                    <ChevronRight size={14} className="text-gray-600 group-hover/link:translate-x-1 transition-transform" />
                                                                </Link>
                                                            </li>
                                                        ) : null;
                                                    })}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Divisor */}
                            <div className="h-px w-full bg-white/5"></div>

                            {/* Outros Links */}
                            <ul className="space-y-4">
                                {NAV_LINKS.filter(l => l.key !== 'products' && l.key !== 'home').map(link => (
                                    <li key={link.key}>
                                        <Link 
                                            to={link.href}
                                            onClick={closeMobileMenu}
                                            className={`flex items-center gap-3 text-sm font-black tracking-widest uppercase py-3 px-4 rounded-xl transition-all ${currentRoute === link.href ? 'bg-brand-orange text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            {t(`header.navLinks.${link.key}`)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Ferramentas e Recursos */}
                            <div className="space-y-4 pt-4">
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-4">Recursos</h4>
                                
                                <Link 
                                    to="/tables" 
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-brand-blue-light/10 border border-brand-blue-light/10 hover:bg-brand-blue-light/20 transition-all group"
                                >
                                    <div className="p-2.5 bg-brand-blue-light/20 rounded-xl text-brand-blue-light group-hover:scale-110 transition-transform">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-black text-white uppercase tracking-wider">Tabelas Técnicas</span>
                                        <span className="block text-[9px] text-gray-400 font-bold uppercase">Normas & Medidas</span>
                                    </div>
                                </Link>

                                <Link 
                                    to="/certifications" 
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-brand-orange/5 border border-brand-orange/10 hover:bg-brand-orange/10 transition-all group"
                                >
                                    <div className="p-2.5 bg-brand-orange/20 rounded-xl text-brand-orange group-hover:scale-110 transition-transform">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-black text-white uppercase tracking-wider">Certificações</span>
                                        <span className="block text-[9px] text-gray-400 font-bold uppercase">Garantia de Qualidade</span>
                                    </div>
                                </Link>
                            </div>
                        </nav>
                    </div>

                    {/* Footer do Menu */}
                    <div className="p-6 border-t border-white/5 bg-brand-midnight/50 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                                {SOCIAL_LINKS.map(link => {
                                    const Icon = SOCIAL_ICONS[link.key];
                                    return (
                                        <a key={link.key} href={link.href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-orange hover:bg-brand-orange/10 transition-all">
                                            {Icon && <Icon size={18} />}
                                        </a>
                                    );
                                })}
                            </div>
                            <LanguageSwitcher />
                        </div>
                        
                        <a 
                            href="https://wa.me/551147972352"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-500/20 active:scale-95 transition-transform"
                        >
                            <WhatsappIcon size={18} />
                            Falar com Vendas
                        </a>
                    </div>
                </div>
            </div>

            <BottomBar 
                onMenuToggle={toggleMobileMenu} 
                isMenuOpen={isMobileMenuOpen} 
            />

            <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Header;
