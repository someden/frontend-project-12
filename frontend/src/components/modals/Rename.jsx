import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import {
  Button,
  FloatingLabel,
  Form, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useGetChannelsQuery, useUpdateChannelMutation } from '../../store/api';
import { useModalExtra } from '../../store/ui';
import { getChannelValidationSchema } from '../../utils';

const Rename = ({ handleClose }) => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels.map(({ name }) => name);
  const channelId = useModalExtra();
  const channel = channels.find(({ id }) => channelId === id);
  const inputRef = useRef(null);
  const [updateChannel] = useUpdateChannelMutation();
  useEffect(() => {
    setTimeout(() => inputRef.current?.select());
  }, []);
  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getChannelValidationSchema(channelNames),
    onSubmit: async ({ name }) => {
      try {
        await updateChannel({ name, id: channelId }).unwrap();
        toast.success(t('channels.renamed'));
        handleClose();
      } catch (error) {
        toast.error(t('errors.network'));
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label={t('close')}
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel controlId="name" className="mb-4" label={t('modals.editChannelName')}>
            <Form.Control
              ref={inputRef}
              required
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {t(formik.errors.name)}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" type="button" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
              {t('submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
