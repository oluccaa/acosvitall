
import React, { useState, useEffect } from 'react';
import CallToAction from '../components/common/CallToAction';
import { ASSETS } from '../lib/media';
import { 
    CheckCircle,
    ChevronRight,
    Settings,
    Layers,
    Wrench,
    Disc,
    Maximize,
    Minimize
} from 'lucide-react';

const GroovedProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        ...ASSETS.PRODUCT_PAGES.GROOVED.SLIDES
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // --- 17 Modelos Específicos ---
    const models = [
        { 
            name: "Acoplamentos Flexíveis", 
            sub: "Classe 300 Libras | 20MPA",
            desc: "Permite pequenas movimentações e absorção de vibrações entre tubos. Suporta até 300 libras de pressão (20MPA). Aplicado em sistemas hidráulicos, HVAC, combate a incêndio e instalações industriais que exigem flexibilidade e alta resistência.",
            specs: ["Absorção de Vibração", "Alta Resistência"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.FLEXIVEL 
        },
        { 
            name: "Acoplamentos Redução Flexível", 
            desc: "Conectam tubos de diferentes diâmetros mantendo flexibilidade. Absorvem expansão térmica e desalinhamentos. Utilizados em sistemas hidráulicos, de incêndio e ventilação, onde há transições de diâmetro e necessidade de movimentação do sistema.",
            specs: ["Transição de Diâmetro", "Flexibilidade"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.REDUCAO_FLEX 
        },
        { 
            name: "Acoplamentos Rígido", 
            desc: "Garantem conexão firme e sem movimento entre tubos. Usados quando não se deseja flexibilidade. Comuns em linhas fixas de água, ar comprimido e combate a incêndio, onde o alinhamento é estático e permanente.",
            specs: ["Conexão Firme", "Alinhamento Estático"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.RIGIDO 
        },
        { 
            name: "Cotovelo Ranhurado 45º", 
            desc: "Peça em ângulo para alterar a direção da tubulação em 45°. Facilita curvas suaves em sistemas grooved. Utilizado em redes de incêndio, refrigeração e HVAC, garantindo vedação e montagem rápida com acoplamentos.",
            specs: ["Desvio Suave", "Vedação Perfeita"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.COTOVELO_45 
        },
        { 
            name: "Cotovelo / Curva Ranhurado 90º", 
            desc: "Muda a direção da linha em 90°. Ideal para cantos e alterações de trajeto. Muito usado em redes de sprinklers, água potável e combate a incêndio com sistema grooved, permitindo fácil instalação.",
            specs: ["Desvio Padrão", "Fácil Instalação"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.COTOVELO_90 
        },
        { 
            name: "Cruzeta Mecânica Roscada", 
            desc: "Permite ramificação perpendicular em tubulação existente, com saída roscada. Ideal para sistemas de sprinkler e instalações que exigem derivações pontuais sem desmontagem da linha principal.",
            specs: ["Derivation Pontual", "Saída Roscada"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.CRUZETA_MEC 
        },
        { 
            name: "Cruzeta Ranhurada", 
            desc: "Com quatro saídas ranhuradas, distribui o fluxo em cruz. Aplicada em redes hidráulicas e de incêndio onde é necessário derivar duas direções a partir de uma linha central, mantendo padrão grooved.",
            specs: ["Distribuição em Cruz", "4 Saídas"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.CRUZETA_RAN 
        },
        { 
            name: "Tampão Ranhurado", 
            desc: "Fecha extremidades de tubulações grooved de forma segura e vedada. Usado para bloqueio temporário ou definitivo de redes hidráulicas, combate a incêndio ou linhas de teste e manutenção.",
            specs: ["Fechamento Seguro", "Bloqueio Estanque"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.TAMPAO 
        },
        { 
            name: "Luva Redução Concêntrica Ranhurada", 
            desc: "Conecta tubos de diferentes diâmetros mantendo o centro alinhado. Utilizada em transições verticais ou horizontais em sistemas de água, HVAC e incêndio. Ideal para manter fluxo simétrico.",
            specs: ["Fluxo Simétrico", "Alinhamento Central"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.LUVA_RED 
        },
        { 
            name: "Adaptador de Flange de Pescoço", 
            desc: "Permite transição entre sistema grooved e flanges com pescoço. Aplicado quando é necessário conectar tubulações a válvulas, bombas ou equipamentos que utilizam conexões flangeadas.",
            specs: ["Transição de Sistema", "Conexão a Equipamentos"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.ADAPTADOR 
        },
        { 
            name: "Tee Mecânico U-Bolted Spinkler Roscável", 
            desc: "Permite derivação com saída roscada para sprinkler sem cortar a tubulação. Fixação por abraçadeira em \"U\". Ideal para instalações rápidas em sistemas de combate a incêndio.",
            specs: ["Derivação Rápida", "Fixação U-Bolt"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.TEE_UBOLT 
        },
        { 
            name: "Tee Mecânico Ranhura x Rosca", 
            desc: "Une tubulação ranhurada com derivação roscada. Usado para conectar válvulas, registros ou sprinklers em sistemas mistos. Aplicado em redes hidráulicas e de incêndio com derivações precisas.",
            specs: ["Conexão Mista", "Versatilidade"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.TEE_MEC_ROSCA 
        },
        { 
            name: "Tee Mecânico Ranhura x Ranhura", 
            desc: "Faz a derivação de uma linha grooved para outra também grooved. Usado em sistemas que exigem ampliação de rede sem solda ou rosca. Fácil instalação em campo.",
            specs: ["Ampliação de Rede", "Totalmente Grooved"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.TEE_MEC_RAN 
        },
        { 
            name: "Tee Ranhurado", 
            desc: "Peça em “T” totalmente ranhurada para conexões de três ramificações. Utilizado em redes principais e derivadas de água, HVAC e combate a incêndio. Garantia de montagem rápida e vedada.",
            specs: ["3 Ramificações", "Montagem Rápida"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.TEE_RAN 
        },
        { 
            name: "Tee Redução Ranhura x Ranhura", 
            desc: "Faz derivação ranhurada com redução de diâmetro. Ideal para saídas menores a partir de uma linha principal. Muito aplicado em redes de sprinklers e derivações industriais otimizadas.",
            specs: ["Redução de Diâmetro", "Derivação Otimizada"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.TEE_RED_RAN 
        },
        { 
            name: "Tee Redução Ranhura x Rosca", 
            desc: "Permite saída roscada com redução de diâmetro a partir de linha ranhurada. Usado para ligar sprinklers, registros ou válvulas em pontos com necesidad de menor vazão.",
            specs: ["Saída Menor Vazão", "Conexão de Acessórios"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.TEE_RED_ROSCA 
        },
        { 
            name: "Flange Ranhurada Bipartido", 
            desc: "Facilita conexão entre sistema grooved e flangeado. Por ser bipartido, permite instalação sem desmontar a tubulação. Ideal para manutenções e acoplamentos com bombas, válvulas e equipamentos industriais.",
            specs: ["Instalação Fácil", "Manutenção Ágil"],
            image: ASSETS.PRODUCT_PAGES.GROOVED.MODELS.FLANGE_BIP 
        }
    ];

    const techElements = [
        { icon: <Layers size={24} />, title: "Tubo com ranhura", desc: "Base do sistema." },
        { icon: <Disc size={24} />, title: "Anel de vedação", desc: "Garante a estanqueidade." },
        { icon: <Settings size={24} />, title: "Segmento", desc: "Une os tubos." },
        { icon: <Wrench size={24} />, title: "Parafusos e Porcas", desc: "Fixam os segmentos." },
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
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">LINHA GROOVED</h1>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12 text-center">
                             <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">ENGENHARIA E INOVAÇÃO</span>
                             <h2 className="text-3xl md:text-5xl font-black text-brand-blue-dark mt-6 tracking-tight">Tecnologia de Ranhuras</h2>
                             <p className="mt-6 text-gray-500 text-lg max-w-3xl mx-auto font-medium">
                                A tecnologia de ranhuras é a combinação de quatro elementos-chaves para uma união estanque e resistente.
                             </p>
                        </div>

                        <div className="text-gray-600 text-base md:text-xl leading-relaxed space-y-8 text-center md:text-justify font-medium mb-20">
                            <p>
                                Os tubos e conexões grooved Aços Vital são ideais para sistemas de <strong>combate a incêndio, HVAC, água e gás</strong>, oferecendo instalação rápida, segura e com excelente vedação. O sistema grooved utiliza ranhuras nas extremidades dos tubos, unidas por acoplamentos K, que garantem flexibilidade e fácil manutenção.
                            </p>
                            <p>
                                Esse tipo de conexão reduz significativamente o tempo de montagem e <strong>dispensa o uso de solda ou rosca</strong>, tornando a instalação mais limpa e eficiente. Além disso, permite desmontagens rápidas em eventuais manutenções sem a necessidade de cortes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                            <div className="relative flex justify-center">
                                 <img 
                                    src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-0%2F850%2F1911850%2FCU3jUjet%2F4c5807bb73d4482a9b03646b17efbc57&methods=resize%2C800%2C5000" 
                                    alt="Tecnologia de Ranhuras" 
                                    className="w-[85%] h-auto object-contain" 
                                    loading="lazy"
                                />
                            </div>

                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                <h3 className="text-2xl font-black text-brand-blue-dark mb-8 border-b border-gray-200 pb-4 uppercase tracking-tight">Elementos do Sistema</h3>
                                <div className="space-y-6">
                                    {techElements.map((item, idx) => (
                                        <div key={idx} className="flex items-start group">
                                            <div className="p-3 bg-white rounded-xl text-brand-orange mr-4 flex-shrink-0 shadow-sm border border-gray-100 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-brand-blue-dark leading-tight mb-1 uppercase tracking-tight">{item.title}</h4>
                                                <p className="text-gray-600 text-sm font-medium leading-snug">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-10 border-l-8 border-brand-blue-dark shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange mr-4">
                                        <Minimize size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-brand-blue-dark uppercase tracking-tight">Acoplamentos Rígidos</h3>
                                </div>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    Não permitem movimento e podem ser usados sempre que a imobilidade na união do tubo for necessária, semelhante a uma união flangeada ou soldada.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-10 border-l-8 border-brand-orange shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange mr-4">
                                        <Maximize size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-brand-blue-dark uppercase tracking-tight">Acoplamentos Flexíveis</h3>
                                </div>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    Permitem uma quantidade limitada de movimento angular, absorvendo vibrações e acomodando pequenos desalinhamentos na rede.
                                </p>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

            <section className="py-20 md:py-28 bg-brand-blue-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24">
                            <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Linha Completa</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">Modelos Grooved</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28">
                            {models.map((model, idx) => (
                                <div key={idx} className="group flex flex-col bg-white rounded-3xl shadow-2xl transition-all duration-500 relative transform hover:-translate-y-2">
                                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44 h-44 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-gray-100 z-10 transition-transform duration-700 group-hover:scale-105">
                                        <img src={model.image} alt={model.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                    </div>
                                    <div className="p-8 pt-36 md:pt-40 flex-grow flex flex-col">
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl md:text-2xl font-black text-brand-blue-dark tracking-tight uppercase leading-tight">{model.name}</h3>
                                            {model.sub && <span className="block text-[10px] font-black text-brand-orange mt-2 tracking-widest uppercase">{model.sub}</span>}
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

            <CallToAction />
        </div>
    );
};

export default GroovedProductPage;
