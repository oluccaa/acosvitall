
import { useLocation } from 'react-router-dom';

/**
 * Custom Router Hook de compatibilidade
 * Agora utiliza o estado do react-router-dom para garantir que Header, NavLinks e outros
 * componentes reajam corretamente à mudança de página.
 */
export const useRouter = () => {
  const location = useLocation();
  return location.pathname;
};
