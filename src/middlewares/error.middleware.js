import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  if (err.isJoi) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = err.details.map((d) => d.message).join(", ");
  }

  if (err.code === "ER_DUP_ENTRY") {
    statusCode = StatusCodes.CONFLICT;
    message = "A school with this name or address already exists.";
  }

  if (
    err.code === "ER_NO_DEFAULT_FOR_FIELD" ||
    err.code === "ER_BAD_NULL_ERROR"
  ) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Missing required fields.";
  }

  if (err.code === "ER_DATA_TOO_LONG") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "One or more fields exceed the maximum allowed length.";
  }

  if (err.code === "ER_WARN_DATA_OUT_OF_RANGE") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Latitude or longitude value is out of valid range.";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
