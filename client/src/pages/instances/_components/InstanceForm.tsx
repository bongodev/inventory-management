import { useState } from 'react';
import { Button } from '@/components/ui/button';

import type { CreateInstancePayload } from '@/api/types';

type InstanceFormProps = {
  onSubmit: (data: CreateInstancePayload) => void | Promise<void>;
  isLoading?: boolean;
};

export const InstanceForm = ({ onSubmit, isLoading }: InstanceFormProps) => {
  const [formData, setFormData] = useState<CreateInstancePayload>({
    name: '',
    subDomain: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateInstancePayload, string>>
  >({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateInstancePayload, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name is too long';
    }

    if (formData.subDomain && formData.subDomain.length > 100) {
      newErrors.subDomain = 'Subdomain is too long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit(formData);
  };

  const handleChange = (field: keyof CreateInstancePayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter instance name"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="subDomain" className="block text-sm font-medium mb-1">
          Subdomain
        </label>
        <input
          id="subDomain"
          type="text"
          value={formData.subDomain}
          onChange={(e) => handleChange('subDomain', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter subdomain"
          disabled={isLoading}
        />
        {errors.subDomain && (
          <p className="text-red-500 text-sm mt-1">{errors.subDomain}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Instance'}
      </Button>
    </form>
  );
};
