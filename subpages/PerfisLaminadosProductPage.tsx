
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

const PerfisLaminadosProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        ...ASSETS.PRODUCT_PAGES.PERFIS.SLIDES
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const models = [
        { 
            name: "PERFIL W - ABAS PARALELAS", 
            desc: "O Perfil W é resistente e garante a sustentação do sistema de lajes e pilar, transferindo os esforços do peso aos demais elementos, como as colunas, paredes e portas. Esse modelo é composto por uma laminação em Aço ASTM A572 Grau 50, com comprimento padrão de 12 metros. É possível encontrar uma ampla variedade de bitolas de 150 a 610mm de altura, ou 6 a 24 polegadas.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.PERFIS.MODELS.W 
        },
        { 
            name: "I/HQ - ABAS INCLINADAS", 
            desc: "O Perfil I (Viga I) e Perfil HQ são ideais para suportar grandes cargas em projetos de vários tipos. Em virtude do formato tradicional com faces das abas internas inclinadas esse modelo possui alta inércia e maior resistência geométrica. A Viga I suporta altas cargas de tensões e outros esforços devido o aço ser resistente e projetado para atender aplicações de estruturas robustas.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.PERFIS.MODELS.I_HQ 
        },
        { 
            name: "PERFIL U - ABAS INCLINADAS", 
            desc: "O Perfil U é um aço versátil que pode ser aplicado em diferentes tipos de obras, fator que faz com que seja muito requisitado para promover encaixes nas construções civis. Assim, geram maior praticidade na montagem. Ele é são feitos de viga metálica em aço galvanizado, aço galvalume e aço zincalume.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.PERFIS.MODELS.U 
        },
        { 
            name: "PERFIL U - SIMPLES", 
            desc: "O Perfil U Simples é fabricado a partir de tiras de aço plano laminado a quente. É utilizado na construção mecânica em geral, em estruturas metálicas, na sinalização rodoviária, em máquinas, implementos agrícolas e em outras aplicações.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.PERFIS.MODELS.U_SIMPLES 
        },
        { 
            name: "PERFIL U -  ENRIJECIDO", 
            desc: "O Perfil U Enrijecido é uma variação do perfil U, cuja diferença se dá pelas dobras internas na parte que fica aberta. Esse modelo é feito a partir de uma placa de aço laminado. É muito parecido com o perfil anterior, inclusive no peso, o que faz com que esse perfil não exerça pressão extra na estrutura.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.PERFIS.MODELS.U_ENRIJECIDO 
        },
        { 
            name: "CANTONEIRA - PERFIL L - ABAS IGUAIS", 
            desc: "Formada por uma chapa de aço dobrada em ângulo reto e produzida a partir de aço carbono, a cantoneira de aço é um produto fundamental para a sustentação de estruturas. Muito utilizado em projetos de Construção Metálica, o produto oferece resistência, durabilidade e estabilidade.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.PERFIS.MODELS.CANTONEIRA 
        },
        { 
            name: "BARRA CHATA", 
            desc: "As barras com seção transversal retangular possuem superfícies lisas, sem cantos vivos. Este produto é extremamente versátil, sendo empregado principalmente em grades e portões, esquadrias, máquinas, implementos agrícolas e rodoviários, e na indústria mecânica em geral.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.PERFIS.MODELS.BARRA_CHATA 
        },
        { 
            name: "BARRA REDONDA", 
            desc: "As barras de aço carbono redondas podem ser fornecidas laminadas ou trefiladas. Em sua produção de forma laminada, são feitas várias camadas que, posteriormente, serão unidas e vão compor uma unidade da barra. A forma trefilada é feita de modo que sua largura é reduzida e seu tamanho aumentado, o material é torcido por uma máquina chamada trefila.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.PERFIS.MODELS.BARRA_REDONDA 
        },
    ];

    const technicalData = [
        {
            title: "Perfis Laminados",
            icon: <Layers size={24} />,
            items: [
                "Barra Chata",
                "Barra Redonda",
                "Perfil W (I) (Viga I)",
                "Perfil L (Cantoneira)",
                "Perfil U (Viga U)",
                "Perfil W (HP)"
            ]
        },
        {
            title: "Perfis Dobrados",
            icon: <Ruler size={24} />,
            items: [
                "Perfil L (Cantoneira)",
                "Perfil UDC - Simples",
                "Perfil UDC - Enrijecido"
            ]
        },
        {
            title: "Tipos de Materiais",
            icon: <Settings size={24} />,
            items: [
                "Aço carbono",
                "Aço inoxidável"
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
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">PERFIS LAMINADOS E DOBRADOS</h1>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-gray-600 text-base md:text-xl leading-relaxed space-y-8 text-center md:text-justify font-medium">
                            <p>
                                Os perfis, barras e cantoneiras Aços Vital são fabricados em três tipos de aço: laminados, dobrados e soldados. Produzidos com materiais de alta qualidade, como aço carbono e aço inoxidável, esses perfis garantem resistência e durabilidade em variadas demandas industriais.
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
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Perfis, Barras e Cantoneiras</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">Modelos Disponíveis</h2>
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
                            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium">Aços de alta performance para sua estrutura.</p>
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
                                <span className="uppercase tracking-[0.2em] text-xs">Ver Tabelas de Perfis</span>
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

export default PerfisLaminadosProductPage;
