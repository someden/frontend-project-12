import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  Navigate,
  Route, BrowserRouter as Router, Routes, useLocation,
} from 'react-router-dom';
import { ToastContainer as Toaster } from 'react-toastify';

import routes from '../routes';
import { useIsAuthorized } from '../store/auth';

import LoginPage from './LoginPage';
import MainPage from './MainPage';
import Navbar from './Navbar';
import NotFoundPage from './NotFoundPage';
import SignupPage from './SignupPage';

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
          element={(
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          )}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signupPage()} element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Stack>
    <Toaster />
  </Router>
);

export default App;
