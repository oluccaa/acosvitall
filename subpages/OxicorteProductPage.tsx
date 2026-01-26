
import React, { useState, useEffect } from 'react';
import CallToAction from '../components/common/CallToAction';
import { ASSETS } from '../lib/media';
import { 
    CheckCircle,
    ChevronRight,
    FileText,
    Settings,
    Zap,
    Flame
} from 'lucide-react';

const OxicorteProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        ...ASSETS.PRODUCT_PAGES.OXICORTE.SLIDES
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const models = [
        { 
            name: "MAÇARICO", 
            desc: "O corte com maçarico oferece excelente precisão para chapas espessas, sendo versátil e eficiente para cortes manuais em aço carbono, ideal para ajustes e acabamentos específicos.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.OXICORTE.MODELS.MACARICO 
        },
        { 
            name: "MÁQUINA TARTARUGA", 
            desc: "A Máquina Tartaruga realiza cortes automáticos, perfeitos para grandes chapas, oferecendo uniformidade e precisão ao longo de cortes retos, com alta eficiência para produções em série.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.OXICORTE.MODELS.TARTARUGA 
        },
        { 
            name: "MÁQUINA CNC PLASMA", 
            desc: "A Máquina CNC Plasma combina alta velocidade e precisão em cortes complexos, controlados por computador, oferecendo excelente acabamento em chapas de aço e materiais similares.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.OXICORTE.MODELS.PLASMA 
        },
        { 
            name: "MÁQUINA FOTOCELULA", 
            desc: "A Máquina Fotocélula segue moldes ou desenhos com sensores, garantindo cortes precisos e reproduzindo formas complexas, sendo uma solução ideal para grandes volumes de produção.",
            specs: [],
            image: ASSETS.PRODUCT_PAGES.OXICORTE.MODELS.FOTOCELULA 
        },
    ];

    const technicalData = [
        {
            title: "Processos de Corte",
            icon: <Flame size={24} />,
            items: [
                "Oxicorte Manual (Maçarico)",
                "Oxicorte Mecanizado (Tartaruga/Fotocélula)",
                "Plasma CNC (Alta Definição)"
            ]
        },
        {
            title: "Materiais Processados",
            icon: <Settings size={24} />,
            items: [
                "Aço Carbono (Chapas Espessas)",
                "Aço Inox",
                "Materiais similares"
            ]
        },
        {
            title: "Tipos de Corte",
            icon: <Zap size={24} />,
            items: [
                "Cortes Retos Automatizados",
                "Cortes Complexos via Desenho/Molde",
                "Cortes Personalizados Manuais",
                "Reprodução de Modelos"
            ]
        },
        {
            title: "Vantagens",
            icon: <FileText size={24} />,
            items: [
                "Excelente acabamento",
                "Ausência de rebarbas indesejadas",
                "Alta precisão dimensional",
                "Integridade do material mantida"
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
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">OXICORTE E PLASMA</h1>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-gray-600 text-base md:text-xl leading-relaxed space-y-8 text-center md:text-justify font-medium">
                            <p>
                                Nossa empresa se destaca pela qualidade e precisão nos cortes metálicos através da técnica de oxicorte. Esse processo, amplamente utilizado na indústria metalúrgica, nos permite realizar cortes com extrema exatidão, mantendo a integridade e as propriedades dos materiais. Contamos com uma infraestrutura moderna e equipamentos de ponta, que garantem resultados consistentes e de alta performance.
                            </p>
                            <p>
                                A combinação de equipamentos automatizados e manuais, somada à expertise de nossa equipe, nos permite entregar produtos com excelente acabamento, sem rebarbas indesejadas, e com altíssima precisão, independente da complexidade do projeto. Esse compromisso com a qualidade nos torna capazes de atender com excelência a diversos setores industriais.
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
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Tecnologia de Corte</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">Soluções Disponíveis</h2>
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
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-blue-dark mb-4 tracking-tighter uppercase">TECNOLOGIA E PRECISÃO</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium">Equipamentos modernos para garantir o melhor corte.</p>
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
                                <span className="uppercase tracking-[0.2em] text-xs">Consultar Tabelas de Chapas</span>
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

export default OxicorteProductPage;
