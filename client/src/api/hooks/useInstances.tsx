import { useMutation, useQuery } from '@tanstack/react-query';

import http from '@/lib/http';
import type { CreateInstancePayload, SearchInstanceRequest } from '../types';
import { instanceServices } from '../services';

export const useInstanceMutation = () => {
  return useMutation({
    mutationFn: (instancePayload: CreateInstancePayload) =>
      http.post('/api/admin/instances', instancePayload),
    onSuccess: () => {
      alert('Instance created successfully');
    },
    onError: () => {
      alert('Failed to create instance');
    },
  });
};

const INSTANCE_SEARCH_QUERY_KEY = 'instance-search-query-key';

export const useInstanceSearch = (searchPayload: SearchInstanceRequest) => {
  const query = useQuery({
    queryKey: [INSTANCE_SEARCH_QUERY_KEY, searchPayload],
    queryFn: () => instanceServices.searchInstances(searchPayload),
  });

  return {
    instanceSearchQuery: query,
  };
};
