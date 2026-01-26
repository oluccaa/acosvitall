
import React, { useRef, useState, useCallback } from 'react';
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
    <li className="snap-center flex-shrink-0 w-[70%] sm:w-[35%] md:w-[28%] lg:w-[20%] 2xl:w-[16%] select-none">
        <Link 
            to={product.href} 
            className="block group relative flex flex-col items-center text-center focus:outline-none"
            aria-label={`Ver detalhes de ${product.alt}`}
            draggable={false}
            onClickCapture={(e) => isDragging && e.preventDefault()}
        >
            {/* Foto Circular Padronizada */}
            <div className="relative w-full aspect-square rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-gray-100 mb-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-brand-orange/20 group-hover:border-brand-orange/20">
                <div
                    style={{ backgroundImage: `url(${product.imageUrl})` }}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    role="img"
                    aria-label={product.alt}
                />
                <div className="absolute inset-0 bg-brand-blue-dark/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Texto do Produto */}
            <div className="space-y-2">
                <h3 className="font-black text-brand-blue-dark text-sm md:text-base uppercase tracking-tight leading-tight group-hover:text-brand-orange transition-colors">
                    {product.alt}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-brand-orange opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-[10px] font-black uppercase tracking-widest">{viewDetailsText}</span>
                    <ArrowRight size={12} strokeWidth={3} />
                </div>
            </div>
        </Link>
    </li>
);

const FeaturedProducts: React.FC = () => {
    const { t } = useTranslation();
    const sliderRef = useRef<HTMLUListElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const pos = useRef({ startX: 0, scrollLeft: 0, moved: false });

    const viewDetailsText = t('featuredProducts.viewDetails');

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        pos.current.moved = false;
        pos.current.startX = e.pageX - sliderRef.current.offsetLeft;
        pos.current.scrollLeft = sliderRef.current.scrollLeft;
        sliderRef.current.style.scrollSnapType = 'none';
        sliderRef.current.style.scrollBehavior = 'auto';
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - pos.current.startX);
        if (Math.abs(walk) > 5) pos.current.moved = true;
        sliderRef.current.scrollLeft = pos.current.scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        if (!isDragging || !sliderRef.current) return;
        setIsDragging(false);
        sliderRef.current.style.scrollSnapType = 'x mandatory';
        sliderRef.current.style.scrollBehavior = 'smooth';
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!sliderRef.current) return;
        const scrollAmount = sliderRef.current.clientWidth * 0.8;
        sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    };

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden relative" aria-labelledby="featured-products-title">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="text-center md:text-left">
                        <span className="text-brand-orange font-black tracking-[0.3em] text-[10px] uppercase bg-brand-orange/5 px-4 py-1.5 rounded-full border border-brand-orange/10">Excelência em Aço</span>
                        <h2 id="featured-products-title" className="text-3xl md:text-5xl font-black text-brand-blue-dark mt-4 tracking-tighter">
                            {t('featuredProducts.title')}
                        </h2>
                    </div>
                    
                    <div className="flex gap-3">
                        <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-brand-blue-dark hover:text-white transition-all active:scale-90 shadow-sm"><ChevronLeft size={24} /></button>
                        <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/20 hover:bg-brand-orange-dark transition-all active:scale-90"><ChevronRight size={24} /></button>
                    </div>
                </div>
            </div>
            
            <div className="relative">
                <ul
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseUpOrLeave}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseMove={handleMouseMove}
                    className={`flex overflow-x-auto px-6 sm:px-12 lg:px-[calc((100vw-1280px)/2+24px)] pb-12 scrollbar-hide gap-8 md:gap-12 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                >
                    {FEATURED_PRODUCTS_LIST.map((product, index) => (
                        <ProductCard 
                            key={`${product.id}-${index}`} 
                            product={{ ...product, alt: t(`featuredProducts.items.${product.id}`) }} 
                            viewDetailsText={viewDetailsText}
                            isDragging={isDragging}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FeaturedProducts;
