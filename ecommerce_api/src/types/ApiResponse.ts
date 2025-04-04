export type ApiSuccessResponse = {
  success: boolean;
  data: any;
  message: string;
  meta?: any;
};

export type ApiErrorResponse = {
  success: boolean;
  error: any;
  message: string;
};
