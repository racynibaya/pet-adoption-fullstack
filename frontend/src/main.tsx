import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Hero from './pages/Hero';
import HeroLayout from './layouts/HeroLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HeroLayout>
        <Hero />
      </HeroLayout>
    ),
  },
  {
    path: '/test',
    element: <h1>Test Page</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
