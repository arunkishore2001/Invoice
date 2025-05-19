import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { InvoiceProvider } from './components/InvoiceContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvoiceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InvoiceProvider>
  </StrictMode>
);
