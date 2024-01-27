import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useAddMessageMutation } from '../api.js';
import { useUsername } from '../slices/auth.js';

const MessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const username = useUsername();
  const inputRef = useRef(null);
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(),
  });
  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
        username,
      };

      addMessage(message);
      formik.resetForm();
      inputRef.current?.focus();
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [channel.id]);

  const disabled = isLoading || !formik.dirty || !formik.isValid;

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation={disabled}>
        <Form.Control
          ref={inputRef}
          className="border-0 p-0 ps-2"
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-label={t('chat.newMessage')}
          disabled={formik.isSubmitting}
          placeholder={t('chat.messagePlaceholder')}
        />
        <Button variant="group-vertical" type="submit" disabled={disabled}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
