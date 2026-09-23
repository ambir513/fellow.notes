"use client";

import { useQuery } from "@tanstack/react-query";

async function getSession() {
    const res = await fetch("/api/auth/session", {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to get session");
    }

    return res.json();
}

export function useSession() {
    return useQuery({
        queryKey: ["session"],
        queryFn: getSession,
        staleTime: 5 * 60 * 1000,
    });
}