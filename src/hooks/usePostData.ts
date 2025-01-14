import { apiClient } from "@/service";
import { Notify } from "@/shared";
import { Response, APIResponseCode } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostDataArg {
  endpoint: string;
  queryKey: string;
}

export const usePostData = <TRequest, TResponse>({
  endpoint,
  queryKey,
}: PostDataArg) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (newData: TRequest): Promise<TResponse> => {
      const response = await apiClient.post<Response.Data<TResponse>>(
        endpoint,
        newData
      );
      const result = response.data;
      if (result.responseCode === APIResponseCode.Success) {
        return result.data as TResponse;
      } else {
        Notify(
          result.responseMessage ??
            "Sorry error occurred on the server. Please try again",
          false
        );
        throw new Error(
          result.responseMessage ||
            "Sorry error occurred on the server. Please try again"
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
    onError: (error, request) => {
      const errorResponse: Response.AxiosError<Response.Data<null>> =
        error as Response.AxiosError<Response.Data<null>>;
      const payload: { hideToast: boolean } = request as any;
      if (!payload?.hideToast)
        Notify(
          errorResponse.response?.data?.responseMessage ??
            "Sorry, Error occurred on the server. Please try again later",
          false
        );
    },
  });
};
