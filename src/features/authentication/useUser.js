import { useQuery } from "@tanstack/react-query";
import { mockGetCurrentUser, initMockData } from "../../data/mockData";

initMockData();

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: mockGetCurrentUser,
  });

  return { user, isLoading, isAuthenticated: Boolean(user) };
}