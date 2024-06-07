export const registerUserValidatorSchema = {
  name: {
    isString:{
      errorMessage: "must be type of string",
    },
    notEmpty: {
      errorMessage: "name field must be filled",
    },
    escape: true,
    trim: true,
  },
  email: {
    isString:{
      errorMessage: "must be type of string",
    },
    notEmpty: {
      errorMessage: "email field must be filled",
    },
    isEmail: true,
    escape: true,
    trim: true,
  },
  password: {
    isString:{
      errorMessage: "must be type of string",
    },
    notEmpty: {
      errorMessage: "password field must be filled",
    },
    escape: true,
    trim: true,
    isLength: {
      options: {
        min: 6,
        max: 19,
      },
      errorMessage: "Password must be between 6 and 19 characters",
    },
    custom: {
      options: (value) => {
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{6,19}$/.test(value);
      },
      errorMessage: "Password must contain letters, numbers, and @ symbol",
    },
  },
};

export const updateUserValidatorSchema = {
  password: {
    isString:{
      errorMessage: "must be type of string",
    },
    notEmpty: {
      errorMessage: "password field must be filled",
    },
    escape: true,
    trim: true,
    isLength: {
      options: {
        min: 6,
        max: 19,
      },
      errorMessage: "Password must be between 6 and 19 characters",
    },
    custom: {
      options: (value) => {
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{6,19}$/.test(value);
      },
      errorMessage: "Password must contain letters, numbers, and @ symbol",
    },
  },
};
