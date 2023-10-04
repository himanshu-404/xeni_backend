class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.success = false;
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

module.exports = AppError;
