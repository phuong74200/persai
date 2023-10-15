export type ResponseError = {
  status: number;
  detail: string;
  title: string;
};

export const keys: (keyof ResponseError)[] = ["detail", "status", "title"];
