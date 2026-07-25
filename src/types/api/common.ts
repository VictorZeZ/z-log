export type ApiErrorResponse = {
  statusCode: number;
  errorCode: string;
  title: string;
  details?: Record<string, unknown>;
};

export class ApiError extends Error {
  statusCode: number;
  errorCode: string;
  details?: Record<string, unknown>;

  constructor(
    statusCode: number,
    errorCode: string,
    message: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}
