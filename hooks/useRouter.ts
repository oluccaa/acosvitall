
import { useState, useEffect } from 'react';

/**
 * Custom Router Hook para BrowserRouter (Pathname based)
 * Intercepta navegações para manter o comportamento de SPA.
 */
export const useRouter = () => {
  const getInitialPath = () => {
    const p = window.location.pathname;
    if (!p || p === '/' || p === '/index.html') return '/';
    return p;
  };

  const [path, setPath] = useState(getInitialPath());

  useEffect(() => {
    const handleLocationChange = () => {
      const currentPath = window.location.pathname || '/';
      const cleanPath = currentPath === '/index.html' ? '/' : currentPath;
      setPath(cleanPath);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && 
          anchor.href.startsWith(window.location.origin) && 
          !anchor.hasAttribute('download') && 
          anchor.target !== '_blank') {
        
        const url = new URL(anchor.href);
        let targetPath = url.pathname;

        // Suporte a links legados com hash: se o link for #/about, converte para /about
        if (url.hash && url.hash.startsWith('#/')) {
          targetPath = url.hash.substring(1); 
        }

        // Se for apenas um hash interno (âncora na mesma página), deixa o navegador tratar
        if (targetPath === window.location.pathname && url.hash && !url.hash.startsWith('#/')) {
          return;
        }

        e.preventDefault();
        if (window.location.pathname !== targetPath) {
          window.history.pushState({}, '', targetPath);
          handleLocationChange();
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return path;
};
