import { createRegret, getRegrets } from "@/actions/regrets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useRegrets() {
  return useQuery({
    queryKey: ["regrets"],
    queryFn: async () => {
      const response = await getRegrets();

      if (!response.success) {
        throw new Error(response.message ?? "Failed to load regrets");
      }

      return response;
    },
    refetchInterval: 30_000,
  });
}

export function useCreateRegret() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRegret,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regrets"] });
    },
  });
}
