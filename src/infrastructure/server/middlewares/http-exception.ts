export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message = 'unspecified_error', stack = 'HttpException') {
    super(message);
    this.status = status;
    this.message = message;
    this.stack = stack;
  }
}

export enum ErrMsg {
  tooManyRequests = 'too_many_requests',
  unavailableService = 'unavailable_service',
  noFound = 'no_found',
  update = 'update_error',
  create = 'create_error',
  invalid_recover_token = 'invalid_recover_token',
  invalidToken = 'invalid_token',
  invalidDates = 'invalid_dates',
  badRequest = 'bad_request',
  badRequestUri = 'bad_request_uri',
  recordCannotDuplicate = 'record_cannot_duplicate',
  notRegistered = 'not_registered',
  disabledUser = 'disabled_user',
  unauthorized = 'unauthorized',
  invalidCredentials = 'invalid_credentials',
  invalidData = 'invalid_data',
}
