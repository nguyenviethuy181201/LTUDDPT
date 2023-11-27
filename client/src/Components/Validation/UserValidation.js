import * as yup from 'yup';

// login validation

const loginValidation = yup.object().shape({
  email: yup.string().email().required('Email is required').trim(),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters')
    .matches(/(?=.*[0-9])/, 'Password must contain a number'),
});

// register validation
const registerValidation = yup.object().shape({
  email: yup.string().email().required('Email is required').trim(),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(/(?=.*[0-9])/, 'Password must be contain a number'),
  fullName: yup
    .string()
    .required('Full name is required')
    .max(20, 'full name must be at most 20 characters')
    .matches(/^[a-zA-Z]*$/, 'Full name must contain only letter '),
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required('Full name is required')
    .max(20, 'full name must be at most 20 characters')
    .matches(/^[a-zA-Z]*$/, 'Full name must contain only letters '),
  email: yup.string().email().required('Email is required').trim(),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(/(?=.*[0-9])/, 'Password must be contain a number'),
  newPassword: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(/(?=.*[0-9])/, 'Password must be contain a number'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(/(?=.*[0-9])/, 'Password must be contain a number')
    .oneOf([yup.ref('newPassword'), null], 'Password must be matching'),
});

export {
  loginValidation,
  registerValidation,
  ProfileValidation,
  PasswordValidation,
};
