
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { ASSETS } from '../../../lib/media';

const AboutHero: React.FC = () => {
    const { t } = useTranslation();
    const title = t('about.title');
    
    // AVIF animado para fundo otimizado
    const bgUrl = ASSETS.HERO.ABOUT_ANIMATED_BG;

    return (
        <section className="relative h-[220px] md:h-[300px] text-white flex items-center justify-center text-center overflow-hidden bg-brand-midnight">
            {/* Background Image (Animated AVIF) com Parallax sutil via CSS */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105"
                style={{ 
                    backgroundImage: `url('${bgUrl}')`,
                }}
            ></div>

            {/* Overlay Gradiente Multi-camada para profundidade */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-dark/80 via-brand-blue-dark/40 to-brand-blue-dark/90 z-10"></div>

            <div className="relative z-20 container mx-auto px-6 sm:px-12 lg:px-24 max-w-5xl">
                {/* Linha de acento decorativa */}
                <div className="w-12 h-1 bg-brand-orange mx-auto mb-6 rounded-full animate-page-in"></div>
                
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-orange mb-3 block animate-page-in" style={{ animationDelay: '0.1s' }}>
                    Nossa História
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] animate-page-in tracking-tight drop-shadow-2xl text-white whitespace-pre-line" style={{ animationDelay: '0.2s' }}>
                    {title}
                </h1>
            </div>
            
            {/* Indicador de scroll mais discreto */}
            <a 
              href="#about-content"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group transition-opacity duration-300 hover:opacity-100 opacity-70"
              aria-label="Rolar para o conteúdo"
            >
              <ChevronDown size={24} className="text-white group-hover:text-brand-orange transition-colors animate-bounce" />
            </a>
        </section>
    );
};

export default AboutHero;
