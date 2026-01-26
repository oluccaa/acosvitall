
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
    <li className={`snap-center flex-shrink-0 w-[80%] sm:w-[42%] md:w-[30%] lg:w-[22%] 2xl:w-[18%] select-none`}>
        <Link 
            to={product.href} 
            className="block group relative aspect-[3/3.8] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out h-full border border-gray-100 bg-gray-100"
            aria-label={`Ver detalhes de ${product.alt}`}
            draggable={false}
        >
            <div
                style={{ backgroundImage: `url(${product.imageUrl})` }}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                role="img"
                aria-label={product.alt}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#081437] via-[#081437]/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-white">
                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block px-2 py-0.5 mb-2 text-[9px] font-bold uppercase tracking-widest bg-brand-orange text-white rounded shadow-sm">
                        Destaque
                    </span>
                    <h3 className="font-bold text-lg md:text-xl mb-2 leading-tight drop-shadow-md">{product.alt}</h3>
                    <div className="h-0.5 w-10 bg-white/30 mb-3 group-hover:w-full group-hover:bg-brand-orange transition-all duration-500"></div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                        {viewDetailsText} <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
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
        const friction = 0.95; 
        
        const step = () => {
            if (Math.abs(pos.current.velocity) < 0.2) {
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
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        
        setIsDragging(true);
        pos.current.moved = false;
        pos.current.startX = e.pageX - sliderRef.current.offsetLeft;
        pos.current.scrollLeft = sliderRef.current.scrollLeft;
        pos.current.lastX = e.pageX;
        pos.current.lastTime = performance.now();
        pos.current.velocity = 0;

        sliderRef.current.style.scrollSnapType = 'none';
        sliderRef.current.style.scrollBehavior = 'auto';
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        
        e.preventDefault();
        const now = performance.now();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - pos.current.startX);
        
        const deltaTime = now - pos.current.lastTime;
        if (deltaTime > 0) {
            const deltaX = e.pageX - pos.current.lastX;
            pos.current.velocity = (deltaX / deltaTime) * 16; 
        }

        // Aumentado threshold para 10px para evitar falsos positivos de "moved" em cliques
        if (Math.abs(walk) > 10) pos.current.moved = true;
        sliderRef.current.scrollLeft = pos.current.scrollLeft - walk;
        
        pos.current.lastX = e.pageX;
        pos.current.lastTime = now;
    };

    const handleMouseUpOrLeave = () => {
        if (!isDragging) return;
        setIsDragging(false);
        startInertia();
    };

    // Previne a navegação apenas se o mouse tiver se movido significativamente (arrastado o carrossel)
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
        <section className="py-12 md:py-20 bg-white overflow-hidden relative" aria-labelledby="featured-products-title">
             <div className="absolute top-10 left-0 w-full text-center pointer-events-none overflow-hidden opacity-[0.02] select-none">
                <span className="text-[12vw] font-black uppercase text-brand-blue-dark leading-none whitespace-nowrap">
                    Catálogo
                </span>
            </div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl relative z-10 mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="select-none">
                     <span className="text-brand-orange font-bold tracking-widest text-xs uppercase">Nossos Produtos</span>
                     <h2 id="featured-products-title" className="text-2xl md:text-4xl font-bold text-brand-blue-dark mt-1">
                        {t('featuredProducts.title')}
                    </h2>
                </div>
                
                <div className="flex gap-3">
                    <button
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-blue-dark hover:border-brand-blue-dark hover:text-white transition-all duration-300 shadow-sm active:scale-90"
                        aria-label="Ver produtos anteriores"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/30 hover:bg-brand-orange-dark transition-all duration-300 hover:scale-110 active:scale-90"
                        aria-label="Ver próximos produtos"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            
            <div className="relative">
                <ul
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseUpOrLeave}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseMove={handleMouseMove}
                    onClickCapture={handleLinkClick}
                    className={`
                        flex overflow-x-auto px-6 sm:px-12 lg:px-[calc((100vw-1280px)/2+24px)] pb-10 pt-2 scrollbar-hide select-none gap-4 md:gap-6
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

                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none z-10 opacity-60"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none z-10 opacity-60"></div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
