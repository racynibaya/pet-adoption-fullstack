import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster } from './components/ui/toaster';

import Hero from './pages/Hero';
import HeroLayout from './layouts/HeroLayout';
import SignUpLayout from './layouts/AuthLayout';
import Signup from './components/Signup';
import Signin from './components/Signin';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <HeroLayout>
              <Hero />
            </HeroLayout>
          }
        />

        <Route
          path='/signup'
          element={
            <SignUpLayout>
              <Signup />
            </SignUpLayout>
          }
        />

        <Route
          path='/signin'
          element={
            <SignUpLayout>
              <Signin />
            </SignUpLayout>
          }
        />
        <Route path='/*' element={<h1>404 Somethings went wrong</h1>}></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
