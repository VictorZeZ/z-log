"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchCurrentUser } from "@/lib/store/userSlice";

function LoadSession() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Cookies.get("token")) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return null;
}

export default LoadSession;
