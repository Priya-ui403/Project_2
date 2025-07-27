import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { OCRProvider } from './contexts/OCRContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OCRProvider>
      <App />
    </OCRProvider>
  </StrictMode>
);