export type CreateInstancePayload = {
  name: string;
  subDomain?: string;
};

export type SearchInstanceRequest = {
  searchQuery?: string;
  offset?: number;
  limit?: number;
};
