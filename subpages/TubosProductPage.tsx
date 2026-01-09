
import React, { useState, useEffect } from 'react';
import CallToAction from '../components/common/CallToAction';
import { ASSETS } from '../lib/media';
import { CheckCircle, ChevronRight, FileText, Settings, Ruler, Layers } from 'lucide-react';

const TubosProductPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [...ASSETS.PRODUCT_PAGES.TUBOS.SLIDES];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const models = [
        { name: "AÇO INOX", desc: "Projetos que demandam alta resistência à corrosão e acabamento estético.", image: ASSETS.PRODUCT_PAGES.TUBOS.MODELS.INOX },
        { name: "AÇO CARBONO", desc: "Indispensáveis para condução de fluídos em instalações industriais.", image: ASSETS.PRODUCT_PAGES.TUBOS.MODELS.CARBONO },
        { name: "INDUSTRIAIS", desc: "Perfis redondos, quadrados e retangulares para suporte estrutural.", image: ASSETS.PRODUCT_PAGES.TUBOS.MODELS.INDUSTRIAIS },
        { name: "MECÂNICOS", desc: "Tubos laminados com elevada resistência para usinagem e construção mecânica.", image: ASSETS.PRODUCT_PAGES.TUBOS.MODELS.MECANICOS },
    ];

    return (
        <div className="bg-white">
            <section className="relative h-[40vh] min-h-[350px] overflow-hidden bg-gray-900 flex items-center justify-center">
                {slides.map((img, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}></div>
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                ))}
                <div className="relative z-20 text-center animate-in fade-in zoom-in duration-700">
                    <div className="w-20 h-1.5 bg-brand-orange mx-auto mb-6 rounded-full shadow-lg"></div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-widest">TUBOS</h1>
                </div>
            </section>

            <section className="py-24 bg-brand-blue-dark">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {models.map((model, idx) => (
                            <div key={idx} className="group flex flex-col bg-white rounded-2xl shadow-lg mt-24 mb-4 transform hover:-translate-y-1 transition-all">
                                <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full border-8 border-white overflow-hidden bg-white z-10">
                                    <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6 pt-24 text-center">
                                    <h3 className="text-lg font-bold text-brand-blue-dark tracking-wide uppercase mb-4">{model.name}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{model.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-brand-blue-dark mb-12">ESPECIFICAÇÕES TÉCNICAS</h2>
                    <a href="/tables" className="inline-flex items-center bg-brand-orange text-white font-bold py-4 px-10 rounded-full hover:bg-brand-orange-dark transition-all duration-300 shadow-lg transform hover:-translate-y-1 group">
                        <span className="uppercase tracking-wide text-sm">Ver Tabelas de Tubos</span>
                        <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>
            <CallToAction />
        </div>
    );
};

export default TubosProductPage;
