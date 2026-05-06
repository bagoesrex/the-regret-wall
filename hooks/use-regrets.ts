import { getRegrets } from "@/actions/regrets";
import { useQuery } from "@tanstack/react-query";

export function useRegrets() {
  return useQuery({
    queryKey: ["regrets"],
    queryFn: () => getRegrets(),
    refetchInterval: 30_000,
  });
}
