
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';

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
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const isActive = (href: string): boolean => {
        if (href === '#/') return currentHash === '' || currentHash === '#/';
        return currentHash.startsWith(href);
    };

    // Fechar o menu automaticamente ao scrollar a página
    useEffect(() => {
        const handleScroll = () => {
            if (isMegaMenuOpen) {
                setIsMegaMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMegaMenuOpen]);

    const handleMouseEnter = (key?: string) => {
        if (key === 'products') {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            setIsMegaMenuOpen(true);
        } else {
            setIsMegaMenuOpen(false);
        }
    };

    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => {
            setIsMegaMenuOpen(false);
        }, 150);
    };

    if (isMobile) return null;

    return (
        <nav className={`flex flex-row items-center space-x-1 ${className}`}>
             {links.map((link) => {
                 const active = isActive(link.href);
                 const isProducts = link.key === 'products';

                 return (
                    <div 
                        key={link.href} 
                        className="static" // Permite que o MegaMenu (fixed) se posicione em relação à tela
                        onMouseEnter={() => handleMouseEnter(link.key)}
                        onMouseLeave={isProducts ? handleMouseLeave : undefined}
                    >
                        <a 
                            href={link.href} 
                            onClick={onLinkClick}
                            className={`
                                relative flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap
                                px-4 text-[11px] font-black tracking-widest uppercase
                                ${isScrolled ? 'py-4' : 'py-7'}
                                ${active || (isProducts && isMegaMenuOpen) ? 'text-brand-orange' : 'text-gray-300 hover:text-white'}
                            `}
                        >
                            {link.text}
                            {isProducts && (
                                <ChevronDown 
                                    size={14} 
                                    className={`transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180 text-brand-orange' : 'text-gray-500'}`} 
                                />
                            )}
                            <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-brand-orange transform origin-left transition-transform duration-300 ease-out ${(active || (isProducts && isMegaMenuOpen)) ? 'scale-x-100' : 'scale-x-0'}`}></span>
                        </a>

                        {isProducts && (
                            <MegaMenu 
                                isOpen={isMegaMenuOpen} 
                                onClose={() => setIsMegaMenuOpen(false)} 
                                isScrolled={isScrolled}
                            />
                        )}
                    </div>
                );
            })}
        </nav>
    );
};
