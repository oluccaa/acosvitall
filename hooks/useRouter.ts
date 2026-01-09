
import { useState, useEffect, useCallback } from 'react';

/**
 * Normaliza o pathname removendo barras finais e tratando index.html como raiz.
 */
const normalizePath = (path: string): string => {
  if (!path || path === '/' || path === '/index.html') return '/';
  // Remove barra final para consistência, ex: /about/ vira /about
  return path.replace(/\/$/, '') || '/';
};

/**
 * Custom Router Hook para BrowserRouter (Pathname based)
 * Intercepta navegações para manter o comportamento de SPA e garante a troca de componentes.
 */
export const useRouter = () => {
  const [path, setPath] = useState(normalizePath(window.location.pathname));

  const handleLocationChange = useCallback(() => {
    const newPath = normalizePath(window.location.pathname);
    if (path !== newPath) {
      setPath(newPath);
    }
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    // Escuta eventos de voltar/avançar do navegador
    window.addEventListener('popstate', handleLocationChange);
    
    // Interceptador global de cliques para links internos <a>
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      // Verifica se é um link interno e se não é um download ou link externo
      if (anchor && 
          anchor.href.startsWith(window.location.origin) && 
          !anchor.hasAttribute('download') && 
          anchor.target !== '_blank') {
        
        const url = new URL(anchor.href);
        const targetPath = normalizePath(url.pathname);

        // Se for um link de âncora (#id) na mesma página, deixa o navegador tratar
        if (targetPath === normalizePath(window.location.pathname) && url.hash && !url.hash.startsWith('#/')) {
          return;
        }

        // Previne navegação real do navegador
        e.preventDefault();

        // Se o caminho for diferente, atualiza o histórico e o estado do React
        if (normalizePath(window.location.pathname) !== targetPath) {
          window.history.pushState({}, '', targetPath);
          // O popstate não dispara em pushState, então chamamos manualmente
          handleLocationChange();
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Sincronização inicial
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [handleLocationChange]);

  return path;
};
