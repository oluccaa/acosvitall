
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

const CivilProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        ...ASSETS.PRODUCT_PAGES.CIVIL.SLIDES
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const models = [
        { 
            name: "ARAME RECOZIDO", 
            desc: "Capaz de aguentar e distribuir o peso da estrutura da sua obra, o Arame Recozido é extremamente versátil e pode ser utilizado para amarrar as formas de madeira e as barras de aço que fazem a estrutura interna das vigas e colunas/pilares de sustentação, garantindo benefícios no canteiro de obras, como praticidade, economia e produtividade, já que é de fácil manuseio e ideal para ser dobrado ou torcido.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.CIVIL.MODELS.ARAME 
        },
        { 
            name: "BARRA DE TRANSFERÊNCIA", 
            desc: "Amplamente utilizadas na Construção Civil, especialmente em projetos que envolvem estruturas de concreto armado, as Barras de Transferência são produtos de alta qualidade, que apresentam resistência e durabilidade superiores. São utilizadas sobretudo para distribuir as cargas sobre o piso e garantir mais estabilidade à obra.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.CIVIL.MODELS.BARRA_TRANSF 
        },
        { 
            name: "VERGALHÕES CA - 25|50|60", 
            desc: "Os Vergalhões CA-25, CA-50 e CA-60 são produzidos em processo de laminação a quente. Soldáveis, possuem superfície nervurada e atendem aos mais exigentes padrões de qualidade da Construção Civil. Indicados para processos que necessitam de alta produtividade e baixa perda metálica, como corte e dobra e armações prontas. A alta tecnologia empregada em sua produção garante o alinhamento das barras retas e a uniformidade dos rolos.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.CIVIL.MODELS.VERGALHOES 
        },
        { 
            name: "TELA SOLDADA NERVURADA", 
            desc: "A Tela Soldada Nervurada é uma armadura de aço que possui alta resistência mecânica e uma melhor aderência entre o aço e o concreto. Esse material é feito com aço CA 60 Nervurado e os fios utilizados são obtidos por laminação a frio. Pode ser aplicada em diferentes confecções, como pisos industriais, fundações em geral, revestimentos de túneis, lajes, paredes de concreto, caixas d’água, entre outros.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.CIVIL.MODELS.TELA 
        },
        { 
            name: "TRELIÇA", 
            desc: "A Treliça é uma peça espacial, produzida com aço CA60 nervurado em todos os fios de sua composição, o que melhora muito a aderência do concreto. Este material é usado principalmente para lajes treliçadas que superam grandes vãos e precisam aguentar cargas pesadas, com pouco escoramento. Esse produto diminui o uso de formas e escoras, reduz mão de obra e a montagem é muito mais rápida.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.CIVIL.MODELS.TRELICA 
        },
    ];

    const technicalData = [
        {
            title: "Tipos de Produtos",
            icon: <Layers size={24} />,
            items: [
                "Arame Recozido",
                "Barra de Transferência",
                "Tela Soldada Nervurada",
                "Treliça",
                "Vergalhões CA 25|50|60"
            ]
        },
        {
            title: "Tipos de Materiais",
            icon: <Settings size={24} />,
            items: [
                "Aço CA 25|50|60"
            ]
        },
        {
            title: "Tipos de Acabamento",
            icon: <Ruler size={24} />,
            items: [
                "Laminação a quente",
                "Soldagem"
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
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">CONSTRUÇÃO CIVIL</h1>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-gray-600 text-base md:text-xl leading-relaxed space-y-8 text-center md:text-justify font-medium">
                            <p>
                                Na Aços Vital, fabricamos materiais de aço de alta qualidade, projetados especialmente para a construção civil. Nossa linha inclui Vergalhões CA-25, CA-50 e CA-60, que garantem a resistência e durabilidade necessárias para estruturas robustas. O Arame Recozido é ideal para aplicações que exigem flexibilidade e alta resistência à tração, proporcionando soluções eficientes para amarrações e reforços.
                            </p>
                            <p>
                                Além disso, oferecemos Barra de Transferência, que facilita a distribuição de cargas, e Tela Soldada Nervurada, que oferece segurança e estabilidade em diversas aplicações. Nossas Treliças são desenvolvidas com precisão, oferecendo suporte estrutural confiável e otimizado.
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
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Estrutura e Fundação</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">Aços para Construção</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28">
                            {models.map((model, idx) => (
                                <div key={idx} className="group flex flex-col bg-white rounded-3xl shadow-2xl transition-all duration-500 relative transform hover:-translate-y-2">
                                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44 h-44 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-gray-100 z-10 transition-transform duration-700 group-hover:scale-105">
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
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-blue-dark mb-4 tracking-tighter uppercase">ESPECIFICAÇÕES TÉCNICAS</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium">Qualidade garantida e certificada para sua estrutura.</p>
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
                                <span className="uppercase tracking-[0.2em] text-xs">Ver Tabelas de Vergalhões</span>
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

export default CivilProductPage;
