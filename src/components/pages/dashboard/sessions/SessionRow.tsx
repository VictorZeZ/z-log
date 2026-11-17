import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDeviceInfo } from "@/lib/device";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import type { GetMySessionsResponse } from "@/types/api/dashboard";

type SessionRowProps = {
  session: GetMySessionsResponse;
  isRevoking: boolean;
  onRevoke: (session: GetMySessionsResponse) => void;
};

export function SessionRow({ session, isRevoking, onRevoke }: SessionRowProps) {
  const { label, isMobile } = parseDeviceInfo(session.deviceInfo);
  const Icon = isMobile ? Smartphone : Monitor;

  return (
    <li className="flex items-center gap-4 py-5">
      <span className="bg-indigo-zero/10 text-indigo-zero flex size-10 shrink-0 items-center justify-center rounded-2xl">
        <Icon size={20} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          className="truncate text-sm font-medium"
          title={session.deviceInfo}
        >
          {label}
        </span>
        <span className="text-slate-zero text-xs">
          Last refreshed {formatRelativeTime(session.createdAt)} · Expires{" "}
          {formatDate(session.expiresAt)}
        </span>
      </div>

      {session.isCurrent ? (
        <span className="bg-emerald-zero/15 text-emerald-zero rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap">
          Current session
        </span>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRevoke(session)}
          disabled={isRevoking}
          aria-label={`Revoke session on ${label}`}
        >
          Revoke
        </Button>
      )}
    </li>
  );
}
