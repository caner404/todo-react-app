export interface TodoType {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export enum FilterOptions {
  All = 1,
  Active,
  Completed,
}
