import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import routes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-5 text-center">
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        <Trans i18nKey="notFound.description" components={{ 1: <Link to={routes.mainPage()} /> }} />
      </p>
    </div>
  );
};

export default NotFoundPage;
