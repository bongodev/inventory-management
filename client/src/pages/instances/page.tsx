import { useInstanceMutation } from '@/api/hooks';

import { InstanceForm } from './_components';

export const InstancePage = () => {
  const instanceMutation = useInstanceMutation();

  return (
    <div className="p-12">
      <InstanceForm onSubmit={(data) => instanceMutation.mutate(data)} />
    </div>
  );
};
