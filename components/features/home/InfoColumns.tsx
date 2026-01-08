
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
        <section className="py-16 md:py-24 bg-brand-off-white relative" aria-labelledby="info-columns-title">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-[1920px]">
                <div className="text-center mb-12 md:mb-16">
                    <h2 id="info-columns-title" className="text-2xl md:text-4xl font-bold text-brand-blue-dark relative inline-block">
                        {t('infoColumns.title')}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-orange rounded-full"></div>
                    </h2>
                </div>

                <ul ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {columns.map((column, index) => (
                        <li
                            key={column.id}
                            className={`
                                bg-white p-6 md:p-8 rounded-xl border border-gray-100
                                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_45px_-15px_rgba(255,117,26,0.12)]
                                transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col items-center text-center group
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                            `}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-orange/5 rounded-full flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-brand-orange transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full origin-center"></div>
                                    <div className="relative z-10">
                                        {React.isValidElement(column.icon) && 
                                            React.cloneElement(column.icon as React.ReactElement<{ size: number, className?: string }>, { 
                                                size: 32, 
                                                className: "currentColor"
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-brand-blue-dark mb-3 group-hover:text-brand-orange transition-colors uppercase tracking-wide">
                                {column.title}
                            </h3>
                            
                            <div className="text-gray-600 text-sm leading-relaxed flex-grow">
                                {column.content.description}
                            </div>

                            {column.content.items && (
                                <div className="flex flex-wrap gap-1.5 justify-center mt-6 pt-5 border-t border-gray-100 w-full">
                                    {column.content.items.map((item) => (
                                        <span key={item} className="bg-gray-50 border border-gray-200 text-gray-500 text-[9px] uppercase font-bold px-2 py-1 rounded-full tracking-wider">
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
