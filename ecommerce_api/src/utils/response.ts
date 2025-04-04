import { ApiErrorResponse, ApiSuccessResponse } from 'src/types/ApiResponse';

export const successResponse = (
  data: any,
  message: string,
  meta?: any,
): ApiSuccessResponse => {
  const response: ApiSuccessResponse = {
    success: true,
    data,
    message,
  };
  if (meta) {
    response.meta = meta;
  }
  return response;
};

export const errorResponse = (
  error: any,
  message: string,
): ApiErrorResponse => {
  return {
    success: false,
    error,
    message,
  };
};
