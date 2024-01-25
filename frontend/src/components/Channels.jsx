import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../api';
import { useUsername } from '../slices/auth';

const Channels = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetChannelsQuery();
  const username = useUsername();

  console.log('channels', data, username);

  return isLoading ? (
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">{t('loading')}</span>
    </Spinner>
  ) : null;
};

export default Channels;
