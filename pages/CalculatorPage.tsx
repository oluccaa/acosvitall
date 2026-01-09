
import React, { useState, useRef, useEffect } from 'react';
import SteelCalculator from '../components/features/calculator/SteelCalculator';
import UnitConverter from '../components/features/calculator/UnitConverter';
import LinearNesting from '../components/features/calculator/LinearNesting';
import WeldingCalculator from '../components/features/calculator/WeldingCalculator';
import { useTranslation } from 'react-i18next';
import { Calculator, ArrowLeftRight, Scissors, Flame, Box, Maximize2, Minimize2 } from 'lucide-react';
import { EngineeringProvider, useEngineering, TabType } from '../context/EngineeringContext';
import { ASSETS } from '../lib/media';
import WhatsappIcon from '../components/common/icons/WhatsappIcon';

// Helper para gerar link do WhatsApp
const getWhatsappLink = (productName: string) => {
    const phone = "551147972352"; // Número da Aços Vital
    const text = encodeURIComponent(`Olá! Vi o anúncio de *${productName}* na página da Calculadora e gostaria de uma cotação.`);
    return `https://wa.me/${phone}?text=${text}`;
};

// --- ADVERTISING SIDEBAR COMPONENT (SKYSCRAPER STYLE 160x660) ---
const AdSidebar: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
    const ads = side === 'left' ? [
        { img: ASSETS.ADS.CALCULATOR_LEFT, link: getWhatsappLink("Fale com um especialista") }
    ] : [
        { img: ASSETS.ADS.CALCULATOR_RIGHT, link: getWhatsappLink("Fale com um especialista") }
    ];

    return (
        <div className={`hidden xl:flex flex-col items-center pt-8 w-[200px] h-full bg-transparent`}>
            {ads.map((ad, idx) => (
                <a 
                    key={idx} 
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-[160px] h-[660px] rounded-lg overflow-hidden border border-white/10 shadow-2xl transition-all hover:border-brand-orange/50 cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity z-10 duration-500"></div>
                    <img 
                        src={ad.img} 
                        alt="Anúncio Aços Vital" 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#25D366] p-2 rounded-full shadow-lg">
                            <WhatsappIcon size={20} className="text-white" />
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

// --- MAIN CONTENT COMPONENT ---
const CalculatorPageContent: React.FC = () => {
    const { t } = useTranslation();
    const { activeTab, setActiveTab } = useEngineering();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const tabs = [
        { id: 'calculator', label: t('calculatorPage.tabs.calculator'), icon: <Calculator size={18} />, desc: t('calculatorPage.tabs.calculatorDesc') },
        { id: 'nesting', label: t('calculatorPage.tabs.nesting'), icon: <Scissors size={18} />, desc: t('calculatorPage.tabs.nestingDesc') },
        { id: 'welding', label: t('calculatorPage.tabs.welding'), icon: <Flame size={18} />, desc: t('calculatorPage.tabs.weldingDesc') },
        { id: 'converter', label: t('calculatorPage.tabs.converter'), icon: <ArrowLeftRight size={18} />, desc: t('calculatorPage.tabs.converterDesc') },
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'calculator': return <SteelCalculator />;
            case 'nesting': return <LinearNesting />;
            case 'welding': return <WeldingCalculator />;
            case 'converter': return <UnitConverter />;
            default: return <SteelCalculator />;
        }
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <div 
            ref={containerRef}
            className={`
                bg-[#0b1121] text-slate-200 font-sans selection:bg-brand-orange selection:text-white flex overflow-hidden
                ${isFullScreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'min-h-screen relative'}
            `}
        >
            
            {/* Background Grid */}
            <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-blue-light/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            {/* LEFT AD BANNER */}
            <AdSidebar side="left" />

            {/* CENTER CONTENT */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                
                {/* Scrollable Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="w-full max-w-7xl mx-auto flex flex-col min-h-full">
                        
                        {/* Header da Workstation */}
                        <header className="bg-[#0f172a] border border-white/5 rounded-xl shadow-xl p-5 md:p-6 mb-6 flex flex-col gap-6 transition-all duration-300">
                            
                            {/* Line 1: Identity & Controls */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-brand-blue-dark border border-white/10 rounded-xl shadow-2xl hidden sm:block">
                                        <Box size={32} className="text-brand-orange" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight uppercase">
                                                {t('calculatorPage.title')}
                                            </h1>
                                            <button 
                                                onClick={toggleFullScreen}
                                                className="p-2 bg-white/5 hover:bg-brand-orange hover:text-white rounded-lg transition-all border border-white/10 active:scale-90"
                                                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                                            >
                                                {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                            </button>
                                        </div>
                                        <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mt-1">
                                            {t('calculatorPage.subtitle')}
                                        </p>
                                    </div>
                                </div>

                                {/* Dynamic Tech Status for Desktop */}
                                <div className="hidden md:flex items-center gap-4">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-brand-orange uppercase tracking-widest">{t('calculatorPage.common.systemStatus')}</span>
                                        <span className="text-[10px] text-green-400 flex items-center gap-1.5 font-mono">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                            {t('calculatorPage.common.operational')} v5.0.4
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Line 2: Navigation Tabs - Grid System */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/5 pt-6">
                                {tabs.map(tab => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as TabType)}
                                            className={`
                                                relative group flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-1 sm:gap-4 px-3 py-3 sm:py-4 rounded-xl border transition-all duration-300 w-full overflow-hidden
                                                ${isActive 
                                                    ? 'bg-brand-orange text-white border-brand-orange shadow-[0_10px_20px_rgba(234,97,0,0.25)]' 
                                                    : 'bg-[#1e293b]/50 border-white/5 hover:bg-[#2a364d] hover:border-white/10 text-slate-400'
                                                }
                                            `}
                                        >
                                            <div className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-brand-orange'}`}>
                                                {React.cloneElement(tab.icon as React.ReactElement<{ size: number }>, { size: 20 })}
                                            </div>
                                            <div className="text-center sm:text-left overflow-hidden">
                                                <span className={`block text-[10px] md:text-xs font-black uppercase tracking-wide truncate ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                                    {tab.label}
                                                </span>
                                                <span className={`hidden sm:block text-[9px] font-bold uppercase tracking-tighter truncate max-w-[120px] ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                                                    {tab.desc}
                                                </span>
                                            </div>
                                            {isActive && (
                                                <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-bl-full -mr-2 -mt-2"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </header>

                        {/* Área de Conteúdo Principal */}
                        <main className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex-grow pb-12">
                            {renderContent()}
                        </main>

                    </div>
                </div>
            </div>

            {/* RIGHT AD BANNER */}
            <AdSidebar side="right" />

        </div>
    );
};

// Wrapper Principal
const CalculatorPage: React.FC = () => {
    return (
        <EngineeringProvider>
            <CalculatorPageContent />
        </EngineeringProvider>
    );
};

export default CalculatorPage;
