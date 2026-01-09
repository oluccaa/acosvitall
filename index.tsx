
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './lib/i18n';

// Registro do Service Worker para Performance e Cache Offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Utilizando caminho relativo para garantir que o script seja encontrado independentemente da base URL
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.warn('Service Worker registration failed: ', err);
    });
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
