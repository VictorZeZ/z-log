"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useCurrentUser } from "@/hooks/api/useCurrentUser";
import { useAppDispatch } from "@/lib/store/hooks";
import { clearUser, setUser, setUserLoading } from "@/lib/store/userSlice";

function LoadSession() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useCurrentUser(
    Boolean(Cookies.get("token")),
  );

  useEffect(() => {
    dispatch(setUserLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(clearUser());
    }
  }, [isError, dispatch]);

  return null;
}

export default LoadSession;
