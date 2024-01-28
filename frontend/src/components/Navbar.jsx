import React from 'react';
import { Navbar as BootstrapNavbar, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import routes from '../routes';
import { actions, useIsAuthorized } from '../store/auth';

const Navbar = () => {
  const { t } = useTranslation();
  const isAuthorized = useIsAuthorized();
  const dispatch = useDispatch();

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to={routes.mainPage()}>
          {t('title')}
        </BootstrapNavbar.Brand>
        {isAuthorized && <Button onClick={() => dispatch(actions.logout())}>{t('logout')}</Button>}
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
