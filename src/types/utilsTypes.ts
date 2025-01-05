export type ApiResponseType<T> = {
  message: string;
  data: T | null;
  error: boolean;
};
