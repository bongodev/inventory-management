export type PageResult<T> = {
  data: T[];
  total: number;
  offset: number;
  limit: number;
};
