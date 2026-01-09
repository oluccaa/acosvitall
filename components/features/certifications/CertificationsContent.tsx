
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Target, Zap, ShieldCheck, ClipboardCheck, Factory, Gauge } from 'lucide-react';

const ICON_MAP: Record<number, any> = {
    0: <Factory size={24} />,
    1: <Gauge size={24} />,
    2: <ShieldCheck size={24} />,
    3: <Zap size={24} />,
    4: <Target size={24} />,
    5: <ClipboardCheck size={24} />,
};

const CertificationsContent: React.FC = () => {
    const { t } = useTranslation();
    const title = t('certificationsPage.policy.title');
    const description = t('certificationsPage.policy.description');
    const points = t('certificationsPage.policy.points', { returnObjects: true }) as string[];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#081437 1px, transparent 1px), linear-gradient(90deg, #081437 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    
                    <div className="lg:w-1/3 sticky top-32">
                        <div className="inline-flex items-center gap-2 text-brand-orange font-black text-[10px] uppercase tracking-[0.25em] mb-6">
                            <div className="w-8 h-px bg-brand-orange"></div> METODOLOGIA
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-brand-blue-dark mb-8 leading-[0.95] uppercase">
                            {title}
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-10">
                            {description}
                        </p>
                        
                        <div className="p-6 bg-brand-blue-dark rounded-2xl shadow-xl shadow-brand-blue-dark/20 text-white border-l-8 border-brand-orange">
                            <p className="text-sm font-medium italic opacity-80">
                                "Nossa meta é a falha zero, garantindo que o aço Aços Vital seja o alicerce mais seguro para o seu negócio."
                            </p>
                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center">
                                    <CheckCircle2 size={20} className="text-brand-orange" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Garantia Vital</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.isArray(points) && points.map((point, index) => {
                            // Lógica de separação para Título: Descrição
                            const parts = point.split(':');
                            const cardTitle = parts.length > 1 ? parts[0].trim() : point;
                            const cardDesc = parts.length > 1 ? parts[1].trim() : "";

                            return (
                                <div 
                                    key={index} 
                                    className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-brand-orange/40 hover:shadow-2xl hover:shadow-brand-orange/10 transition-all duration-500"
                                >
                                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500">
                                        {ICON_MAP[index] || <CheckCircle2 size={24} />}
                                    </div>
                                    <h3 className="text-lg font-bold text-brand-blue-dark mb-3 uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                                        {cardTitle}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {cardDesc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CertificationsContent;
