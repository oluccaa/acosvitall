
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS_LIST } from '../../../lib/constants';

interface Product {
    id: string;
    alt: string;
    imageUrl: string;
    href: string;
}

const ProductCard: React.FC<{ product: Product, viewDetailsText: string, isDragging: boolean }> = ({ product, viewDetailsText, isDragging }) => (
    <li className={`snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[32%] lg:w-[24%] 2xl:w-[20%] pl-4 first:pl-0 select-none ${isDragging ? 'pointer-events-none' : ''}`}>
        <a 
            href={product.href} 
            className="block group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out h-full border border-gray-100 bg-gray-100"
            aria-label={`Ver detalhes de ${product.alt}`}
            draggable={false}
        >
            <div
                style={{ backgroundImage: `url(${product.imageUrl})` }}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                role="img"
                aria-label={product.alt}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#081437] via-[#081437]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block px-2 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest bg-brand-orange text-white rounded shadow-sm">
                        Destaque
                    </span>
                    <h3 className="font-bold text-xl md:text-2xl mb-2 leading-tight drop-shadow-md">{product.alt}</h3>
                    <div className="h-0.5 w-12 bg-white/30 mb-4 group-hover:w-full group-hover:bg-brand-orange transition-all duration-500"></div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-orange">
                        {viewDetailsText} <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </a>
    </li>
);

const FeaturedProducts: React.FC = () => {
    const { t } = useTranslation();
    const sliderRef = useRef<HTMLUListElement>(null);
    const animationRef = useRef<number | null>(null);
    
    // Physics & State
    const [isDragging, setIsDragging] = useState(false);
    const pos = useRef({ 
        startX: 0, 
        scrollLeft: 0, 
        x: 0, 
        velocity: 0, 
        lastX: 0, 
        lastTime: 0,
        moved: false 
    });

    const viewDetailsText = t('featuredProducts.viewDetails');

    const startInertia = useCallback(() => {
        if (!sliderRef.current) return;
        
        const slider = sliderRef.current;
        const friction = 0.95; // Desaceleração (0.9 a 0.98)
        
        const step = () => {
            if (Math.abs(pos.current.velocity) < 0.2) {
                // Fim da animação: reativar snap
                slider.style.scrollSnapType = 'x mandatory';
                slider.style.scrollBehavior = 'smooth';
                return;
            }
            
            slider.scrollLeft -= pos.current.velocity;
            pos.current.velocity *= friction;
            animationRef.current = requestAnimationFrame(step);
        };
        
        animationRef.current = requestAnimationFrame(step);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        
        // Cancelar inércia anterior
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        
        setIsDragging(true);
        pos.current.moved = false;
        pos.current.startX = e.pageX - sliderRef.current.offsetLeft;
        pos.current.scrollLeft = sliderRef.current.scrollLeft;
        pos.current.lastX = e.pageX;
        pos.current.lastTime = performance.now();
        pos.current.velocity = 0;

        // Desativar scroll suave e snap para controle total do mouse
        sliderRef.current.style.scrollSnapType = 'none';
        sliderRef.current.style.scrollBehavior = 'auto';
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        
        e.preventDefault();
        const now = performance.now();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - pos.current.startX);
        
        // Calcular velocidade instantânea
        const deltaTime = now - pos.current.lastTime;
        if (deltaTime > 0) {
            const deltaX = e.pageX - pos.current.lastX;
            // Média ponderada para suavizar a velocidade
            pos.current.velocity = (deltaX / deltaTime) * 16; 
        }

        if (Math.abs(walk) > 5) pos.current.moved = true;

        sliderRef.current.scrollLeft = pos.current.scrollLeft - walk;
        
        pos.current.lastX = e.pageX;
        pos.current.lastTime = now;
    };

    const handleMouseUpOrLeave = () => {
        if (!isDragging) return;
        setIsDragging(false);
        startInertia();
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        if (pos.current.moved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!sliderRef.current) return;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        
        const slider = sliderRef.current;
        const scrollAmount = slider.clientWidth * 0.80; 
        
        slider.style.scrollSnapType = 'x mandatory';
        slider.style.scrollBehavior = 'smooth';
        
        slider.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className="py-20 md:py-32 bg-white overflow-hidden relative" aria-labelledby="featured-products-title">
             {/* Background Decorativo */}
             <div className="absolute top-10 left-0 w-full text-center pointer-events-none overflow-hidden opacity-[0.03] select-none">
                <span className="text-[15vw] font-black uppercase text-brand-blue-dark leading-none whitespace-nowrap">
                    Catálogo
                </span>
            </div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-[1920px] relative z-10 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="select-none">
                     <span className="text-brand-orange font-bold tracking-widest text-sm uppercase">Nossos Produtos</span>
                     <h2 id="featured-products-title" className="text-3xl md:text-5xl font-bold text-brand-blue-dark mt-2">
                        {t('featuredProducts.title')}
                    </h2>
                </div>
                
                <div className="flex gap-3">
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Anterior"
                        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-blue-dark hover:border-brand-blue-dark hover:text-white transition-all duration-300 shadow-sm active:scale-90"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        aria-label="Próximo"
                        className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/30 hover:bg-brand-orange-dark transition-all duration-300 hover:scale-110 active:scale-90"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
            
            <div className="relative max-w-[1920px] mx-auto">
                <ul
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseUpOrLeave}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseMove={handleMouseMove}
                    onClickCapture={handleLinkClick}
                    className={`
                        flex overflow-x-auto px-6 sm:px-12 lg:px-24 pb-12 pt-4 scrollbar-hide select-none
                        will-change-scroll
                        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                        ${!isDragging ? 'snap-x snap-mandatory scroll-smooth' : 'snap-none'}
                    `}
                    style={{ 
                        WebkitOverflowScrolling: 'touch',
                        touchAction: 'pan-y'
                    }}
                >
                    {FEATURED_PRODUCTS_LIST.map((product, index) => (
                        <ProductCard 
                            key={`${product.id}-${index}`} 
                            product={{
                                ...product,
                                alt: t(`featuredProducts.items.${product.id}`)
                            }} 
                            viewDetailsText={viewDetailsText}
                            isDragging={isDragging}
                        />
                    ))}
                </ul>

                {/* Sombras laterais para indicação de continuidade */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none z-10 opacity-80"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none z-10 opacity-80"></div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
