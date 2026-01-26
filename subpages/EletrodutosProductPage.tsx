
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

const EletrodutosProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        ...ASSETS.PRODUCT_PAGES.ELETRODUTOS.SLIDES
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const models = [
        { 
            name: "ELETROLÍTICO PRÉ-ZINCADO LEVE", 
            desc: "Rígidos de aço, com uma luva em barras de três metros e protetor de rosca. Acabamento galvanizado eletrolítico ou pré-zincado. Indicado para ambientes internos.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.LEVE 
        },
        { 
            name: "ELETROLÍTICO PRÉ-ZINCADO MÉDIO", 
            desc: "Rígidos de aço, com uma luva em barras de três metros e protetor de rosca. Acabamento galvanizado eletrolítico ou pré-zincado. Indicado para ambientes internos.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.MEDIO 
        },
        { 
            name: "ELETROLÍTICO PRÉ-ZINCADO PESADO | NBR 13057", 
            desc: "Rígidos de aço, conforme a norma NBR 13057/93. Rosca NBR 8133, com uma luva e protetor de rosca em barras de 3 metros. Acabamento galvanizado eletrolítico ou pré-zincado. Indicado para ambientes internos.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.PESADO 
        },
        { 
            name: "ELETROLÍTICO PRÉ-ZINCADO CONEXÕES", 
            desc: "Pesada, média e luva. Curvas de 45°, 90°, 135° e 180°. Acabamentos galvanizado eletrolítico.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.CONEXOES_ELETRO 
        },
        { 
            name: "ELETROLÍTICO GALVANIZADO À FOGO MÉDIO", 
            desc: "Rígidos de aço, com uma luva e protetor de rosca em barras de três metros. Acabamento galvanizado à fogo (imersão a quente). Indicado para ambientes externos.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.FOGO_MEDIO 
        },
        { 
            name: "ELETROLÍTICO GALV. À FOGO PESADO | NBR 5624", 
            desc: "Rígidos de aço, conforme a norma NBR 5624. Rosca NBR 8133, com uma luva e protetor de rosca em barras de 3 metros. Acabamento galvanizado à fogo (imersão a quente). Indicado para ambientes externos.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.FOGO_PESADO 
        },
        { 
            name: "FOGO - CONEXÕES", 
            desc: "Curvas de 45°, 90°, 135° e 180°. Acabamento galvanizado à fogo (imersão a quente)",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.FOGO_CONEXOES 
        },
        { 
            name: "RIR NPT | NBR 5597 - ATMOSFERA EXPLOSIVA", 
            desc: "Rígidos de aço carbono com rebarba interna removida, conforme norma NBR 5597 (EB341), com uma luva e protetor de rosca em barras de 3 metros. Acabamento galvanizado à fogo (imersão a quente). Com gravação na barra. Indicado para ambientes de atmosfera explosiva.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.RIR_NPT 
        },
        { 
            name: "RIR BSP | NBR 5598 - ATMOSFERA EXPLOSIVA", 
            desc: "Rígidos de aço carbono com rebarba interna removida, conforme norma NBR 5598 (EB342), com uma luva e protetor de rosca em barras de 3 metros. Acabamento galvanizado à fogo (imersão a quente). Com gravação na barra. Indicado para ambientes de atmosfera explosiva.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.RIR_BSP 
        },
        { 
            name: "ELETRODUTOS - INOX SCH.10", 
            desc: "Eletrodutos Rígidos em Aço Inox Schedule 10. BSP. Indicado em hospitais e indústrias alimentícias.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.INOX_10 
        },
        { 
            name: "ELETRODUTOS - INOX SCH.40", 
            desc: "Eletrodutos Rígidos em Aço Inox Schedule 40. NPT/BSP. Indicado em hospitais e indústrias alimentícias.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.INOX_40 
        },
        { 
            name: "ELETRODUTOS - CONEXÕES", 
            desc: "Curvas de 90° e Luvas para eletrodutos.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.ELETRODUTOS.MODELS.CONEXOES_GERAL 
        },
    ];

    const technicalData = [
        {
            title: "Tipos de Eletrodutos",
            icon: <Layers size={24} />,
            items: [
                "Eletrolítico Pré-Zincado - Leve, Médio e Pesado",
                "Eletrolítico Pré-Zincado - Conexões",
                "Eletrolítico Galvanizado à Fogo - Médio e Pesado",
                "RIR NPT | NBR 5597 e RIR BSP | NBR 5598",
                "Eletrodutos - Inox SCH.10 e SCH. 40",
                "Eletrodutos - Conexões"
            ]
        },
        {
            title: "Tipos de Materiais",
            icon: <Settings size={24} />,
            items: [
                "Aço Inox Schedule 10",
                "Aço Inox Schedule 40",
                "Aço Galvanizado"
            ]
        },
        {
            title: "Normas de Fabricação",
            icon: <FileText size={24} />,
            items: [
                "NBR 5597 (EB341)",
                "NBR 5598 (EB342)",
                "NBR 5624",
                "NBR 13057"
            ]
        },
        {
            title: "Tipos de Acabamento",
            icon: <Ruler size={24} />,
            items: [
                "NPT/BSP",
                "Galvanizado à fogo"
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
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">ELETRODUTOS</h1>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-gray-600 text-base md:text-xl leading-relaxed space-y-8 text-center md:text-justify font-medium">
                            <p>
                                Os Eletrodutos Aços Vital são fabricados com alto padrão de qualidade, oferecendo segurança e durabilidade em instalações elétricas. Trabalhamos com modelos como rebarba interna removida, galvanizados eletroliticamente, pré-zincados e conexões compatíveis, garantindo proteção mecânica e contra corrosão.
                            </p>
                            <p>
                                A qualidade dos nossos produtos assegura a integridade da fiação, prolonga a vida útil da instalação e contribui para o cumprimento de normas técnicas de resistência e vedação.
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
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Proteção Elétrica</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">Modelos de Eletrodutos</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-28">
                            {models.map((model, idx) => (
                                <div key={idx} className="group flex flex-col bg-white rounded-3xl shadow-2xl transition-all duration-500 relative transform hover:-translate-y-2">
                                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44 h-44 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-gray-100 z-10 transition-transform duration-700 group-hover:scale-105">
                                        <img src={model.image} alt={model.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                    </div>
                                    <div className="p-8 pt-36 md:pt-40 flex-grow flex flex-col">
                                        <div className="text-center mb-4">
                                            <h3 className="text-lg font-black text-brand-blue-dark tracking-wide uppercase leading-tight">{model.name}</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow text-center">{model.desc}</p>
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
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-blue-dark mb-4 tracking-tighter uppercase">ESPECIFICAÇÕES TÉCNICAS</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium">Segurança e conformidade para sua instalação.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                <span className="uppercase tracking-[0.2em] text-xs">Ver Tabela de Eletrodutos</span>
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

export default EletrodutosProductPage;
