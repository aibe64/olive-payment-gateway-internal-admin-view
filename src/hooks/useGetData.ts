import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/service";
import { Response, APIResponseCode } from "@/models";

interface GetDataArg {
  endpoint: string;
  queryKey: string;
}

export const useGetData = <TResponse>({ endpoint, queryKey }: GetDataArg) => {
  return useQuery<TResponse | undefined>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await apiClient.get(endpoint);
      const result: Response.Data<TResponse> = response.data;
      if (result.responseCode === APIResponseCode.Success) {
        return result.data;
      } else {
        return undefined;
      }
    },
    retry: false,
  });
};
