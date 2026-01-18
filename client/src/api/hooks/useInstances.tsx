import { useMutation } from '@tanstack/react-query';

import http from '@/lib/http';
import type { CreateInstancePayload } from '../types';

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
