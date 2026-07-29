import { env } from "../../config/env.service.js";

export const throwErrors = ({
  message = "something went wrong",
  status = 400,
  extra = undefined,
} = {}) => {
  throw new Error(message, { cause: { status, extra } });
};
export const badRequestError = ({
  message = "Bad Request",
  extra = undefined,
} = {}) => {
  return throwErrors({
    message,
    status: 400,
    extra,
  });
};

export const unauthorizedError = ({
  message = "Unauthorized",
  extra = undefined,
} = {}) => {
  return throwErrors({
    message,
    status: 401,
    extra,
  });
};

export const forbiddenError = ({
  message = "Forbidden",
  extra = undefined,
} = {}) => {
  return throwErrors({
    message,
    status: 403,
    extra,
  });
};

export const notFoundError = ({
  message = "Not Found",
  extra = undefined,
} = {}) => {
  return throwErrors({
    message,
    status: 404,
    extra,
  });
};

export const conflictError = ({
  message = "Conflict",
  extra = undefined,
} = {}) => {
  return throwErrors({
    message,
    status: 409,
    extra,
  });
};

export const validationError = ({
  message = "Validation Error",
  extra,
} = {}) => {
  return throwErrors({
    message,
    status: 422,
    extra,
  });
};

export const tooManyRequestsError = ({
  message = "Too Many Requests",
  extra,
} = {}) => {
  return throwErrors({
    message,
    status: 429,
    extra,
  });
};

export const catchErrors = (err, req, res, next) => {
  const status = err.cause?.status || 500;
  const extra = err.cause?.extra;
  const mood = env.mood == "development";
  res.status(status).json({
    success: false,
    message: err.message,
    ...(mood && { stack: err.stack }),
    extra,
  });
};
