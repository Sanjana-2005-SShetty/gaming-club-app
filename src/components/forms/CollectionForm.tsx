import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Collection } from '../../types';
import { collectionsApi } from '../../services/api';
import Button from '../Button';

const collectionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

type CollectionFormData = z.infer<typeof collectionSchema>;

interface CollectionFormProps {
  collection?: Collection | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ collection, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (collection) {
      reset({
        name: collection.name,
        description: collection.description,
      });
    }
  }, [collection, reset]);

  const onFormSubmit = async (data: CollectionFormData) => {
    try {
      setIsSubmitting(true);
      if (collection?.id) {
        // Update existing collection
        await collectionsApi.update({ ...data, id: collection.id });
      } else {
        // Create new collection
        await collectionsApi.create(data);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving collection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : collection ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default CollectionForm;
