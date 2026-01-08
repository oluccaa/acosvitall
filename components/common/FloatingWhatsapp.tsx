import React from 'react';
import WhatsappIcon from './icons/WhatsappIcon';

const FloatingWhatsapp: React.FC = () => {
    return (
        <a 
            href="https://wa.me/551147972352" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group overflow-visible"
            aria-label="Conversar no WhatsApp"
        >
            {/* Efeito de pulso sutil */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40 transition-opacity"></span>
            
            <div className="relative z-10">
                <WhatsappIcon size={32} />
            </div>

            {/* Tooltip opcional */}
            <span className="absolute right-full mr-4 bg-white text-gray-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
                Fale Conosco
            </span>
        </a>
    );
};

export default FloatingWhatsapp;