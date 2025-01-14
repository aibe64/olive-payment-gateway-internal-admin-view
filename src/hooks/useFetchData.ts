import { apiClient } from "@/service";
import { APIResponseCode, Response } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { Notify } from "@/shared";

// Define the arguments type for mutationFn
interface FetchDataArgs {
  endpoint: string;
  token?: string;
  hideError?: boolean;
}
export const useFetchData = <TResponse>(mutationKey?: any) => {
  return useMutation<TResponse, unknown, FetchDataArgs>({
    mutationFn: async ({
      endpoint,
      token,
    }: FetchDataArgs): Promise<TResponse> => {
      const response = await apiClient.get<Response.Data<TResponse>>(
        endpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;
      if (result.responseCode === APIResponseCode.Success) {
        return result.data as TResponse;
      } else {
        throw new Error(
          result.responseMessage || "An error occurred while fetching data."
        );
      }
    },
    mutationKey: mutationKey,
    onError: (error, request) => {
      if (!request.hideError) {
        const errorResponse: Response.AxiosError<Response.Data<null>> =
          error as Response.AxiosError<Response.Data<null>>;
        Notify(
          errorResponse.response?.data?.responseMessage ??
            "Sorry, Error occurred on the server. Please try again later",
          false
        );
      }
    },
  });
};
