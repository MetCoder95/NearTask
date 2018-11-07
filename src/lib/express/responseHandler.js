import Boom from "boom";

const successResponse = (
  res,
  { message = "Succesful Request", code = 200, payload = {} } = {}
) =>
  res.status(code).json({
    success: true,
    message,
    payload
  });

const errorResponse = (res, { payload, statusCode = 500 } = {}) =>
  res.status(statusCode).json({ success: false, payload });

export default {
  successResponse,
  errorResponse
};
