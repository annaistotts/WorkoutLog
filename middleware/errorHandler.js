export function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: 'A database error occurred'
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'INVALID_JSON',
      message: 'Invalid JSON payload'
    });
  }

  res.status(500).json({
    error: 'SERVER_ERROR',
    message: 'An unexpected error occurred'
  });
}