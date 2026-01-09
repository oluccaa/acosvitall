
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '../common/Logo';
import { SOCIAL_LINKS } from '../../lib/constants';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    const allLinks = [
        { key: 'home', label: t('header.navLinks.home'), href: '/' },
        { key: 'about', label: t('header.navLinks.about'), href: '/about' },
        { key: 'products', label: t('header.navLinks.products'), href: '/products' },
        { key: 'catalog', label: t('header.navLinks.catalog'), href: '/catalog' },
        { key: 'calculator', label: t('header.navLinks.calculator'), href: '/calculator' },
        { key: 'certifications', label: t('header.navLinks.certifications'), href: '/certifications' },
        { key: 'contact', label: t('header.navLinks.contact'), href: '/contact' },
        { key: 'privacy', label: t('footer.privacyPolicy'), href: '/privacy' }
    ];

    const midPoint = Math.ceil(allLinks.length / 2);
    const leftLinks = allLinks.slice(0, midPoint);
    const rightLinks = allLinks.slice(midPoint);

    const SOCIAL_ICONS: Record<string, any> = {
        facebook: Facebook,
        instagram: Instagram,
        linkedin: Linkedin,
        youtube: Youtube
    };

    return (
        <footer className="bg-brand-blue-dark text-gray-300 pt-16 pb-8 border-t-[3px] border-brand-orange font-sans">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    <div className="space-y-6">
                        <Link to="/" aria-label="Aços Vital" className="block w-48">
                            <Logo className="h-auto w-full" />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-300">
                            {t('footer.description')}
                        </p>
                        
                        <div className="pt-2">
                            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                                {t('footer.followUsTitle')}
                            </h3>
                            <div className="flex gap-3">
                                {SOCIAL_LINKS.map((link) => {
                                    const Icon = SOCIAL_ICONS[link.key];
                                    return (
                                        <a 
                                            key={link.key}
                                            href={link.href} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.key}
                                            className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300 group border border-white/5"
                                        >
                                            {Icon && <Icon size={18} className="text-gray-300 group-hover:text-white" />}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 lg:pl-12">
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                            {t('footer.pagesTitle')}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                            <ul className="space-y-3">
                                {leftLinks.map(link => (
                                    <li key={link.key}>
                                        <Link to={link.href} className="flex items-center gap-2 hover:text-brand-orange transition-colors text-sm font-medium uppercase group">
                                            <ChevronRight size={14} className="text-gray-400 group-hover:text-brand-orange transition-colors" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-3">
                                {rightLinks.map(link => (
                                    <li key={link.key}>
                                        <Link to={link.href} className="flex items-center gap-2 hover:text-brand-orange transition-colors text-sm font-medium uppercase group">
                                            <ChevronRight size={14} className="text-gray-400 group-hover:text-brand-orange transition-colors" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                            {t('footer.contactTitle')}
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <div className="mt-1">
                                    <MapPin size={20} className="text-brand-orange" />
                                </div>
                                <address className="not-italic text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                                    Rod. Pedro Eroles, nº 1855 – KM49<br/>
                                    Jardim Aracy, Mogi das Cruzes - SP<br/>
                                    CEP 08770-490
                                </address>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Phone size={20} className="text-brand-orange" />
                                <a href="tel:1147972352" className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                    (11) 4797-2352
                                </a>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Mail size={20} className="text-brand-orange" />
                                <a href="mailto:acosvital@acosvital.com.br" className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                    acosvital@acosvital.com.br
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                    <p>@ 2026 Aços Vital. Todos os direitos reservados</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
