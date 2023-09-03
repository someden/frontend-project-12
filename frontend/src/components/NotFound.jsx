import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import routes from '../routes.js';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('notFound.title')}
        className="mb-4"
        style={{ width: '200px' }}
        src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"
      />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        <Trans i18nKey="notFound.description" components={{ 1: <Link to={routes.mainPage} /> }} />
      </p>
    </div>
  );
};

export default NotFound;
