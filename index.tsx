
/**
 * ============================================================================
 * Application Entry Point (index.tsx)
 * ============================================================================
 * 
 * Main entry point for the React Application.
 * Handles DOM mounting and strict mode wrapping.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './lib/i18n'; // Initialize i18next configuration

// Service Worker disabled to prevent 404 errors in preview environments
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
*/

// Find the root DOM node
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Root element 'root' not found in the document.");
  throw new Error("Could not find root element to mount to");
}

// Initialize React Root
const root = ReactDOM.createRoot(rootElement);

// Render Application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
