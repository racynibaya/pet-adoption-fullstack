import { Route, Routes } from 'react-router-dom';
import LayoutPage from './layouts/layout';

import { useAuth0 } from '@auth0/auth0-react';
import HomePage from './pages/HomePage';
import Pets from './components/Pets';
import PetLayout from './layouts/petLayout';

const AppRoutes = () => {
  const auth = useAuth0();

  console.log(auth);

  return (
    <Routes>
      {/* <Route
        path='/'
        element={
          <LayoutPage>
            <HomePage />
          </LayoutPage>
        }
      />
      <Route
        path='/pets'
        element={
          <PetLayout>
            <Pets />
          </PetLayout>
        }
      /> */}
      <Route path='/*' element={<h1>404</h1>} />
    </Routes>
  );
};

export default AppRoutes;
