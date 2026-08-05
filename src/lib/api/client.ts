import Cookies from "js-cookie";
import { ApiError, type ApiErrorResponse } from "@/types/api/common";
import { store } from "@/lib/store/store";
import { clearUser } from "@/lib/store/userSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SESSION_EXPIRED_ERROR_CODE = "SESSION_EXPIRED";

type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  skipAuthRetry?: boolean;
};

// Shared across concurrent 401s so only one refresh request is ever in flight.
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    throw new ApiError(401, SESSION_EXPIRED_ERROR_CODE, "No refresh token");
  }

  const result = await apiClient<{ accessToken: string; refreshToken: string }>(
    "/auth/refresh",
    {
      method: "POST",
      body: { refreshToken },
      skipAuthRetry: true,
    },
  );

  Cookies.set("token", result.accessToken, { expires: 7 });
  Cookies.set("refreshToken", result.refreshToken, { expires: 7 });

  return result.accessToken;
}

export function clearAuthCookies() {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
}

// The refresh-token flow is the only place that can reliably detect an
// unrecoverable session (refresh token invalid/expired/missing). When that
// happens we clear both the auth cookies and the client-side user state.
function handleSessionExpired() {
  clearAuthCookies();
  store.dispatch(clearUser());
}

async function performFetch<TResponse>(
  endpoint: string,
  options: ApiClientOptions,
  token: string | undefined,
): Promise<{ response: Response; parsed: TResponse | undefined }> {
  const { body, headers, skipAuthRetry, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.ok) {
    const parsed =
      response.status === 204
        ? undefined
        : ((await response.json()) as TResponse);
    return { response, parsed };
  }

  return { response, parsed: undefined };
}

export async function apiClient<TResponse>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<TResponse> {
  const token = Cookies.get("token");
  const { response, parsed } = await performFetch<TResponse>(
    endpoint,
    options,
    token,
  );

  if (response.ok) {
    return parsed as TResponse;
  }

  const canRetryWithRefresh =
    response.status === 401 &&
    !options.skipAuthRetry &&
    Cookies.get("refreshToken");

  if (canRetryWithRefresh) {
    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const newToken = await refreshPromise;

      const retried = await performFetch<TResponse>(
        endpoint,
        options,
        newToken,
      );
      if (retried.response.ok) {
        return retried.parsed as TResponse;
      }
    } catch {
      handleSessionExpired();
      throw new ApiError(401, SESSION_EXPIRED_ERROR_CODE, "Session expired");
    }

    handleSessionExpired();
    throw new ApiError(401, SESSION_EXPIRED_ERROR_CODE, "Session expired");
  }

  const errorBody: Partial<ApiErrorResponse> = await response
    .json()
    .catch(() => ({}));

  throw new ApiError(
    errorBody.statusCode ?? response.status,
    errorBody.errorCode ?? "UNKNOWN_ERROR",
    errorBody.title ?? "Request failed",
    errorBody.details,
  );
}