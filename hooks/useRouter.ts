
import { useState, useEffect } from 'react';

/**
 * Custom Router Hook para BrowserRouter (Pathname based)
 * Intercepta navegações para manter o comportamento de SPA.
 */
export const useRouter = () => {
  // Inicialização robusta: trata caminhos vazios ou index.html como raiz
  const getInitialPath = () => {
    const p = window.location.pathname;
    if (!p || p === '/' || p === '/index.html') return '/';
    return p;
  };

  const [path, setPath] = useState(getInitialPath());

  useEffect(() => {
    const handleLocationChange = () => {
      const currentPath = window.location.pathname || '/';
      setPath(currentPath === '/index.html' ? '/' : currentPath);
      window.scrollTo(0, 0);
    };

    // Escuta eventos de voltar/avançar do navegador
    window.addEventListener('popstate', handleLocationChange);
    
    // Interceptador global de cliques para links internos
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && 
          anchor.href.startsWith(window.location.origin) && 
          !anchor.hasAttribute('download') && 
          anchor.target !== '_blank') {
        
        const url = new URL(anchor.href);
        
        // Se for um link interno mas com hash (âncora na mesma página), deixa o navegador tratar
        if (url.pathname === window.location.pathname && url.hash) {
          return;
        }

        e.preventDefault();
        if (window.location.pathname !== url.pathname) {
          window.history.pushState({}, '', url.pathname);
          handleLocationChange();
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Executa uma vez no mount para garantir sincronia
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return path;
};
