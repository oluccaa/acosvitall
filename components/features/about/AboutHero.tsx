
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { ASSETS } from '../../../lib/media';

const AboutHero: React.FC = () => {
    const { t } = useTranslation();
    const title = t('about.title');
    
    // Agora utilizamos o AVIF animado como fundo para melhor performance LCP
    const bgUrl = ASSETS.HERO.ABOUT_ANIMATED_BG;

    return (
        <section className="relative h-[400px] md:h-[500px] text-white flex items-center justify-center text-center overflow-hidden">
            {/* Background Image (Animated AVIF) */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                style={{ backgroundImage: `url('${bgUrl}')` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-brand-blue-dark/60 z-10"></div>

            <div className="relative z-20 container mx-auto px-6 sm:px-12 lg:px-24">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight animate-slide-in drop-shadow-md text-white whitespace-pre-line">
                    {title}
                </h1>
            </div>
            
            <a 
              href="#about-content"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
              aria-label="Rolar para o conteúdo"
            >
              <ChevronDown size={32} className="text-white/80 group-hover:text-brand-orange transition-colors animate-bounce" />
            </a>
        </section>
    );
};

export default AboutHero;
