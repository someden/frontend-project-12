import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useDeleteChannelMutation } from '../../api.js';
import { useModalExtra } from '../../slices/ui.js';

const Delete = ({ handleClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [deleteChannel] = useDeleteChannelMutation();
  const channelId = useModalExtra();
  const handleDelete = async () => {
    setLoading(true);
    await deleteChannel(channelId).unwrap();
    toast.success(t('channels.deleted'));
    handleClose();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label={t('close')}
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            {t('cancel')}
          </Button>
          <Button variant="danger" type="button" onClick={handleDelete} disabled={loading}>
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Delete;
