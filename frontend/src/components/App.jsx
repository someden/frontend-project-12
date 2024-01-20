import React from 'react';
import { Stack } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { ToastContainer as Toaster } from 'react-toastify';

import routes from '../routes.js';

import Navbar from './Navbar.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import ChatPage from './ChatPage.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
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
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Stack>
    <Toaster />
  </Router>
);

export default App;
