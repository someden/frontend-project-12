import React from 'react';
import { Stack } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { ToastContainer as Toaster } from 'react-toastify';

import routes from '../routes.js';
import { useIsAuthorized } from '../slices/auth.js';

import LoginPage from './LoginPage.jsx';
import MainPage from './MainPage.jsx';
import Navbar from './Navbar.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const PrivateRoute = ({ children }) => {
  const isAuthorized = useIsAuthorized();
  const location = useLocation();

  return isAuthorized ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />;
};

const App = () => (
  <Router>
    <Stack gap={3} className="h-100">
      <Navbar />
      <Routes>
        <Route
          path={routes.mainPage()}
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Stack>
    <Toaster />
  </Router>
);

export default App;
