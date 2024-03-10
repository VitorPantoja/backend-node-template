export class HttpException extends Error {
  code: number;
  error?: Error;

  constructor(message?: string, code = InternalServerError.code, error?: Error) {
    super(message || 'Erro interno no servidor.');
    this.code = code;
    this.error = error;
  }
}

export class InternalServerError extends HttpException {
  static code = 500;

  constructor(message = 'Erro interno no servidor.') {
    super(message, InternalServerError.code);
    this.name = 'InternalServer';
  }
}

export class BadRequestError extends HttpException {
  static code = 400;

  constructor(message: string, error?: Error) {
    super(message, BadRequestError.code, error);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends HttpException {
  static code = 404;

  constructor(message: string, error?: Error) {
    super(message, NotFoundError.code, error);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends HttpException {
  static code = 403;
  redirect?: string;

  constructor(message?: string, redirect?: string) {
    super(message || 'Não autorizado.', ForbiddenError.code);
    this.name = 'ForbiddenError';
    this.redirect = redirect;
  }
}

export class UnauthorizedError extends HttpException {
  static code = 401;

  constructor(message?: string) {
    super(message || 'Não autorizado.', UnauthorizedError.code);
    this.name = 'Unauthorized';
  }
}

export class ConflictError extends HttpException {
  static code = 409;

  constructor(message?: string) {
    super(message || 'Conflito', ConflictError.code);
    this.name = 'Conflict';
  }
}

export class PreconditionFailedError extends HttpException {
  static code = 412;

  constructor(message?: string) {
    super(message || 'Não autorizado.', PreconditionFailedError.code);
    this.name = 'PreconditionFailed';
  }
}

export class ServiceUnavailable extends HttpException {
  static code = 503;

  constructor(message?: string) {
    super(message || 'Serviço indisponível', ServiceUnavailable.code);
    this.name = 'Service Unavailable';
  }
}

export class TooManyRequestError extends HttpException {
  static code = 429;

  constructor(message?: string) {
    super(message || 'Too Many Requests', TooManyRequestError.code);
    this.name = 'TooManyRequestError';
  }
}

export class GoneError extends HttpException {
  static code = 410;

  constructor(message: string) {
    super(message, GoneError.code);
    this.name = 'Gone';
  }
}
