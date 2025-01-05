import { AxiosResponse } from "axios";
import { ApiResponseType } from "@/types";
import axios from "axios";
import { toast } from "sonner";

export async function withAsync<T>(
  fn: () => Promise<AxiosResponse<ApiResponseType<T>>>
) {
  try {
    if (typeof fn !== "function") {
      throw new Error("The arg. must be a function.");
    }
    const { data } = await fn();
    const isError = data?.error;
    if (isError) {
      throw new Error(data.message);
    }
    return {
      response: data,
      error: null,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data.message || "Error.";
      return {
        error: message,
        response: null,
      };
    }
    return {
      error: err,
      response: null,
    };
  }
}

export async function handleError(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";

  toast.error(errorMessage, {
    duration: 5000,
  });
}

export async function handleSuccess(message: string) {
  toast.success(message, {
    duration: 5000,
  });
}
