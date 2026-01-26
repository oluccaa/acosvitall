
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie, X } from 'lucide-react';

const CookieBanner: React.FC = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('acosvital_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('acosvital_cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('acosvital_cookie_consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        /* 
           Posicionamento dinâmico:
           Mobile: bottom-[90px] (80px da BottomBar + 10px de margem)
           Desktop: bottom-6
        */
        <div className="fixed bottom-[90px] lg:bottom-6 left-0 right-0 z-[210] px-4 animate-in slide-in-from-bottom-4 duration-500 pointer-events-none">
            <div className="max-w-7xl mx-auto pointer-events-auto">
                <div className="bg-brand-blue-dark/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 ring-1 ring-white/5">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="p-2.5 bg-brand-orange/20 rounded-xl text-brand-orange hidden sm:block shrink-0">
                            <Cookie size={24} />
                        </div>
                        <div className="text-xs md:text-sm text-gray-300 leading-relaxed text-center md:text-left">
                            <p>
                                {t('privacy.cookieBanner.text')}{' '}
                                <a href="/privacy" className="text-white font-black underline hover:text-brand-orange transition-colors">
                                    {t('privacy.cookieBanner.link')}
                                </a>.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            onClick={handleDecline}
                            className="flex-1 md:flex-none px-5 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-[10px] font-black uppercase tracking-widest"
                        >
                            {t('privacy.cookieBanner.decline')}
                        </button>
                        <button 
                            onClick={handleAccept}
                            className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-brand-orange text-white font-black hover:bg-brand-orange-dark transition-all shadow-lg shadow-brand-orange/20 text-[10px] uppercase tracking-widest active:scale-95"
                        >
                            {t('privacy.cookieBanner.accept')}
                        </button>
                    </div>

                    <button 
                        onClick={() => setIsVisible(false)}
                        className="absolute top-3 right-3 p-1.5 text-gray-500 hover:text-white transition-colors md:hidden"
                    >
                        <X size={16} />
                        <span className="sr-only">{t('layout.close')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
