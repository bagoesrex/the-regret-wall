import { createRegret, getRegrets } from "@/actions/regrets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useRegrets() {
  return useQuery({
    queryKey: ["regrets"],
    queryFn: () => getRegrets(),
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
