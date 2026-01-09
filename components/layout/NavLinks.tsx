
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
    const currentPath = useRouter();
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const isActive = (href: string): boolean => {
        if (href === '/' || href === '/home') return currentPath === '/' || currentPath === '/home';
        return currentPath.startsWith(href);
    };

    // Fecha ao rolar a página
    useEffect(() => {
        const handleScroll = () => {
            if (isMegaMenuOpen) setIsMegaMenuOpen(false);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMegaMenuOpen]);

    // Fecha ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsMegaMenuOpen(false);
            }
        };

        if (isMegaMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMegaMenuOpen]);

    const handleToggleProducts = (e: React.MouseEvent, key?: string) => {
        if (key === 'products') {
            e.preventDefault();
            setIsMegaMenuOpen(!isMegaMenuOpen);
        } else {
            setIsMegaMenuOpen(false);
            if (onLinkClick) onLinkClick();
        }
    };

    if (isMobile) return null;

    return (
        <nav className={`flex flex-row items-center space-x-1 ${className}`} ref={containerRef}>
             {links.map((link) => {
                 const active = isActive(link.href);
                 const isProducts = link.key === 'products';

                 return (
                    <div key={link.href} className="relative">
                        <a 
                            href={link.href} 
                            onClick={(e) => handleToggleProducts(e, link.key)}
                            className={`
                                relative flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap
                                px-4 text-[11px] font-black tracking-widest uppercase cursor-pointer
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
