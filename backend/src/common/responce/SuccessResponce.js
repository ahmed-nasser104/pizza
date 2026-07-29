export const successResponce = ({ res, status = 200, message, data } = {}) => {
  res.status(status).json({
    message,
    data,
  });
};
