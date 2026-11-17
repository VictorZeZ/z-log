"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { parseDeviceInfo } from "@/lib/device";
import type { GetMySessionsResponse } from "@/types/api/dashboard";

type RevokeSessionDialogProps = {
  session: GetMySessionsResponse | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function RevokeSessionDialog({
  session,
  onOpenChange,
  onConfirm,
}: RevokeSessionDialogProps) {
  const label = session ? parseDeviceInfo(session.deviceInfo).label : "";

  return (
    <AlertDialog open={session !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke this session?</AlertDialogTitle>
          <AlertDialogDescription>
            {label} will be signed out and will need to log in again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep session</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Revoke
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
