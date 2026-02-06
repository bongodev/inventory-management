export class NotImplementedError extends Error {
  constructor(message: string = 'This functionality is not implemented yet.') {
    super(message);
    this.name = 'NotImplementedError';
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message: string = 'The requested resource was not found.') {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadRequestError extends Error {
  constructor(message: string = 'Bad request.') {
    super(message);
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized.') {
    super(message);
    this.name = 'UnauthorizedError';
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends Error {
  constructor(message: string = 'Forbidden.') {
    super(message);
    this.name = 'ForbiddenError';
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
