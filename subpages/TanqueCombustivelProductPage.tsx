
import React, { useState, useEffect } from 'react';
import CallToAction from '../components/common/CallToAction';
import { ASSETS } from '../lib/media';
import { 
    CheckCircle,
    ChevronRight,
    FileText,
    Settings,
    Ruler,
    Layers,
    Paintbrush,
    ClipboardCheck,
    Camera,
    Flame,
    Wrench,
    Factory,
    Scan
} from 'lucide-react';

const TanqueCombustivelProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        ...ASSETS.PRODUCT_PAGES.TANQUES.SLIDES
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // --- PRODUTOS ---
    const productModels = [
        { 
            name: "Tanque Aéreo (Vertical/Horizontal)", 
            desc: "Tanques metálicos para armazenamento de combustíveis e óleos acima do solo. Construídos em aço carbono com bacia de contenção integrada opcional.",
            specs: ["Norma NBR 15461", "Capacidades Variadas", "Fácil Instalação"],
            image: ASSETS.PRODUCT_PAGES.TANQUES.MODELS.AEREO 
        },
        { 
            name: "Tanque Jaquetado (Subterrâneo)", 
            desc: "Sistema de parede dupla (aço carbono + fibra de vidro) com monitoramento intersticial para evitar vazamentos e contaminação do solo.",
            specs: ["Norma NBR 16161", "Segurança Ambiental", "Postos de Serviço"],
            image: ASSETS.PRODUCT_PAGES.TANQUES.MODELS.JAQUETADO 
        },
        { 
            name: "Tanque para GLP", 
            desc: "Vasos de pressão projetados especificamente para o armazenamento seguro de Gás Liquefeito de Petróleo, atendendo rigorosas normas de segurança.",
            specs: ["ASME Seção VIII", "Alta Pressão", "Indústria/Comércio"],
            image: ASSETS.PRODUCT_PAGES.TANQUES.MODELS.GLP 
        },
        { 
            name: "Módulos de Abastecimento", 
            desc: "Soluções completas (Skids) que integram tanque e bomba de abastecimento, ideais para frotas próprias, obras e agronegócio.",
            specs: ["Solução Plug & Play", "Mobilidade", "Gestão de Frota"],
            image: ASSETS.PRODUCT_PAGES.TANQUES.MODELS.MODULOS 
        },
    ];

    // --- SERVIÇOS ---
    const services = [
        {
            title: "Inspeção de Pintura",
            icon: <Paintbrush size={32} />,
            description: "A Inspeção de Pintura Industrial assegura a qualidade e durabilidade dos revestimentos aplicados em estruturas e equipamentos.",
            benefits: ["Evita falhas como bolhas", "Protege contra corrosão", "Conformidade técnica"],
            docs: "Procedimentos, normas e relatórios."
        },
        {
            title: "Inspeção de Equipamentos",
            icon: <Settings size={32} />,
            description: "Garante segurança e eficiência das suas máquinas, prevenindo falhas e otimizando o desempenho conforme normas regulamentadoras.",
            benefits: ["Aumenta produtividade", "Prolonga vida útil", "Manutenção preventiva"],
            docs: "Procedimentos, normas e relatórios."
        },
        {
            title: "Inspeção de Fabricação",
            icon: <Factory size={32} />,
            description: "Garantia da qualidade e segurança dos processos produtivos de caldeiraria e tubulação desde a análise de materiais.",
            benefits: ["Segurança operacional", "Qualidade assegurada", "Conformidade ASME/API"],
            docs: "Especificações, Desenhos, Relatórios."
        },
        {
            title: "Inspeção por Drone",
            icon: <Camera size={32} />,
            description: "Drones com câmeras térmicas e de alta resolução para avaliar a integridade de estruturas em áreas de difícil acesso.",
            benefits: ["Redução de riscos", "Acesso a áreas difíceis", "Agilidade"],
            docs: "Relatórios de imagem e análise."
        },
        {
            title: "Inspeção de Soldagem",
            icon: <Flame size={32} />,
            description: "Testes rigorosos em cada etapa do processo de soldagem para identificar defeitos e garantir a integridade das estruturas.",
            benefits: ["Integridade estrutural", "Prevenção de falhas", "Redução de riscos"],
            docs: "Procedimentos, normas e relatórios."
        },
        {
            title: "Auditoria de Soldagem",
            icon: <ClipboardCheck size={32} />,
            description: "Análise dos procedimentos de soldagem, qualificações e desempenho para otimizar processos e reduzir retrabalhos.",
            benefits: ["Melhoria na qualidade", "Redução de retrabalho", "Otimização de custos"],
            docs: "WPS, Qualificações, Registros."
        },
        {
            title: "Controle Dimensional",
            icon: <Ruler size={32} />,
            description: "Equipamentos de alta precisão para evitar problemas de montagem e garantir a conformidade milimétrica das peças.",
            benefits: ["Precisão milimétrica", "Garantia de tolerâncias", "Qualidade final"],
            docs: "Procedimentos e relatórios técnicos."
        },
        {
            title: "Manutenção Industrial",
            icon: <Wrench size={32} />,
            description: "Atividades especializadas para garantir o funcionamento eficiente de instalações, desde diagnósticos até montagens.",
            benefits: ["Segurança operacional", "Redução de custos", "Alta produtividade"],
            docs: "Procedimentos e certificados."
        },
        {
            title: "Manutenção Tanques API 650",
            icon: <Scan size={32} />,
            description: "Serviços especializados para garantir a integridade e eficiência de tanques de armazenamento conforme normas API 650.",
            benefits: ["Alta durabilidade", "Conformidade normativa", "Garantia de qualidade"],
            docs: "Procedimentos, instruções e EPS."
        }
    ];

    const technicalData = [
        {
            title: "Normas de Fabricação",
            icon: <FileText size={24} />,
            items: [
                "NBR 15461 (Aéreos)",
                "NBR 16161 (Subterrâneos)",
                "ASME VIII (Vasos de Pressão)"
            ]
        },
        {
            title: "Capacidades",
            icon: <Ruler size={24} />,
            items: [
                "De 5.000 a 60.000 litros",
                "Dimensões padronizadas",
                "Projetos sob medida"
            ]
        },
        {
            title: "Acessórios",
            icon: <Settings size={24} />,
            items: [
                "Boca de visita",
                "Escada e Guarda-corpo",
                "Bacia de contenção"
            ]
        },
        {
            title: "Segurança",
            icon: <Layers size={24} />,
            items: [
                "Parede dupla (Jaquetado)",
                "Sensor de vazamento",
                "Teste de estanqueidade"
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
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">TANQUES E SERVIÇOS</h1>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-gray-600 text-base md:text-xl leading-relaxed space-y-8 text-center md:text-justify font-medium">
                            <p>
                                A fabricação e reforma de <strong>Tanques de Combustível e Tanques GLP</strong> na Aços Vital é fundamental para garantir segurança e eficiência. Oferecemos restauração completa para que seu tanque retorne ao mercado com desempenho equivalente a um novo.
                            </p>
                            <div className="bg-brand-blue-light/10 p-6 rounded-xl border border-brand-blue-light/20">
                                <p className="text-brand-blue-dark font-black text-center text-lg md:text-xl uppercase">
                                    CAPACIDADE: Tanques de 10.000 a 200.000 litros.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-brand-off-white relative overflow-hidden">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24">
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Linha de Produtos</span>
                            <h2 className="text-3xl md:text-5xl font-black text-brand-blue-dark mt-6 tracking-tight">Modelos de Tanques</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-28">
                            {productModels.map((model, idx) => (
                                <div key={idx} className="group flex flex-col bg-white rounded-3xl shadow-2xl transition-all duration-500 relative transform hover:-translate-y-2">
                                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44 h-44 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-gray-100 z-10 transition-transform duration-700 group-hover:scale-105">
                                        <img src={model.image} alt={model.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                    </div>
                                    <div className="p-8 pt-36 md:pt-40 flex-grow flex flex-col">
                                        <div className="text-center mb-4">
                                            <h3 className="text-lg font-black text-brand-blue-dark tracking-wide uppercase leading-tight">{model.name}</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow text-center">{model.desc}</p>
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

            <section className="py-24 bg-brand-blue-dark text-white relative">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Soluções Completas</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">Nossos Serviços</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, idx) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group flex flex-col">
                                    <div className="flex items-center mb-8">
                                        <div className="p-3 bg-brand-orange/20 rounded-xl text-brand-orange mr-4 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500">
                                            {service.icon}
                                        </div>
                                        <h3 className="text-xl font-black uppercase tracking-tight leading-tight">{service.title}</h3>
                                    </div>
                                    <p className="text-blue-100/70 text-sm leading-relaxed mb-8 flex-grow">{service.description}</p>
                                    <div className="pt-6 border-t border-white/10">
                                        <h4 className="text-[10px] font-black text-brand-orange uppercase tracking-widest mb-4">Principais Benefícios</h4>
                                        <ul className="space-y-2">
                                            {service.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start text-[11px] text-gray-400 font-medium">
                                                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-1 mr-3 flex-shrink-0"></span>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-blue-dark mb-4 tracking-tighter uppercase">DADOS TÉCNICOS</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium">Garantia de qualidade e conformidade normativa.</p>
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
                                <span className="uppercase tracking-[0.2em] text-xs">Consultar Tabelas Técnicas</span>
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

export default TanqueCombustivelProductPage;
