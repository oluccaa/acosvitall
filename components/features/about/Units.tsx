
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../../lib/media';
import { Building2, Globe, ChevronRight, Factory } from 'lucide-react';

const Units: React.FC = () => {
    const { t } = useTranslation();
    const subtitle = t('units.subtitle');

    const units = [
        {
            id: 'mogi',
            icon: <Building2 className="text-brand-orange" size={32} />,
            city: t('units.locations.mogi.city'),
            state: t('units.locations.mogi.state'),
            role: t('units.locations.mogi.role'),
            address: t('units.locations.mogi.address')
        },
        {
            id: 'uberaba',
            icon: <Factory className="text-brand-orange" size={32} />,
            city: t('units.locations.uberaba.city'),
            state: t('units.locations.uberaba.state'),
            role: t('units.locations.uberaba.role'),
            address: t('units.locations.uberaba.address')
        },
        {
            id: 'bolivia',
            icon: <Globe className="text-brand-orange" size={32} />,
            city: t('units.locations.bolivia.city'),
            state: t('units.locations.bolivia.state'),
            role: t('units.locations.bolivia.role'),
            address: t('units.locations.bolivia.address')
        },
        {
            id: 'chile',
            icon: <Globe className="text-brand-orange" size={32} />,
            city: t('units.locations.chile.city'),
            state: t('units.locations.chile.state'),
            role: t('units.locations.chile.role'),
            address: t('units.locations.chile.address')
        }
    ];

    return (
        <section id="onde-atuamos" className="py-20 md:py-28 bg-brand-blue-dark text-white overflow-hidden border-t border-white/5 relative">
            {/* Elementos Decorativos de Fundo */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute left-1/4 top-0 w-px h-full bg-white"></div>
                <div className="absolute left-2/4 top-0 w-px h-full bg-white"></div>
                <div className="absolute left-3/4 top-0 w-px h-full bg-white"></div>
            </div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center mb-16 md:mb-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                            {subtitle}
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                            Presença Internacional
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Operamos em pontos estratégicos para garantir agilidade logística e suporte técnico especializado em toda a América Latina.
                        </p>
                    </div>

                    {/* Conteúdo Principal: Mapa + Info */}
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-20">
                        {/* Mapa lateral de suporte visual */}
                        <div className="w-full lg:w-1/2 order-2 lg:order-1 relative group">
                            <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-[100px] group-hover:bg-brand-orange/30 transition-colors duration-700"></div>
                            <img 
                                src={ASSETS.ABOUT.UNITS_MAP}
                                alt="Mapa das unidades Aços Vital na América do Sul"
                                className="relative w-full h-auto object-contain max-h-[500px] drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                loading="lazy" 
                                width="800"
                                height="500"
                            />
                        </div>

                        {/* Detalhes Textuais */}
                        <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                Estrutura integrada para <br className="hidden md:block"/> máxima agilidade logística.
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed">
                                A Aços Vital investe constantemente em infraestrutura de ponta. Nossas 4 unidades operam de forma integrada, combinando manufatura industrial avançada com centros logísticos estrategicamente posicionados para atender grandes projetos de infraestrutura, mineração e energia em tempo recorde.
                            </p>
                            <div className="pt-4">
                                <a 
                                    href="/contact" 
                                    className="inline-flex items-center gap-3 text-brand-orange font-bold uppercase tracking-widest text-xs hover:text-white transition-colors group"
                                >
                                    Fale com a unidade mais próxima
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Grid de Unidades (Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {units.map((unit) => (
                            <div 
                                key={unit.id}
                                className="bg-[#111827]/40 border border-white/5 p-8 rounded-2xl hover:border-brand-orange/40 hover:bg-[#111827]/60 transition-all duration-300 group shadow-lg flex flex-col h-full"
                            >
                                <div className="mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center transition-colors group-hover:bg-brand-orange/10">
                                    {React.cloneElement(unit.icon as React.ReactElement<any>, { 
                                        className: "text-gray-400 group-hover:text-brand-orange transition-colors duration-300" 
                                    })}
                                </div>
                                <div className="space-y-2 flex-grow">
                                    <h4 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors">
                                        {unit.city}
                                    </h4>
                                    <p className="text-brand-orange/80 text-[10px] font-black uppercase tracking-widest">
                                        {unit.state}
                                    </p>
                                    <div className="w-10 h-0.5 bg-white/10 group-hover:w-full group-hover:bg-brand-orange transition-all duration-500"></div>
                                    <p className="text-gray-300 text-[11px] font-bold leading-tight pt-4 uppercase tracking-tighter">
                                        {unit.role}
                                    </p>
                                    <p className="text-gray-500 text-[10px] leading-relaxed pt-2">
                                        {unit.address}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Units;
