
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../lib/media';

const CallToAction: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section 
            className="relative py-16 md:py-24 lg:py-32 2xl:py-48 bg-cover bg-center text-white overflow-hidden"
            style={{ backgroundImage: `url('${ASSETS.CTA.BG_GIF}')` }}
        >
            <div className="absolute inset-0 bg-brand-blue-dark/90"></div>
            
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10 text-center">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-8xl font-bold mb-4 2xl:mb-8 tracking-tight">
                        {t('callToAction.title')}
                    </h2>
                    
                    <p className="text-lg md:text-xl 2xl:text-3xl mb-8 2xl:mb-12 text-brand-orange font-bold uppercase tracking-widest">
                        {t('callToAction.subtitle')}
                    </p>
                    
                    <p className="max-w-3xl mb-12 2xl:mb-20 text-gray-300 text-base md:text-lg 2xl:text-2xl leading-relaxed">
                        {t('callToAction.description')}
                    </p>
                    
                    <button className="bg-brand-orange text-white font-bold py-4 px-10 2xl:py-7 2xl:px-20 rounded-full hover:bg-white hover:text-brand-orange transition-all duration-300 text-xs 2xl:text-2xl uppercase tracking-[0.2em] shadow-2xl shadow-brand-orange/20 transform hover:-translate-y-2 active:scale-95 border border-brand-orange-dark/30">
                        {t('callToAction.buttonText')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
