import React, { useState, useEffect } from 'react';
import CallToAction from '../components/common/CallToAction';
import { ASSETS } from '../lib/media';
import { 
    CheckCircle,
    ChevronRight,
    FileText,
    Settings,
    Ruler,
    Layers
} from 'lucide-react';

const ConexoesProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        ...ASSETS.PRODUCT_PAGES.CONEXOES.SLIDES
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const models = [
        { 
            name: "ALTA PRESSÃO / FORJADAS", 
            desc: "Equipamento padrão para conectar tubos, válvulas e mangueiras. O diferencial desta junta é a sua capacidade de operação em condições extremas, suportando pressões de média e alta intensidade sem vazamentos.", 
            specs: [],
            image: ASSETS.PRODUCT_PAGES.CONEXOES.MODELS.ALTA_PRESSAO 
        },
        { 
            name: "GOMADAS", 
            desc: "Sua robustez proporciona vedação eficiente e resistência ao desgaste, mesmo em ambientes com altas demandas de performance. São essenciais para garantir a integridade de sistemas que necessitam de flexibilidade sem comprometer a estanqueidade.", 
            specs: [],
            image: ASSETS.PRODUCT_PAGES.CONEXOES.MODELS.GOMADAS 
        },
        { 
            name: "TUBULARES", 
            desc: "Componentes de alta resistência usadas para unir seções de tubos com outras peças de controle de fluxo, como válvulas e bombas, para a criação de sistemas de tubulações que vão conduzir diversos tipos de fluídos.", 
            specs: [],
            image: ASSETS.PRODUCT_PAGES.CONEXOES.MODELS.TUBULARES 
        },
    ];

    const technicalData = [
        {
            title: "Tipos de Conexões",
            icon: <Settings size={24} />,
            items: [
                "Conexões Tubulares (Sch.40 ao Sch.XXS)",
                "Conexão Alta Pressão (2000#; 3000#; 6000#; 9000#)",
                "Conexão em Ferro Maleável",
                "Conexão Gomada"
            ]
        },
        {
            title: "Tipos de Materiais",
            icon: <Layers size={24} />,
            items: [
                "Aço Carbono (Forjado e Laminado)",
                "Aço Inoxidável (Forjado e Laminado)",
                "Ligas Especiais",
                "Ferro Maleável",
                "Aço liga",
                "Bronze",
                "Polímeros",
                "ferro maleavel"
            ]
        },
        {
            title: "Normas de Fabricação",
            icon: <FileText size={24} />,
            items: [
                "ANSI B16.9",
                "ANSI B16.11",
                "ABNT NBR 6925",
                "AWWA C-208"
            ]
        }
    ];

    return (
        <div className="bg-white">
            <section className="relative h-[220px] md:h-[300px] overflow-hidden bg-brand-blue-dark flex items-center justify-center">
                {slides.map((img, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                        <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`} style={{ backgroundImage: `url(${img})` }}></div>
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                ))}
                <div className="relative z-20 container mx-auto px-6 text-center animate-in fade-in zoom-in duration-1000">
                    <div className="w-12 h-1 bg-brand-orange mx-auto mb-6 rounded-full shadow-lg"></div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">CONEXÕES</h1>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-gray-600 text-base md:text-xl leading-relaxed space-y-8 text-center md:text-justify font-medium">
                            <p>
                                As conexões são componentes fundamentais para sistemas de tubulação, utilizadas para unir, direcionar, reduzir ou finalizar linhas em diversos tipos de instalações. Fabricamos três modelos de Conexões, sendo elas Forjadas, Gomadas e Tubulares, todas projetadas para oferecer resistência e confiabilidade em aplicações críticas.
                            </p>
                            <p>
                                Fabricadas em materiais como aço carbono (forjado e laminado), aço inoxidável, ligas especiais e ferro maleável, as conexões devem seguir rigorosos padrões de qualidade e segurança. Entre as principais normas de fabricação estão: ANSI B16.9 (conexões forjadas de aço para solda de topo), ANSI B16.11 (conexões forjadas para rosca e soquete), ABNT NBR 6925 (conexões de ferro maleável) e AWWA C-208 (recomendada para tubulações de água).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-brand-blue-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24">
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Peças Essenciais</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">Catálogo de Conexões</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28">
                            {models.map((model, idx) => (
                                <div key={idx} className="group flex flex-col bg-white rounded-3xl shadow-2xl transition-all duration-500 relative transform hover:-translate-y-2">
                                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44 h-44 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white z-10 transition-transform duration-700 group-hover:scale-105">
                                        <img src={model.image} alt={model.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                    </div>
                                    <div className="p-8 pt-36 md:pt-40 flex-grow flex flex-col">
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl md:text-2xl font-black text-brand-blue-dark tracking-tight uppercase leading-none">{model.name}</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 flex-grow text-center">{model.desc}</p>
                                        
                                        {model.specs && model.specs.length > 0 && (
                                            <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-2 justify-center">
                                                {model.specs.map((spec, i) => (
                                                    <div key={i} className="flex items-center text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                        <CheckCircle size={12} className="text-brand-orange mr-2 flex-shrink-0" />
                                                        <span>{spec}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-brand-off-white border-t border-gray-100">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-blue-dark mb-4 tracking-tighter uppercase">DADOS TÉCNICOS</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium">Detalhes de engenharia para projetos industriais.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {technicalData.map((section, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full group">
                                    <div className="flex items-center mb-8">
                                        <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange mr-4 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500">{section.icon}</div>
                                        <h4 className="text-base md:text-lg font-black text-brand-blue-dark leading-tight uppercase tracking-tight">{section.title}</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex items-start text-gray-600 text-sm font-medium leading-snug">
                                                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-20 text-center">
                            <a href="/tables" className="inline-flex items-center bg-brand-blue-dark text-white font-black py-4 px-10 rounded-2xl hover:bg-brand-orange transition-all duration-500 transform hover:-translate-y-1 group">
                                <span className="uppercase tracking-[0.2em] text-xs">Ver Tabela de Conexões</span>
                                <ChevronRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <CallToAction />
        </div>
    );
};

export default ConexoesProductPage;