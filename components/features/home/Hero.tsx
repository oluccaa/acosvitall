
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../../context/I18nContext';
import { ChevronDown, PlayCircle } from 'lucide-react';

const VIDEO_URL = "https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/hero/videosite.avif";

const Hero: React.FC = () => {
  const { t } = useI18n();

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('features');
    if (targetElement) {
        const headerElement = document.querySelector('header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative h-[85vh] min-h-[500px] md:h-[90vh] 2xl:max-h-[1000px] text-white overflow-hidden w-full bg-[#050c21]"
      aria-label="Apresentação Institucional"
    >
      {/* Background Media - Premium Presentation */}
      <div className="absolute inset-0 z-0">
        <img
          src={VIDEO_URL}
          alt="Aços Vital - Excelência Industrial"
          className="w-full h-full object-cover object-center animate-pulse-slow scale-105"
          style={{ 
            animation: 'ken-burns 20s infinite alternate ease-in-out',
            filter: 'brightness(0.7)'
          }}
        />
        {/* Overlays para profundidade e contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#081437] via-[#081437]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#081437] via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Linhas decorativas de Engenharia */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
        <div className="container mx-auto h-full px-6 sm:px-12 lg:px-24 max-w-7xl relative">
          <div className="absolute left-0 top-0 w-px h-full bg-white/20"></div>
          <div className="absolute right-0 top-0 w-px h-full bg-white/20"></div>
        </div>
      </div>

      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl">
          <div className="max-w-3xl">
            {/* Badge Premium */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-slide-in">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
              Líder em Soluções Industriais
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                Excelência em Aços:<br/>
                <span className="text-brand-orange">A confiança</span> é o que<br/>
                nos conecta!
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl mb-10 text-gray-300 animate-slide-in font-medium max-w-2xl leading-relaxed" style={{ animationDelay: '0.4s' }}>
                Chapas, Tubos, Flanges, Conexões e Aços em geral. <br className="hidden md:block"/>
                Trazemos soluções inovadoras para desafios de alta complexidade.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-in" style={{ animationDelay: '0.6s' }}>
              <Link 
                  to="/products"
                  className="w-full sm:w-auto bg-brand-orange text-white font-black py-4 px-10 rounded-xl hover:bg-brand-orange-dark transition-all duration-300 transform hover:scale-105 text-xs uppercase tracking-[0.2em] shadow-[0_15px_35px_rgba(194,65,12,0.3)] border border-brand-orange-dark/20 text-center"
              >
                Nossas Soluções
              </Link>
              
              <Link 
                  to="/contact"
                  className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition-all duration-300 text-xs uppercase tracking-[0.2em] border border-white/10 text-center flex items-center justify-center gap-2 group"
              >
                <PlayCircle size={18} className="text-brand-orange group-hover:scale-110 transition-transform" />
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <a href="#features" onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
        aria-label="Rolar para baixo">
        <span className="text-[9px] uppercase tracking-[0.3em] mb-3 text-white/50 group-hover:text-brand-orange transition-colors font-black">Explorar</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 group-hover:border-brand-orange/50 transition-colors">
          <div className="w-1 h-2 bg-brand-orange rounded-full animate-bounce"></div>
        </div>
      </a>

      {/* Ken Burns Animation Definition */}
      <style>{`
        @keyframes ken-burns {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Hero;
