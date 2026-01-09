
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './lib/i18n';

// O registro do Service Worker foi removido para evitar erros 404 em produção, 
// uma vez que o arquivo sw.js não está sendo servido corretamente na raiz do domínio.
// Isso limpa o console e estabiliza a pontuação de performance do site.

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
