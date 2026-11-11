import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Global styles first, so component CSS (imported by App) can override them.
import './styles/index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
