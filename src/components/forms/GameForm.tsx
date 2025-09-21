import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Game } from '../../types';
import { gamesApi } from '../../services/api';
import Button from '../Button';

const gameSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().min(1, 'Description is required'),
  minPlayers: z.number().min(1, 'Minimum players must be at least 1'),
  maxPlayers: z.number().min(1, 'Maximum players must be at least 1'),
  playerMultiple: z.number().min(1, 'Player multiple must be at least 1'),
  status: z.string().min(1, 'Status is required'),
  duration: z.string().min(1, 'Duration is required'),
});

type GameFormData = z.infer<typeof gameSchema>;

interface GameFormProps {
  game?: Game | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const GameForm: React.FC<GameFormProps> = ({ game, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      minPlayers: 1,
      maxPlayers: 1,
      playerMultiple: 1,
      status: 'active',
      duration: '',
    },
  });

  useEffect(() => {
    if (game) {
      reset({
        name: game.name,
        price: game.price,
        description: game.description,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        playerMultiple: game.playerMultiple,
        status: game.status,
        duration: game.duration,
      });
    }
  }, [game, reset]);

  const onFormSubmit = async (data: GameFormData) => {
    try {
      setIsSubmitting(true);
      if (game?.id) {
        // Update existing game
        await gamesApi.update({ ...data, id: game.id });
      } else {
        // Create new game
        await gamesApi.create(data);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving game:', error);
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
          className="mt-1 block w-full rounded-lg border-2 border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-all duration-200 hover:border-purple-300"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Players</label>
          <input
            type="number"
            {...register('minPlayers', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.minPlayers && <p className="mt-1 text-sm text-red-600">{errors.minPlayers.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Players</label>
          <input
            type="number"
            {...register('maxPlayers', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.maxPlayers && <p className="mt-1 text-sm text-red-600">{errors.maxPlayers.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Player Multiple</label>
        <input
          type="number"
          {...register('playerMultiple', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
        {errors.playerMultiple && <p className="mt-1 text-sm text-red-600">{errors.playerMultiple.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Duration</label>
        <input
          type="text"
          placeholder="e.g., 30-60 minutes"
          {...register('duration')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
        {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : game ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default GameForm;
