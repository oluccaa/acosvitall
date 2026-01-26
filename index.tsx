
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './lib/i18n';

// Registro do Service Worker habilitado para resolver o alerta de ciclo de vida de cache.
// O SW intercepta requisições de domínios externos (Supabase, Google, RSMS) e armazena
// os assets no CacheStorage, garantindo carregamento instantâneo em visitas recorrentes.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Registra o sw.js localizado na raiz do projeto
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Aços Vital: Service Worker Ativo', reg.scope))
      .catch(err => console.warn('Aços Vital: Erro no registro do Service Worker', err));
  });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Root element 'root' not found in the document.");
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
