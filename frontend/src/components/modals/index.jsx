import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { actions, useIsModalOpened, useModalType } from '../slices/ui.js';

import Add from './Add.js';
import Delete from './Delete.js';
import Rename from './Rename.js';

const mapping = {
  add: Add,
  delete: Delete,
  rename: Rename,
};

const Modal = () => {
  const dispatch = useDispatch();
  const isOpened = useIsModalOpened();
  const modalType = useModalType();

  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  const Component = mapping[modalType];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
