
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ChevronDown, PlayCircle } from 'lucide-react';

const VIDEO_URL = "https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/hero/videosite.avif";

const Hero: React.FC = () => {
  const { t } = useTranslation();

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
      className="relative h-[85vh] min-h-[620px] md:h-[90vh] 2xl:max-h-[1000px] text-white overflow-hidden w-full bg-[#050c21]"
      aria-label="Apresentação Institucional"
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img
          src={VIDEO_URL}
          alt="Aços Vital - Excelência Industrial"
          className="w-full h-full object-cover object-center scale-105"
          style={{ 
            animation: 'ken-burns 25s infinite alternate ease-in-out',
            filter: 'brightness(0.65)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081437] via-[#081437]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#081437] via-transparent to-transparent opacity-90"></div>
      </div>

      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl pb-24 md:pb-0">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 animate-slide-in">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
              {t('homeHero.badge')}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <Trans 
                    i18nKey="homeHero.title" 
                    components={{ 
                        orange: <span className="text-brand-orange" />,
                        br: <br/> 
                    }} 
                />
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 text-gray-300 animate-slide-in font-medium max-w-2xl leading-relaxed" style={{ animationDelay: '0.4s' }}>
                {t('homeHero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-in" style={{ animationDelay: '0.6s' }}>
              <Link 
                  to="/products"
                  className="w-full sm:w-auto bg-brand-orange text-white font-black py-4 px-10 rounded-xl hover:bg-brand-orange-dark transition-all duration-300 transform hover:scale-105 text-xs uppercase tracking-[0.2em] shadow-[0_15px_35px_rgba(194,65,12,0.3)] border border-brand-orange-dark/20 text-center"
              >
                {t('homeHero.ctaMain')}
              </Link>
              
              <Link 
                  to="/contact"
                  className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition-all duration-300 text-xs uppercase tracking-[0.2em] border border-white/10 text-center flex items-center justify-center gap-2 group"
              >
                <PlayCircle size={18} className="text-brand-orange group-hover:scale-110 transition-transform" />
                {t('homeHero.ctaContact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <a 
        href="#features" 
        onClick={handleScrollDown}
        className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group select-none opacity-80 hover:opacity-100 transition-opacity"
        aria-label="Rolar para baixo"
      >
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-2 md:mb-4 text-white/50 group-hover:text-brand-orange transition-all duration-500 font-black">
          {t('homeHero.scrollText')}
        </span>
        
        <div className="relative w-5 h-8 md:w-7 md:h-12 border-2 border-white/20 rounded-full flex justify-center p-1 md:p-1.5 group-hover:border-brand-orange/40 transition-all duration-500">
          <div className="w-1 h-2 md:w-1.5 md:h-2.5 bg-brand-orange rounded-full animate-scroll-down shadow-[0_0_12px_rgba(194,65,12,0.8)]"></div>
        </div>
        
        <div className="absolute -bottom-6 w-16 h-16 bg-brand-orange/0 group-hover:bg-brand-orange/10 blur-2xl rounded-full transition-all duration-700"></div>
      </a>

      <style>{`
        @keyframes ken-burns {
          from { transform: scale(1.05); }
          to { transform: scale(1.2); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }
        .animate-scroll-down {
          animation: scroll-down 2.2s infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
      `}</style>
    </section>
  );
};

export default Hero;
