import React, { useEffect } from 'react';
import {
  Button, ButtonGroup, Dropdown, Nav, NavItem, Spinner,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useGetChannelsQuery } from '../store/api';
import { actions as authActions } from '../store/auth';
import { selectCurrentChannelId, actions as uiActions } from '../store/ui';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: channels, isLoading, error } = useGetChannelsQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);

  useEffect(() => {
    if (error?.status === 401) {
      dispatch(authActions.logout());
    }
  }, [error, dispatch]);

  const handleSelect = (channelId) => () => {
    dispatch(uiActions.setCurrentChannelId({ channelId }));
  };
  const handleAdd = () => {
    dispatch(uiActions.openModal({ type: 'add' }));
  };
  const handleDelete = (channelId) => () => {
    dispatch(uiActions.openModal({ type: 'delete', extra: channelId }));
  };
  const handleRename = (channelId) => () => {
    dispatch(uiActions.openModal({ type: 'rename', extra: channelId }));
  };

  return isLoading ? (
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">{t('loading')}</span>
    </Spinner>
  ) : (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAdd}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav fill variant="pills" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => {
          const variant = channel.id === currentChannelId ? 'secondary' : 'light';
          return (
            <NavItem key={channel.id} className="w-100">
              {channel.removable ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    type="button"
                    key={channel.id}
                    className="w-100 rounded-0 text-start text-truncate"
                    onClick={handleSelect(channel.id)}
                    variant={variant}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
                    <span className="visually-hidden">{t('channels.menu')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleDelete(channel.id)}>
                      {t('channels.delete')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleRename(channel.id)}>
                      {t('channels.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  type="button"
                  variant={variant}
                  key={channel.id}
                  className="w-100 rounded-0 text-start"
                  onClick={handleSelect(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              )}
            </NavItem>
          );
        })}
      </Nav>
    </>
  );
};

export default Channels;
