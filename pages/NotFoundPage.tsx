
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-6 bg-brand-off-white min-h-[60vh]">
      <div className="p-6 bg-brand-orange/10 rounded-full mb-8 animate-pulse">
        <AlertTriangle size={64} className="text-brand-orange" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-brand-blue-dark mb-4 uppercase tracking-tighter">
        {t('notFoundPage.title')}
      </h1>
      
      <p className="max-w-md text-gray-600 md:text-lg mb-10 leading-relaxed">
        {t('notFoundPage.message')}
      </p>
      
      <a
        href="/home"
        className="inline-block bg-brand-orange text-white font-bold py-4 px-10 rounded-full hover:bg-brand-orange-dark transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-brand-orange/20 text-sm uppercase tracking-widest active:scale-95"
      >
        {t('notFoundPage.homeButton')}
      </a>
    </div>
  );
};

export default NotFoundPage;
