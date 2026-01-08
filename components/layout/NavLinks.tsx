import React from 'react';
import { useRouter } from '../../hooks/useRouter';
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

export const NavLinks: React.FC<NavLinksProps> = ({ className = '', links, onLinkClick, isMobile = false }) => {
    const { t } = useTranslation();
    const currentHash = useRouter();

    const isActive = (href: string): boolean => {
        if (href === '#/') return currentHash === '' || currentHash === '#/';
        return currentHash.startsWith(href);
    };

    if (isMobile) return null;

    return (
        <nav className={`flex flex-row items-center space-x-1 ${className}`}>
             {links.map((link) => {
                 const active = isActive(link.href);

                 return (
                    <div key={link.href} className="relative group">
                        <a 
                            href={link.href} 
                            onClick={onLinkClick}
                            className={`
                                relative flex items-center justify-start gap-1 transition-colors duration-200 whitespace-nowrap
                                px-4 py-4 text-[11px] font-black tracking-widest text-gray-300 hover:text-white uppercase
                                ${active ? 'text-brand-orange' : ''}
                            `}
                        >
                            {link.text}
                            <span className={`absolute bottom-3 left-4 right-4 h-[2px] bg-brand-orange transform origin-left transition-transform duration-300 ease-out ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </a>
                    </div>
                );
            })}
        </nav>
    );
};