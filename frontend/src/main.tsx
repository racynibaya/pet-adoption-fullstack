import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes.tsx';
import { BrowserRouter } from 'react-router-dom';

import AuthProviderWithNavigate from '../auth/AuthProviderWithNavigate.tsx';

import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWithNavigate>
        <AppRoutes />
      </AuthProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
