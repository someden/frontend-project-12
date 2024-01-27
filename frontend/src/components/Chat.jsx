import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useCurrentChannel, useCurrentChannelMessages, useGetMessagesQuery } from '../api';

import MessageForm from './MessageForm.jsx';

const Chat = () => {
  const { t } = useTranslation();
  const { isLoading } = useGetMessagesQuery();
  const messagesBox = useRef(null);

  const currentChannel = useCurrentChannel();
  const messages = useCurrentChannelMessages();

  useLayoutEffect(() => {
    messagesBox.current?.scrollTo({
      top: messagesBox.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [data]);

  return isLoading ? (
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">{t('loading')}</span>
    </Spinner>
  ) : (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">
          {`${messages.length} ${t('chat.messageCount', { count: messages.length })}`}
        </span>
      </div>
      <div ref={messagesBox} className="overflow-auto px-5">
        {messages.map(({ id, username, body }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm channel={currentChannel} />
      </div>
    </div>
  );
};

export default Chat;
