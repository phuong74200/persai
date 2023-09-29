export type ResponseError = {
  status: number;
  detail: string;
  timestamp: string;
  error: string;
};

export const keys: (keyof ResponseError)[] = ["detail", "error", "status", "timestamp"];
