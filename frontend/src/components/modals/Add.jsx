import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import {
  Button,
  FloatingLabel,
  Form, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAddChannelMutation, useGetChannelsQuery } from '../../store/api';
import { getChannelValidationSchema } from '../../utils';

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
      const channel = { name: leoProfanity.clean(name) };
      getChannelValidationSchema(channelNames).validateSync({ name: channel.name });
      try {
        await addChannel(channel).unwrap();
        toast.success(t('channels.created'));
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
          <FloatingLabel controlId="name" className="mb-4" label={t('modals.channelName')}>
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
