
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, FileText, Phone, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BottomBarProps {
    onMenuToggle: () => void;
    isMenuOpen: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({ onMenuToggle, isMenuOpen }) => {
    const { t } = useTranslation();
    const location = useLocation();

    const navItems = [
        { id: 'home', icon: <Home size={22} />, label: t('header.navLinks.home'), href: '/' },
        { id: 'products', icon: <Package size={22} />, label: t('header.navLinks.products'), href: '/products' },
        { id: 'catalog', icon: <FileText size={22} />, label: t('header.navLinks.catalog'), href: '/catalog' },
        { id: 'contact', icon: <Phone size={22} />, label: t('header.navLinks.contact'), href: '/contact' },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[200] lg:hidden">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-brand-blue-dark/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]"></div>
            
            <div className="relative flex items-center justify-around h-20 px-2">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.href}
                        className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 ${
                            isActive(item.href) ? 'text-brand-orange' : 'text-gray-400'
                        }`}
                    >
                        <div className={`transition-transform duration-300 ${isActive(item.href) ? 'scale-110 -translate-y-1' : ''}`}>
                            {item.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">
                            {item.label}
                        </span>
                        {isActive(item.href) && (
                            <div className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(194,65,12,0.8)]"></div>
                        )}
                    </Link>
                ))}

                {/* Botão "Mais" - Expande o menu lateral */}
                <button
                    onClick={onMenuToggle}
                    className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 ${
                        isMenuOpen ? 'text-brand-orange' : 'text-gray-400'
                    }`}
                >
                    <div className={`transition-transform duration-300 ${isMenuOpen ? 'scale-110 -translate-y-1' : ''}`}>
                        <Menu size={22} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-tighter">
                        Mais
                    </span>
                    {isMenuOpen && (
                        <div className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(194,65,12,0.8)]"></div>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default BottomBar;
