import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import avatarSrc from '../assets/avatar.jpg';
import routes from '../routes.js';
import { login } from '../slices/auth.js';

const LoginPage = () => {
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.login(), values);
        dispatch(login(response.data));
        const { from } = location.state || {
          from: { pathname: routes.mainPage() },
        };
        navigate(from);
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }

        if (error.response?.status === 401) {
          formik.setFieldError('password', t('errors.authFailed'));
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
                  <img src={avatarSrc} className="rounded-circle my-3" alt={t('login.title')} />
                </Col>
                <Col xs={12} md={6}>
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t('login.title')}</h1>
                    <FloatingLabel
                      controlId="username"
                      className="mb-3"
                      label={t('login.username')}
                    >
                      <Form.Control
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        name="username"
                        autoComplete="username"
                        isInvalid={Boolean(formik.errors.password)}
                        required
                        ref={usernameRef}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="password"
                      className="mb-4"
                      label={t('login.password')}
                    >
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        name="password"
                        autoComplete="current-password"
                        isInvalid={Boolean(formik.errors.password)}
                        required
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button type="submit" variant="outline-primary" className="w-100">
                      {t('login.submit')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('login.noAccount')} <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
