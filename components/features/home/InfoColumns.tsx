import React, { useRef } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { useOnScreen } from '../../../hooks/useOnScreen';
import { INFO_COLUMNS_TABS } from '../../../lib/constants';

interface TabContent {
    description: React.ReactNode;
    items?: string[];
}

interface ColumnTab {
    id: string;
    title: string;
    icon: React.ReactElement;
    content: TabContent;
}

const InfoColumns: React.FC = () => {
    const { t } = useI18n();
    
    const columns: ColumnTab[] = INFO_COLUMNS_TABS.map(tab => ({
        ...tab,
        title: t(`infoColumns.tabs.${tab.id}.title`),
        content: {
            description: t(`infoColumns.tabs.${tab.id}.description`),
            items: tab.items
        }
    }));
    
    const containerRef = useRef<HTMLUListElement>(null);
    const isVisible = useOnScreen(containerRef, 0.1);

    return (
        <section className="py-10 md:py-16 bg-brand-off-white relative" aria-labelledby="info-columns-title">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl">
                <div className="text-center mb-8 md:mb-12">
                    <h2 id="info-columns-title" className="text-2xl md:text-3xl font-bold text-brand-blue-dark relative inline-block">
                        {t('infoColumns.title')}
                        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-orange rounded-full"></div>
                    </h2>
                </div>

                <ul ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {columns.map((column, index) => (
                        <li
                            key={column.id}
                            className={`
                                bg-white p-5 md:p-6 rounded-xl border border-gray-100
                                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_45px_-15px_rgba(255,117,26,0.12)]
                                transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col items-center text-center group
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                            `}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-orange/5 rounded-full flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-brand-orange transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full origin-center"></div>
                                    <div className="relative z-10">
                                        {React.isValidElement(column.icon) && 
                                            React.cloneElement(column.icon as React.ReactElement<{ size: number, className?: string }>, { 
                                                size: 28, 
                                                className: "currentColor"
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            
                            <h3 className="text-base font-bold text-brand-blue-dark mb-2 group-hover:text-brand-orange transition-colors uppercase tracking-wide">
                                {column.title}
                            </h3>
                            
                            <div className="text-gray-600 text-xs md:text-sm leading-relaxed flex-grow">
                                {column.content.description}
                            </div>

                            {column.content.items && (
                                <div className="flex flex-wrap gap-1 justify-center mt-4 pt-4 border-t border-gray-100 w-full">
                                    {column.content.items.map((item) => (
                                        <span key={item} className="bg-gray-50 border border-gray-200 text-gray-500 text-[8px] md:text-[9px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default InfoColumns;