
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../lib/media';

const CallToAction: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section 
            className="relative py-12 md:py-16 lg:py-20 bg-cover bg-center text-white overflow-hidden"
            style={{ backgroundImage: `url('${ASSETS.CTA.BG_GIF}')` }}
        >
            {/* Overlay Div - Refinado para manter o contraste sem pesar */}
            <div className="absolute inset-0 bg-brand-blue-dark/85"></div>
            
            {/* Elemento Decorativo Sutil */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Content Container - Escala reduzida para notebooks */}
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10 text-center">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
                        {t('callToAction.title')}
                    </h2>
                    
                    <p className="text-lg md:text-xl mb-6 text-brand-orange font-semibold uppercase tracking-wider">
                        {t('callToAction.subtitle')}
                    </p>
                    
                    <p className="max-w-2xl mb-10 text-gray-300 text-sm md:text-base leading-relaxed">
                        {t('callToAction.description')}
                    </p>
                    
                    <button className="bg-brand-orange text-white font-bold py-3.5 px-10 rounded-full hover:bg-brand-orange-dark transition-all duration-300 text-xs uppercase tracking-[0.15em] shadow-xl shadow-brand-orange/20 transform hover:-translate-y-1 active:scale-95 border border-brand-orange-dark/30">
                        {t('callToAction.buttonText')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
