import React, { useLayoutEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useGetChannelsQuery, useGetMessagesQuery } from '../store/api';
import { selectCurrentChannelId } from '../store/ui';

import MessageForm from './MessageForm';

const Chat = () => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const { data: allMessages, isLoading } = useGetMessagesQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const messagesBox = useRef(null);

  const currentChannel = channels?.find(({ id }) => currentChannelId === id);
  const messages = allMessages?.filter(({ channelId }) => currentChannelId === channelId);

  useLayoutEffect(() => {
    messagesBox.current?.scrollTo({
      top: messagesBox.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [allMessages]);

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
        {currentChannel && <MessageForm channel={currentChannel} />}
      </div>
    </div>
  );
};

export default Chat;
