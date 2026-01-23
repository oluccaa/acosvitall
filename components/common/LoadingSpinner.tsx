
import React from 'react';

/**
 * LoadingSpinner otimizado para evitar flashes brancos e layout shifts agressivos.
 * Utiliza as cores escuras do tema Aços Vital.
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full bg-brand-blue-dark min-h-[60vh] flex flex-col" aria-live="polite" aria-busy="true" aria-label="Carregando conteúdo...">
      {/* Hero Skeleton Otimizado */}
      <div className="bg-[#0b1635] h-[45vh] min-h-[350px] w-full animate-shimmer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue-dark/50"></div>
      </div>

      {/* Conteúdo Skeleton */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-24 py-16 flex-grow">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="h-12 w-1/2 rounded-lg bg-[#0b1635] animate-shimmer"></div>
          
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-[#0b1635] animate-shimmer"></div>
            <div className="h-4 w-full rounded bg-[#0b1635] animate-shimmer"></div>
            <div className="h-4 w-3/4 rounded bg-[#0b1635] animate-shimmer"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
             <div className="h-48 rounded-2xl bg-[#0b1635] animate-shimmer"></div>
             <div className="h-48 rounded-2xl bg-[#0b1635] animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
