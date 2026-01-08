
import React from 'react';
import { useI18n } from '../../../context/I18nContext';
import { STATS_LIST } from '../../../lib/constants';

const StatsGrid: React.FC = () => {
    const { t } = useI18n();

    return (
        <section className="py-16 2xl:py-24 bg-white border-t border-gray-100 relative z-10" aria-label="Estatísticas da empresa">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                <div className="max-w-7xl 2xl:max-w-none mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {STATS_LIST.map((stat, index) => {
                            const isLast = index === STATS_LIST.length - 1;
                            const isTabletRightCol = index % 2 !== 0; 
                            const tabletRows = Math.ceil(STATS_LIST.length / 2);
                            const tabletLastRowStartIndex = (tabletRows - 1) * 2;
                            const isTabletLastRow = index >= tabletLastRowStartIndex;

                            let borderClasses = 'border-gray-200 ';

                            if (!isLast) {
                                borderClasses += 'border-b ';
                            }
                            borderClasses += 'border-r-0 ';

                            if (!isTabletRightCol) {
                                borderClasses += 'sm:border-r ';
                            } else {
                                borderClasses += 'sm:border-r-0 ';
                            }

                            if (isTabletLastRow) {
                                borderClasses += 'sm:border-b-0 ';
                            } else {
                                borderClasses += 'sm:border-b ';
                            }

                            borderClasses += 'lg:border-b-0 ';
                            if (!isLast) {
                                borderClasses += 'lg:border-r ';
                            } else {
                                borderClasses += 'lg:border-r-0 ';
                            }

                            return (
                                <div 
                                    key={index} 
                                    className={`
                                        flex flex-col items-center justify-center text-center 
                                        py-10 px-4 sm:px-6 md:px-10 2xl:py-20
                                        h-full
                                        ${borderClasses}
                                    `}
                                >
                                    <div className="mb-6 2xl:mb-10 text-brand-orange transform transition-transform duration-300 hover:scale-110">
                                        {React.cloneElement(stat.icon as React.ReactElement<{ size: number }>, { 
                                            size: window.innerWidth > 1920 ? 80 : 40 
                                        })}
                                    </div>
                                    
                                    <p className="font-extrabold text-brand-orange text-5xl md:text-6xl 2xl:text-9xl tracking-tighter mb-3 2xl:mb-6 whitespace-nowrap drop-shadow-sm">
                                        {t(`history.stats.${stat.id}.value`)}
                                    </p>
                                    
                                    <p className="text-brand-blue-dark font-bold text-xs sm:text-sm 2xl:text-2xl uppercase tracking-widest max-w-[200px] 2xl:max-w-md leading-relaxed">
                                        {t(`history.stats.${stat.id}.label`)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsGrid;
