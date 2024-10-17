const responseFactory = require('./responseFactory.js');

const errorResponseFactory = (
  response,
  statusCode,
  errorMessage,
  otherDetails = undefined
) => {
  return responseFactory(response, statusCode, {
    error: errorMessage,
    ...otherDetails,
  });
};

module.exports = errorResponseFactory;