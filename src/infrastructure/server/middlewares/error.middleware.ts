import { type CelebrateError, isCelebrateError } from 'celebrate';
import type { NextFunction, Request, Response } from 'express';
import { IncomingMessage } from 'http';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

import type { ApiResponseErrorDto } from './api-response';
import { isBodyParserError } from './error.helper';
import { ErrMsg  } from './http-exception';

import { Utils } from '../../../utils';
import { HttpException } from '../../api/rest/utils/http-exceptions';

type MiddleErrors = HttpException | CelebrateError | Error | JsonWebTokenError | NotBeforeError | TokenExpiredError;

export function createErrorMiddleware() {
  const errorMiddleware = (
    error: MiddleErrors & { response: any; statusCode: any; status: number },
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    // const personId = req?.auth?.personId || 0;
    // const groupId = req?.auth?.groupId || 0;
    const url = `${req?.baseUrl}${req?.url}`;

    const result: ApiResponseErrorDto = {
      message: error?.message || 'Something went wrong ApiResponseErrorDto',
      status: 500,
      success: false
    };

    const responseEnd = (r: ApiResponseErrorDto) => {
      console.log('opaaaaa');
      console.log('errorMiddleware', { r });
      return res
        ?.status(r?.status || 500)
        ?.send(r)
        ?.end();
    };

    if (isCelebrateError(error)) {
      const messages: any[] = [];
      error.details.forEach((err: { details: any[] }) => {
        err.details.forEach((msg: { message: any }) => {
          messages.push(msg.message);
        });
      });

      result.status = 400;
      result.message = messages.length > 1 ? messages : messages[0];
      return responseEnd(result);
    }

    if (error instanceof URIError) {
      result.status = 400;
      result.message = ErrMsg.badRequestUri;
      Utils.TerminalLogger.logWarning(`${result?.status} url: ${url} ${result?.message}`, {
        level: 'WARN',
        scope: 'URI'
      });
      return responseEnd(result);
    }

    if (error instanceof HttpException) {
      result.status = error?.status || 500;
      result.message = error.message || 'Something went wrong HttpException';
    }

    if (error instanceof NotBeforeError || error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
      result.status = 401;
      console.log('error', error);
      result.message = error.message || ErrMsg.invalidToken;
    }

    if (error && isBodyParserError(error)) {
      result.status = error?.status || 500;
      result.message = `${error?.message || ErrMsg.invalidData} body-parser`;
      return responseEnd(result);
    }

    if (error && error?.response instanceof IncomingMessage) {
      const r = error.response as IncomingMessage;

      result.status = error?.statusCode || r.statusCode || 500;

      result.message = r?.statusMessage ?? 'Internal Server Error';
    }

    if (result.status && [401, 403].includes(result.status)) {
      Utils.TerminalLogger.logWarning(`${result?.status}: ${result?.message}`, { level: 'WARN', scope: 'CREDENTIALS' });
      return responseEnd(result);
    } else if (result.status && [400].includes(result?.status)) {
      Utils.TerminalLogger.logWarning(`${result?.status}: ${result?.message}`, { level: 'WARN', scope: 'CREDENTIALS' });
      return responseEnd(result);
    }

    return responseEnd(result);
  };

  return errorMiddleware;
}
