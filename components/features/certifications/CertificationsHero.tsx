
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ShieldCheck, Award } from 'lucide-react';
import { ASSETS } from '../../../lib/media';

const CertificationsHero: React.FC = () => {
    const { t } = useTranslation();
    const hero = {
        title: t('certificationsPage.hero.title'),
        subtitle: t('certificationsPage.hero.subtitle'),
    };

    return (
        <section
            className="relative h-[65vh] min-h-[500px] text-white flex items-center overflow-hidden bg-[#050c21]"
            aria-labelledby="certifications-hero-title"
        >
            {/* Background Image com Overlay Dramático */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={ASSETS.CERTIFICATIONS.HERO_BG} 
                    alt="Processo de Qualidade Aços Vital" 
                    className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/80 to-transparent"></div>
            </div>

            {/* Elementos Decorativos Flutuantes */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse"></div>

            <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="lg:w-3/5 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6 shadow-xl shadow-brand-orange/20">
                            <ShieldCheck size={14} /> Selo de Conformidade
                        </div>
                        <h1 id="certifications-hero-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4 animate-slide-in text-shadow-lg drop-shadow-md text-white whitespace-pre-line" style={{ animationDelay: '0.2s' }}>
                            {hero.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-xl font-medium leading-relaxed animate-slide-in" style={{ animationDelay: '0.4s' }}>
                            {hero.subtitle}
                        </p>
                    </div>

                    {/* Badge de Destaque - Glassmorphism */}
                    <div className="lg:w-2/5 hidden lg:flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-brand-orange/20 rounded-full blur-2xl group-hover:bg-brand-orange/30 transition-all duration-500"></div>
                            <div className="relative w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex flex-col items-center justify-center text-center p-8 shadow-2xl ring-1 ring-white/10 animate-in zoom-in duration-1000">
                                <Award size={64} className="text-brand-orange mb-4 animate-bounce" />
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-1">Qualidade</span>
                                <span className="text-2xl font-bold text-white tracking-tighter">CERTIFICADA</span>
                                <div className="w-12 h-1 bg-brand-orange mt-4 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a
              href="#certifications-grid"
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
              aria-label="Rolar para as certificações"
            >
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-2 group-hover:text-brand-orange transition-colors">Explorar Conformidade</span>
              <ChevronDown size={28} className="text-white/60 group-hover:text-brand-orange transition-colors animate-bounce" />
            </a>
        </section>
    );
};

export default CertificationsHero;
