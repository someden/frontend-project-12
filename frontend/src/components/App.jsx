import React from 'react';
import { Stack } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer as Toaster } from 'react-toastify';

import routes from '../routes.js';

import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';

const App = () => (
  <Router>
    <Stack gap={3} className="h-100">
      <Navbar />
      <Routes>
        <Route path={routes.loginPage} element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Stack>
    <Toaster />
  </Router>
);

export default App;
