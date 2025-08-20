"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface SessionUser {
  userId: number;
  nickname: string;
}

interface SessionResponse {
  responseType: "SUCCESS" | "ERROR";
  result: {
    user: SessionUser;
    tokenSet: {
      accessToken: string;
    };
  };
}

export interface UseSessionResult {
  user: SessionUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isPending: boolean;
  error: Error | null;
  refetch: () => void;
}

const useSession = ({
  required,
}: {
  required?: boolean;
} = {}): UseSessionResult => {
  const router = useRouter();

  const { data: { result } = {}, ...query } = useQuery({
    queryKey: ["/api/auth/session"],
    queryFn: async (): Promise<SessionResponse> => {
      const response = await fetch("/api/auth/session", {
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch session: ${response.statusText}`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: (failureCount, error) => {
      if (error.message.includes("401")) {
        return false;
      }
      return failureCount < 2;
    },
  });

  if (required && !query.isLoading && !result?.tokenSet.accessToken) {
    const to = window.location.pathname + window.location.search;
    router.push(`/api/auth/login?to=${encodeURIComponent(to)}`);
  }

  return {
    user: result?.user || null,
    accessToken: result?.tokenSet.accessToken || null,
    isAuthenticated: Boolean(result?.tokenSet.accessToken),
    isLoading: query.isLoading,
    isPending: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useSession;
