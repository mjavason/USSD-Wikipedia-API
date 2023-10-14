import { Response } from 'express';
import { MESSAGES } from '../constants';

enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
  WE_MOVE = '10004',
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export function AuthFailureResponse(res: Response, message = MESSAGES.AUTH_FAILURE): Response {
  return res
    .status(ResponseStatus.UNAUTHORIZED)
    .send({ success: false, status_code: StatusCode.FAILURE, message });
}

export function NotFoundResponse(res: Response, message = MESSAGES.NOT_FOUND): Response {
  return res
    .status(ResponseStatus.NOT_FOUND)
    .send({ success: false, status_code: StatusCode.FAILURE, message });
}

export function ForbiddenResponse(res: Response, message = MESSAGES.FORBIDDEN): Response {
  return res
    .status(ResponseStatus.FORBIDDEN)
    .send({ success: false, status_code: StatusCode.FAILURE, message });
}

export function BadRequestResponse(res: Response, message = MESSAGES.BAD_PARAMETERS): Response {
  return res
    .status(ResponseStatus.BAD_REQUEST)
    .send({ success: false, status_code: StatusCode.FAILURE, message });
}

export function ForbiddenButWeMoveResponse<T>(
  res: Response,
  data: T,
  message = MESSAGES.BAD_PARAMETERS,
): Response {
  return res
    .status(ResponseStatus.FORBIDDEN)
    .json({ success: true, status_code: StatusCode.WE_MOVE, message, data });
}

export function InternalErrorResponse(res: Response, message = MESSAGES.INTERNAL_ERROR): Response {
  return res
    .status(ResponseStatus.INTERNAL_ERROR)
    .send({ success: false, status_code: StatusCode.FAILURE, message });
}

export function SuccessMsgResponse(res: Response, message = MESSAGES.FETCHED): Response {
  return res
    .status(ResponseStatus.SUCCESS)
    .send({ success: true, status_code: StatusCode.SUCCESS, message });
}

export function FailureMsgResponse(res: Response, message = MESSAGES.ERROR): Response {
  return res
    .status(ResponseStatus.SUCCESS)
    .send({ success: false, status_code: StatusCode.FAILURE, message });
}

export function SuccessResponse<T>(
  res: Response,
  data: T,
  message = MESSAGES.SUCCESSFUL,
): Response {
  return res
    .status(ResponseStatus.SUCCESS)
    .json({ success: true, status_code: StatusCode.SUCCESS, message, data });
}

export function AccessTokenErrorResponse(
  res: Response,
  message = MESSAGES.ACCESS_TOKEN_ERROR_RESPONSE,
): Response {
  return res
    .status(ResponseStatus.UNAUTHORIZED)
    .send({ success: false, status_code: StatusCode.INVALID_ACCESS_TOKEN, message });
}

export function TokenRefreshResponse(
  res: Response,
  message = MESSAGES.FETCHED,
  accessToken: string,
  refreshToken: string,
): Response {
  return res.status(ResponseStatus.SUCCESS).json({
    success: true,
    status_code: StatusCode.SUCCESS,
    message,
    access_token: accessToken,
    refresh_token: refreshToken,
  });
}
