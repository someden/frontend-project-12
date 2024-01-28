import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import {
  Button, Card, Col, Container, FloatingLabel, Form, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import avatarSrc from '../assets/avatar.jpg';
import routes from '../routes';
import { actions } from '../store/auth';

const SignupPage = () => {
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('validation.required')
      .min(3, 'validation.min')
      .max(20, 'validation.max'),
    password: yup.string().trim().required('validation.required').min(6, 'validation.passLength'),
    confirmPassword: yup
      .string()
      .test(
        'confirmPassword',
        'validation.passMustMatch',
        (value, context) => value === context.parent.password,
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signup(), values);
        dispatch(actions.login(response.data));
        const { from } = location.state || {
          from: { pathname: routes.mainPage() },
        };
        navigate(from);
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }

        if (error.response?.status === 409) {
          formik.setFieldError('username', 'errors.alreadyExists');
          usernameRef.current.select();
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <Container className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col xs={12} md={8} xxl={6}>
          <Card>
            <Card.Body className="p-4">
              <Row>
                <Col
                  xs={12}
                  md={6}
                  className="align-items-center justify-content-center text-center"
                >
                  <img src={avatarSrc} className="rounded-circle my-3" alt={t('signup.title')} />
                </Col>
                <Col xs={12} md={6}>
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t('signup.title')}</h1>
                    <FloatingLabel
                      controlId="username"
                      className="mb-4"
                      label={t('signup.username')}
                    >
                      <Form.Control
                        autoComplete="username"
                        isInvalid={formik.touched.username && Boolean(formik.errors.username)}
                        name="username"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        ref={usernameRef}
                        required
                        value={formik.values.username}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(formik.errors.username)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="password"
                      className="mb-4"
                      label={t('signup.password')}
                    >
                      <Form.Control
                        autoComplete="new-password"
                        isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        required
                        type="password"
                        value={formik.values.password}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(formik.errors.password)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="confirmPassword"
                      className="mb-4"
                      label={t('signup.confirmPassword')}
                    >
                      <Form.Control
                        autoComplete="new-password"
                        isInvalid={(
                          formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                        )}
                        name="confirmPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        required
                        type="password"
                        value={formik.values.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(formik.errors.confirmPassword)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button type="submit" variant="outline-primary" className="w-100">
                      {t('signup.submit')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
