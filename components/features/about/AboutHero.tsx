
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { ASSETS } from '../../../lib/media';

const AboutHero: React.FC = () => {
    const { t } = useTranslation();
    
    // Fix: using 'about.title' as it is the correct key in the locale files
    const title = t('about.title');
    
    const videoUrl = ASSETS.HERO.COMMON_VIDEO;
    const posterUrl = ASSETS.HERO.COMMON_BG;

    return (
        <section className="relative h-[250px] text-white flex items-center justify-center text-center overflow-hidden">
            <video
                key={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                // Fix: Removed fetchPriority as it is not a standard React property for HTMLVideoElement
                className="absolute z-0 top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
                poster={posterUrl}
            >
                <source src={videoUrl} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-brand-blue-dark/60 z-10"></div>

            <div className="relative z-20 container mx-auto px-6 sm:px-12 lg:px-24">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
            </div>
            
            <a 
              href="#about-content"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
              aria-label="Rolar para o conteúdo"
            >
              <ChevronDown size={32} className="text-white/80 group-hover:text-white transition-colors animate-bounce" />
            </a>
        </section>
    );
};

export default AboutHero;
