import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery } from '../api';
import { useUsername } from '../slices/auth';

const Chat = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetMessagesQuery();
  const username = useUsername();

  console.log('chat', data, username);

  return isLoading ? (
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">{t('loading')}</span>
    </Spinner>
  ) : null;
};

export default Chat;
