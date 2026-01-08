
import React from 'react';
import { useI18n } from '../../../context/I18nContext';
import { ASSETS } from '../../../lib/media';
import { ArrowRight } from 'lucide-react';

interface HomeAboutProps {
    showButton?: boolean;
}

const HomeAbout: React.FC<HomeAboutProps> = ({ showButton = true }) => {
    const { t } = useI18n();
    const title = t('about.title');

    return (
        <section id="about-content" className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
            {/* Elemento Decorativo de Fundo */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-50 rounded-br-full -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"></div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10 max-w-[1920px]">
                {/* 
                    Grid System Atualizado: 12 Colunas
                    Escalado para notebooks (lg) para evitar a sensação de "explodido"
                */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Image Column - Ocupa 5 de 12 colunas */}
                    <div className="lg:col-span-5 relative group w-full sm:w-[80%] md:w-[65%] lg:w-full mx-auto">
                        <div className="absolute inset-0 bg-brand-orange rounded-2xl transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                        <img 
                            src={ASSETS.ABOUT.CONTENT_IMAGE} 
                            alt={title} 
                            // Altura refinada para notebooks: lg:h-[380px] escalando para xl:h-[480px]
                            className="relative rounded-2xl object-cover w-full shadow-xl h-[300px] sm:h-[400px] lg:h-[380px] xl:h-[480px] transition-all duration-700 ease-in-out"
                        />
                    </div>

                    {/* Text Column - Ocupa 7 de 12 colunas */}
                    <div className="lg:col-span-7 text-center lg:text-left lg:pl-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-dark/5 text-brand-blue-dark text-[10px] font-bold uppercase tracking-widest mb-4 border border-brand-blue-dark/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                            Sobre a Aços Vital
                        </div>
                        
                        {/* Tipografia reduzida para notebooks: lg:text-3xl xl:text-5xl */}
                        <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-5xl font-bold text-brand-blue-dark mb-5 leading-tight">
                            {title}
                        </h2>
                        
                        {/* Corpo de texto com tamanho base reduzido para notebooks */}
                        <div className="space-y-4 text-gray-600 text-sm lg:text-[15px] xl:text-lg leading-relaxed">
                            <p>{t('about.p1')}</p>
                            <p>{t('about.p2')}</p>
                            <p className="hidden md:block">{t('about.p3')}</p>
                        </div>

                        {/* Call-to-action button - Escala reduzida para py-3 px-8 */}
                        {showButton && (
                          <div className="mt-6">
                              <a 
                                  href="#/about" 
                                  className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold py-3 px-8 rounded-full hover:bg-brand-orange-dark transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-brand-orange/30 text-xs uppercase tracking-wider group"
                              >
                                 {t('about.callToAction.buttonText')}
                                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </a>
                          </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeAbout;
