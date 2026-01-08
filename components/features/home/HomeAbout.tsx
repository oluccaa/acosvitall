
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../../lib/media';
import { ArrowRight } from 'lucide-react';

interface HomeAboutProps {
    showButton?: boolean;
}

const HomeAbout: React.FC<HomeAboutProps> = ({ showButton = true }) => {
    const { t } = useTranslation();
    const title = t('about.title');

    return (
        <section id="about-content" className="py-12 md:py-20 lg:py-28 bg-white relative overflow-hidden">
            {/* Elemento Decorativo de Fundo */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-50 rounded-br-full -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"></div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10 max-w-[1920px]">
                {/* 
                    Grid System: 12 Colunas
                    Ajustado para md:grid-cols-12 para ficar lado a lado em tablets.
                    items-stretch garante que as colunas compartilhem a mesma altura base.
                */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-stretch">
                    
                    {/* Coluna de Texto (Esquerda) */}
                    <div className="md:col-span-7 order-2 md:order-1 flex flex-col justify-center text-center md:text-left">
                        <div className="flex flex-col h-full justify-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-dark/5 text-brand-blue-dark text-[10px] font-bold uppercase tracking-widest mb-4 border border-brand-blue-dark/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                                    Sobre a Aços Vital
                                </div>
                                
                                <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-brand-blue-dark mb-6 leading-tight max-w-lg mx-auto md:mx-0">
                                    {title}
                                </h2>
                                
                                <div className="space-y-4 text-gray-600 text-sm lg:text-[15px] leading-relaxed max-w-xl mx-auto md:mx-0">
                                    <p>{t('about.p1')}</p>
                                    <p>{t('about.p2')}</p>
                                    <p>{t('about.p3')}</p>
                                </div>

                                {showButton && (
                                    <div className="mt-8 lg:mt-10">
                                        <a 
                                            href="#/about" 
                                            className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold py-3.5 px-8 rounded-full hover:bg-brand-orange-dark transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-brand-orange/30 text-xs uppercase tracking-wider group"
                                        >
                                            {t('about.callToAction.buttonText')}
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Coluna da Imagem (Direita) */}
                    <div className="md:col-span-5 order-1 md:order-2 relative group flex items-center justify-center md:justify-end">
                        <div className="relative w-full max-w-[400px] md:max-w-none">
                            <div className="absolute inset-0 bg-brand-orange rounded-2xl transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                            <img 
                                src={ASSETS.ABOUT.CONTENT_IMAGE} 
                                alt={title} 
                                // Alturas aumentadas para criar o efeito "vertical" e estreito em relação ao texto
                                // No mobile h-[350px], no tablet h-[500px], escalando até h-[600px]
                                className="relative rounded-2xl object-cover w-full shadow-xl h-[350px] md:h-[500px] lg:h-[550px] xl:h-[600px] transition-all duration-700 ease-in-out border border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeAbout;
