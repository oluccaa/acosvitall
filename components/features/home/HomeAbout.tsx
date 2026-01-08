
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
        <section id="about-content" className="py-12 md:py-20 lg:py-24 2xl:py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-50 rounded-br-full -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"></div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10 max-w-[1920px]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 2xl:gap-24 items-center">
                    
                    <div className="md:col-span-7 order-2 md:order-1 flex flex-col justify-center text-center md:text-left">
                        <div className="flex flex-col h-full justify-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-dark/5 text-brand-blue-dark text-[10px] 2xl:text-xs font-bold uppercase tracking-widest mb-6 border border-brand-blue-dark/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                                    Sobre a Aços Vital
                                </div>
                                
                                <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold text-brand-blue-dark mb-8 leading-tight max-w-2xl mx-auto md:mx-0">
                                    {title}
                                </h2>
                                
                                <div className="space-y-6 text-gray-600 text-base lg:text-lg 2xl:text-2xl leading-relaxed max-w-2xl mx-auto md:mx-0">
                                    <p>{t('about.p1')}</p>
                                    <p>{t('about.p2')}</p>
                                    <p>{t('about.p3')}</p>
                                </div>

                                {showButton && (
                                    <div className="mt-10 2xl:mt-14">
                                        <a 
                                            href="#/about" 
                                            className="inline-flex items-center gap-3 bg-brand-orange text-white font-bold py-3.5 px-8 2xl:py-5 2xl:px-12 rounded-full hover:bg-brand-orange-dark transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-brand-orange/30 text-xs 2xl:text-xl uppercase tracking-wider group"
                                        >
                                            {t('about.callToAction.buttonText')}
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform 2xl:w-6 2xl:h-6" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-5 order-1 md:order-2 relative group">
                        <div className="relative w-full max-w-[450px] 2xl:max-w-none mx-auto md:mx-0 overflow-visible h-auto">
                            <div className="absolute inset-0 bg-brand-orange rounded-3xl transform translate-x-4 translate-y-4 2xl:translate-x-8 2xl:translate-y-8 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            
                            <img 
                                src={ASSETS.ABOUT.CONTENT_IMAGE} 
                                alt={title} 
                                className="relative rounded-3xl object-cover w-full h-full shadow-2xl transition-all duration-700 ease-in-out border border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeAbout;
