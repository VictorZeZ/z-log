"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Shimmer } from "@shimmer-from-structure/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DashboardPageHeading } from "@/components/pages/dashboard/shared/DashboardPageHeading";
import { mySessionsQueryKey, useMySessions } from "@/hooks/api/useMySessions";
import { useRevokeSession } from "@/hooks/api/useRevokeSession";
import { handleApiError } from "@/lib/api/errorHandler";
import type { GetMySessionsResponse } from "@/types/api/dashboard";
import { RevokeSessionDialog } from "./RevokeSessionDialog";
import { SessionRow } from "./SessionRow";

export function DashboardSessions() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching, refetch } = useMySessions(true);
  const {
    mutate: revokeSession,
    isPending: isRevoking,
    variables: revokingSessionId,
  } = useRevokeSession();
  const [sessionToRevoke, setSessionToRevoke] =
    useState<GetMySessionsResponse | null>(null);

  const sessions = [...(data ?? [])].sort(
    (a, b) => Number(b.isCurrent) - Number(a.isCurrent),
  );

  const handleConfirmRevoke = () => {
    if (!sessionToRevoke) return;

    revokeSession(sessionToRevoke.id, {
      onSuccess: () => toast.success("Session revoked."),
      onError: handleApiError,
      onSettled: () =>
        queryClient.invalidateQueries({ queryKey: mySessionsQueryKey }),
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Shimmer loading>
          <div className="flex flex-col divide-y">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 py-5">
                <div className="bg-muted size-10 rounded-2xl" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="bg-muted h-4 w-40 rounded" />
                  <div className="bg-muted h-3 w-64 rounded" />
                </div>
              </div>
            ))}
          </div>
        </Shimmer>
      );
    }

    if (isError || !data) {
      return (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-slate-zero text-sm">
            Couldn&apos;t load your sessions.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      );
    }

    if (sessions.length === 0) {
      return (
        <p className="text-slate-zero py-12 text-center text-sm">
          No active sessions.
        </p>
      );
    }

    return (
      <ul className="flex flex-col divide-y">
        {sessions.map((session) => (
          <SessionRow
            key={session.id}
            session={session}
            isRevoking={isRevoking && revokingSessionId === session.id}
            onRevoke={setSessionToRevoke}
          />
        ))}
      </ul>
    );
  };

  return (
    <>
      <DashboardPageHeading
        eyebrow="Account security"
        title="Active sessions"
        description="Review the devices that have access to your account."
      >
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw size={16} />
          Refresh
        </Button>
      </DashboardPageHeading>

      <section className="bg-slate-two w-full max-w-3xl rounded-3xl border px-5 shadow-md">
        {renderContent()}
      </section>

      <RevokeSessionDialog
        session={sessionToRevoke}
        onOpenChange={(open) => !open && setSessionToRevoke(null)}
        onConfirm={handleConfirmRevoke}
      />
    </>
  );
}
