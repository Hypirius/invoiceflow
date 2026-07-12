type ApiSuccessRes<T> = {
  success: true;
  message?: string;
  data?: T;
};

type ApiErrorRes = {
  success: false;
  message: string;
  code: string;
  details?: string;
  errors?: string;
};

type ApiRes<T> = ApiSuccessRes<T> | ApiErrorRes;

export type { ApiSuccessRes, ApiErrorRes, ApiRes };
