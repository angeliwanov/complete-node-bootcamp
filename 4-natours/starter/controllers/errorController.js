const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidatorError = (err) => {
  const message = `Invalid input data. ${
    err.errors.difficulty ? err.errors.difficulty.properties.message : ''
  } ${
    err.errors.ratingsAverage
      ? err.errors.ratingsAverage.properties.message
      : ''
  } ${err.errors.name ? err.errors.name.properties.message : ''}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //UNKNOWN ERROR, DON'T WANT TO LEAK ERROR DETAILS TO THE CLIENT
    // console.log('ERROR', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production ') {
    let error = { ...err };

    if (error.kind === 'ObjectId') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error._message === 'Tour validation failed')
      error = handleValidatorError(error);

    sendErrorProd(error, res);
  }
  next();
};
