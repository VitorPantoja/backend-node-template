import type { Response } from 'express';

export interface ApiResponseErrorDto {
  success?: boolean;
  status?: number;
  message: string | string[];
}

export interface AppResponse<T = any> extends Response {
  data: T;
}

export interface IResponseApi {
  success?: boolean;
}
