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
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-7xl mx-auto bg-brand-blue-dark border border-white/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
                
                <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-brand-orange text-white rounded-full hidden sm:block">
                        <Cookie size={24} />
                    </div>
                    <div className="text-sm text-slate-200 leading-relaxed font-medium">
                        <p>
                            {t('privacy.cookieBanner.text')}{' '}
                            <a href="#/privacy" className="text-white font-bold underline hover:text-brand-orange transition-colors">
                                {t('privacy.cookieBanner.link')}
                            </a>.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-slate-500 text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        {t('privacy.cookieBanner.decline')}
                    </button>
                    <button 
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-8 py-2.5 rounded-lg bg-brand-orange text-white font-bold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-brand-orange/30 text-xs uppercase tracking-widest border border-white/10"
                    >
                        {t('privacy.cookieBanner.accept')}
                    </button>
                </div>

                <button 
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white transition-colors md:hidden"
                    aria-label="Fechar"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;