export type ApiResponseType<T> = {
  message: string;
  data: T;
  error: boolean;
};
