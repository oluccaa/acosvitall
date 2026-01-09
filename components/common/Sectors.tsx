
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SECTORS_LIST } from '../../lib/constants';

const animationStyles = `
  @keyframes scroll-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes scroll-right {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }
  .animate-scroll-left {
    animation: scroll-left 80s linear infinite;
  }
  .animate-scroll-right {
    animation: scroll-right 80s linear infinite;
  }
  .group:hover .animate-scroll-left,
  .group:hover .animate-scroll-right {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-scroll-left,
    .animate-scroll-right {
      animation-play-state: paused !important;
    }
  }
`;

interface Sector {
    id: string;
    name: string;
    imgSrc: string;
}

const SectorPill: React.FC<Sector> = ({ name, imgSrc }) => (
    <div className="flex flex-shrink-0 items-center gap-2.5 bg-white rounded-full py-1.5 pl-1.5 pr-4 shadow-sm border border-gray-100 cursor-default hover:shadow-xl hover:shadow-brand-orange/10 hover:border-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-white ring-1 ring-gray-50 group-hover:ring-brand-orange/30 transition-all">
            <img 
                src={imgSrc} 
                alt="" 
                className="w-full h-full object-cover"
                loading="lazy"
                width="40"
                height="40"
            />
        </div>
        <span className="font-medium text-brand-blue-dark text-xs tracking-wide whitespace-nowrap">{name}</span>
    </div>
);

const ScrollerRow: React.FC<{ sectors: Sector[]; direction: 'left' | 'right' }> = ({ sectors, direction }) => {
    const items = [...sectors, ...sectors, ...sectors, ...sectors];
    const animationClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';
    return (
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className={`flex w-max gap-2.5 py-1 ${animationClass}`}>
                {items.map((sector, index) => (
                    <SectorPill key={`${sector.id}-${index}`} {...sector} />
                ))}
            </div>
        </div>
    );
};

const Sectors: React.FC = () => {
    const { t } = useTranslation();
    const allSectors = SECTORS_LIST.map(s => ({
        ...s,
        name: t(`sectors.list.${s.id}`)
    }));

    return (
        <>
            <style>{animationStyles}</style>
            <section className="py-16 md:py-24 bg-brand-off-white overflow-hidden border-y border-gray-100" aria-labelledby="sectors-title">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24 text-center mb-10">
                    <span className="text-brand-orange font-bold tracking-widest text-[10px] uppercase mb-2 block">Mercados</span>
                    <h2 id="sectors-title" className="text-2xl md:text-3xl font-bold text-brand-blue-dark mb-4">
                        {t('sectors.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
                        {t('sectors.description')}
                    </p>
                </div>
                <div className="group flex flex-col gap-1.5" role="marquee">
                    <ScrollerRow sectors={allSectors} direction="left" />
                    <ScrollerRow sectors={[...allSectors].reverse()} direction="right" />
                </div>
            </section>
        </>
    );
};

export default Sectors;
