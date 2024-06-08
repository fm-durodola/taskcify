export const createTodoValidatorSchema = {
  task: {
    isString: {
      errorMessage: "task must be type of string",
    },
    notEmpty: {
      errorMessage: "todoId required",
    },
    trim: true,
    escape: true,
  },
  completed: {
    isBoolean: {
      errorMessage: "completed field must be type of boolean",
    },
    trim: true,
    escape: true,
    optional: true,
  },
};

export const updateTodoValidatorSchema = {
  task: {
    in: ["body"],
    isString: {
      errorMessage: "task must be type of string",
    },
    notEmpty: {
      errorMessage: "todoId required",
    },
    trim: true,
    escape: true,
    optional: true,
  },
  completed: {
    in: ["body"],
    isBoolean: {
      errorMessage: "completed field must be type of boolean",
    },
    notEmpty: {
      errorMessage: "todoId required",
    },
    trim: true,
    escape: true,
    optional: true,
  },
  todoId: {
    in: ["params"],
    isMongoId: {
      errorMessage: "valid todoId required",
    },
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "todoId required",
    },
  },
};
