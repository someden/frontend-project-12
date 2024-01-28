import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const getChannelValidationSchema = (channelNames) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('validation.required')
    .min(3, 'validation.min')
    .max(20, 'validation.max')
    .notOneOf(channelNames, 'validation.uniq'),
});
