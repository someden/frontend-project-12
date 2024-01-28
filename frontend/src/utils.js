import * as yup from 'yup';

export const getChannelValidationSchema = (channelNames) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('validation.required')
      .min(3, 'validation.min')
      .max(20, 'validation.max')
      .notOneOf(channelNames, 'validation.uniq'),
  });
