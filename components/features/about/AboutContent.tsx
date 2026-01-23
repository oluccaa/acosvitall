import React from 'react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../../lib/media';

const AboutContent: React.FC = () => {
    const { t } = useTranslation();
    const title = t('about.sectionTitle');
    const youtubeUrl1 = "https://www.youtube.com/embed/zei04S0SohQ?si=XD0KntbR-B9yk-J-";
    const youtubeUrl2 = "https://www.youtube.com/embed/Vt8dUUSsSZA?si=HsCaIShmSAQVrNhS";

    return (
        <section id="about-content" className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-blue-dark uppercase tracking-tight">
                            {title}
                        </h2>
                        <div className="w-24 h-1.5 bg-brand-orange mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
                        
                        <div className="lg:col-span-3 text-brand-text text-base md:text-lg leading-relaxed space-y-6 text-gray-700">
                            <p>{t('about.p1')}</p>
                            <p>{t('about.p2')}</p>
                            <p>{t('about.p3')}</p>
                            <p>{t('about.p4')}</p>
                        </div>

                        <div className="lg:col-span-2 relative w-full flex flex-col gap-6">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200 bg-black">
                                <iframe 
                                    className="absolute inset-0 w-full h-full"
                                    src={youtubeUrl1} 
                                    title="Vídeo Institucional Aços Vital"
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200 bg-black">
                                <iframe 
                                    className="absolute inset-0 w-full h-full"
                                    src={youtubeUrl2} 
                                    title="Aços Vital - Processos Industriais"
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="absolute -z-10 top-6 -right-6 w-full h-full bg-brand-orange/10 rounded-xl hidden lg:block"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutContent;