
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { FEATURED_PRODUCTS_LIST } from '../../../lib/constants';

interface Product {
    id: string;
    alt: string;
    imageUrl: string;
    href: string;
}

const ProductCard: React.FC<{ product: Product, viewDetailsText: string, isDragging: boolean }> = ({ product, viewDetailsText, isDragging }) => (
    <li className="snap-center flex-shrink-0 w-[220px] md:w-[260px] select-none">
        <Link 
            to={product.href} 
            className="block group relative aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100 focus:outline-none transition-all duration-500 hover:shadow-2xl hover:shadow-brand-orange/10"
            aria-label={`Ver detalhes de ${product.alt}`}
            draggable={false}
            onClickCapture={(e) => isDragging && e.preventDefault()}
        >
            {/* Texto "CATÁLOGO" ao Fundo - Estilo Marca d'água para fundo claro */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="text-[60px] md:text-[70px] font-black text-gray-100 uppercase tracking-tighter leading-none transform -rotate-45 scale-150">
                    CATÁLOGO
                </span>
            </div>

            {/* Imagem do Produto */}
            <div
                style={{ backgroundImage: `url(${product.imageUrl})` }}
                className="absolute inset-0 bg-contain bg-no-repeat bg-center m-4 transition-transform duration-1000 ease-in-out group-hover:scale-110"
                role="img"
                aria-label={product.alt}
            />

            {/* Overlay Escuro Revelado no Hover */}
            <div className="absolute inset-0 bg-brand-blue-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-[1.5px] bg-brand-orange"></div>
                        <span className="text-[8px] font-black text-brand-orange uppercase tracking-[0.2em]">
                            Linha Vital
                        </span>
                    </div>
                    
                    <h3 className="font-black text-white text-lg md:text-xl uppercase tracking-tight leading-tight">
                        {product.alt}
                    </h3>
                    
                    <div className="flex items-center gap-2 pt-2">
                        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/40 group-hover:rotate-90 transition-transform">
                            <Plus size={16} strokeWidth={3} />
                        </div>
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">
                            {viewDetailsText}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bordas Decorativas Hover */}
            <div className="absolute inset-0 border-2 border-brand-orange/0 group-hover:border-brand-orange/40 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
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
        <section className="py-16 md:py-24 bg-brand-off-white overflow-hidden relative border-t border-gray-100" aria-labelledby="featured-products-title">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="text-center md:text-left">
                        <span className="text-brand-orange font-black tracking-[0.4em] text-[10px] uppercase block mb-3">Qualidade e Precisão</span>
                        <h2 id="featured-products-title" className="text-3xl md:text-4xl font-black text-brand-blue-dark tracking-tighter uppercase">
                            {t('featuredProducts.title')}
                        </h2>
                    </div>
                    
                    <div className="flex gap-3">
                        <button onClick={() => scroll('left')} className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-white hover:text-brand-orange hover:border-brand-orange transition-all active:scale-90 shadow-sm"><ChevronLeft size={20} /></button>
                        <button onClick={() => scroll('right')} className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/20 hover:bg-brand-orange-dark transition-all active:scale-90"><ChevronRight size={20} /></button>
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
                    className={`flex overflow-x-auto px-6 sm:px-12 lg:px-[calc((100vw-1280px)/2+24px)] pb-12 scrollbar-hide gap-6 md:gap-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
