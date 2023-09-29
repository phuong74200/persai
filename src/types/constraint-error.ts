export interface ConstraintError<V = Record<string, string>> {
  type: string;
  status: number;
  violations: {
    field: keyof V;
    message: string;
  }[];

  title: string;
}

export const keys: (keyof ConstraintError)[] = ["status", "title", "type", "violations"];
