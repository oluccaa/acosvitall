
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CERTIFICATIONS_LIST } from '../../../lib/constants';
import { Award, ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';

const CertificationsGrid: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="certifications-grid" className="py-28 bg-brand-off-white relative overflow-hidden">
            {/* Elementos Decorativos Geométricos */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute left-[10%] top-20 w-px h-64 bg-gradient-to-b from-brand-orange to-transparent"></div>
                <div className="absolute right-[10%] bottom-20 w-px h-64 bg-gradient-to-t from-brand-blue-dark to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10 max-w-7xl">
                <div className="text-center mb-24">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white rounded-2xl shadow-xl border border-gray-100 text-brand-orange">
                            <ShieldCheck size={48} strokeWidth={1.5} />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-brand-blue-dark mb-6 tracking-tighter uppercase">
                        {t('certificationsPage.grid.title')}
                    </h2>
                    <div className="w-24 h-2 bg-brand-orange mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                        {t('certificationsPage.grid.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {CERTIFICATIONS_LIST.map((cert) => (
                        <div 
                            key={cert.id} 
                            className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(255,117,26,0.15)] group overflow-hidden"
                        >
                            <div className="relative w-full h-72 flex items-center justify-center p-12 bg-gray-50/50 group-hover:bg-white transition-colors duration-500 border-b border-gray-100">
                                <div className="absolute top-4 right-4 text-gray-200 group-hover:text-brand-orange/20 transition-colors">
                                    <Award size={80} strokeWidth={0.5} />
                                </div>
                                <img
                                    src={cert.logoUrl}
                                    alt={t(`certificationsPage.grid.items.${cert.id}.name`)}
                                    className="max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-110 drop-shadow-md"
                                    loading="lazy"
                                />
                            </div>

                            <div className="p-10 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Certificação Oficial</span>
                                </div>
                                
                                <h3 className="font-black text-2xl text-brand-blue-dark mb-4 leading-tight uppercase group-hover:text-brand-orange transition-colors">
                                    {t(`certificationsPage.grid.items.${cert.id}.name`)}
                                </h3>
                                
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue-dark text-white text-[9px] font-black uppercase rounded-lg mb-6 w-fit">
                                    <CheckCircle size={12} className="text-brand-orange" />
                                    {t(`certificationsPage.grid.items.${cert.id}.issuer`)}
                                </div>
                                
                                <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                                    {t(`certificationsPage.grid.items.${cert.id}.description`)}
                                </p>

                                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Status: Ativo 2025</span>
                                    <button className="p-2 text-gray-300 group-hover:text-brand-orange transition-colors">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Card Extra: Solidez Comercial */}
                    <div className="bg-gradient-to-br from-brand-blue-dark to-brand-midnight rounded-3xl p-10 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden group">
                         <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-orange opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
                         
                         <div>
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-orange mb-8 group-hover:rotate-12 transition-transform">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Solidez Comercial</h3>
                            <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                                {t(`certificationsPage.grid.items.dun_bradstreet.description`)}
                            </p>
                         </div>
                         
                         <div className="mt-10">
                            <span className="text-4xl font-bold opacity-10 group-hover:opacity-20 transition-opacity uppercase tracking-tighter">Vital</span>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationsGrid;
