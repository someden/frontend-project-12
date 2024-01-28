import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAddChannelMutation, useGetChannelsQuery } from '../../api.js';
import { getChannelValidationSchema } from '../../utils.js';

const Add = ({ handleClose }) => {
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels.map(({ name }) => name);
  const inputRef = useRef(null);
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getChannelValidationSchema(channelNames),
    onSubmit: async ({ name }) => {
      const channel = { name };
      await addChannel(channel).unwrap();
      toast.success(t('channels.created'));
      handleClose();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.add')}</Modal.Title>
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
          <FloatingLabel controlId="name" className="mb-2" label={t('modals.channelName')}>
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

export default Add;
