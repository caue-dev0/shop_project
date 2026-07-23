export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Https StatusCode Error : 4**
export class BadRequestError extends ApiError {
  constructor(message, statusCode) {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message, statusCode) {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message, statusCode) {
    super(message, 403);
  }
}
export class NotFoundError extends ApiError {
  constructor(message, statusCode) {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor(message, statusCode) {
    super(message, 409);
  }
}
