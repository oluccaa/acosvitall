
import React, { useState, useEffect } from 'react';
import CallToAction from '../components/common/CallToAction';
import { ASSETS } from '../lib/media';
import { 
    CheckCircle,
    ChevronRight,
    Settings,
    Layers,
    FileText,
    Activity
} from 'lucide-react';

const ValvulasProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        ...ASSETS.PRODUCT_PAGES.VALVULAS.SLIDES
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const models = [
        { 
            name: "BORBOLETA", 
            desc: "Design compacto e acionamento rápido, ideal para sistemas de grande diâmetro com baixa perda de carga.",
            specs: ["Tipo Wafer/Lug", "Acionamento Manual/Atuado"],
            image: ASSETS.PRODUCT_PAGES.VALVULAS.MODELS.BORBOLETA 
        },
        { 
            name: "ESFERA", 
            desc: "Alta precisão de vedação e operação em 1/4 de volta. Indicada para isolamento rápido em fluídos líquidos e gasosos.",
            specs: ["Passagem Plena", "Monobloco/Bipartida"],
            image: ASSETS.PRODUCT_PAGES.VALVULAS.MODELS.ESFERA 
        },
        { 
            name: "GAVETA", 
            desc: "Foco em isolamento total do fluxo com resistência mecânica superior para grandes tubulações industriais.",
            specs: ["Cunha Flexível", "Haste Externa/Interna"],
            image: ASSETS.PRODUCT_PAGES.VALVULAS.MODELS.GAVETA 
        },
        { 
            name: "GLOBO", 
            desc: "Controle preciso e regulagem fina de vazão. Indispensável em sistemas de vapor e processos químicos.",
            specs: ["Classe 150# a 1500#", "Alta Vedação"],
            image: ASSETS.PRODUCT_PAGES.VALVULAS.MODELS.GLOBO 
        },
        { 
            name: "GUILHOTINA", 
            desc: "Especializada no manuseio de fluídos com sólidos em suspensão ou pastas densas. Ideal para saneamento e celulose.",
            specs: ["Corpo Monobloco", "Lâmina Inoxidável"],
            image: ASSETS.PRODUCT_PAGES.VALVULAS.MODELS.GUILHOTINA 
        },
        { 
            name: "RETENÇÃO", 
            desc: "Impede o retorno do fluído na linha, protegendo bombas e equipamentos críticos contra golpes de aríete.",
            specs: ["Portinhola Única/Dupla", "Vedação Estanque"],
            image: ASSETS.PRODUCT_PAGES.VALVULAS.MODELS.RETENCAO 
        },
    ];

    const technicalData = [
        {
            title: "Controle e Vedação",
            icon: <Activity size={24} />,
            items: [
                "Bloqueio On/Off",
                "Regulagem de Vazão",
                "Prevenção de Refluxo",
                "Alívio de Pressão"
            ]
        },
        {
            title: "Aplicações",
            icon: <Layers size={24} />,
            items: [
                "Química e Petroquímica",
                "Papel e Celulose",
                "Tratamento de Água",
                "Energia e Vapor"
            ]
        },
        {
            title: "Materiais",
            icon: <Settings size={24} />,
            items: [
                "Aço Inox (CF8M)",
                "Aço Carbono (WCB)",
                "Ferro Fundido",
                "Ligas Especiais"
            ]
        },
        {
            title: "Certificações",
            icon: <FileText size={24} />,
            items: [
                "Teste de Estanqueidade",
                "API 6D / ISO 5208",
                "Certificado de Material",
                "Rastreabilidade Total"
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
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">VÁLVULAS</h1>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-gray-600 text-base md:text-xl leading-relaxed space-y-8 text-center md:text-justify font-medium">
                            <p>
                                As válvulas Aços Vital são dispositivos essenciais para controlar, interromper ou direcionar o fluxo de fluidos em sistemas industriais de alta performance. Com materiais certificados e processos de usinagem de precisão, nossos equipamentos garantem estanqueidade absoluta e durabilidade superior.
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
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Controle de Fluxo</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">Linha Industrial</h2>
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
                                        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-2 justify-center">
                                            {model.specs.map((spec, i) => (
                                                <div key={i} className="flex items-center text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                    <CheckCircle size={12} className="text-brand-orange mr-2 flex-shrink-0" />
                                                    <span>{spec}</span>
                                                </div>
                                            ))}
                                        </div>
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
                            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium">Controle total sobre o seu sistema.</p>
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
                                <span className="uppercase tracking-[0.2em] text-xs">Acessar Tabelas de Válvulas</span>
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

export default ValvulasProductPage;
