import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Transaction, Member, Game } from '../../types';
import { transactionsApi } from '../../services/api';
import Button from '../Button';

const transactionSchema = z.object({
  memberId: z.string().min(1, 'Member is required'),
  gameId: z.string().min(1, 'Game is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  transaction?: Transaction | null;
  members: Member[];
  games: Game[];
  onSubmit: () => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  transaction, 
  members, 
  games, 
  onSubmit, 
  onCancel 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      memberId: '',
      gameId: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (transaction) {
      reset({
        memberId: transaction.memberId,
        gameId: transaction.gameId,
        amount: transaction.amount,
        date: transaction.date,
      });
    }
  }, [transaction, reset]);

  const onFormSubmit = async (data: TransactionFormData) => {
    try {
      setIsSubmitting(true);
      if (transaction?.id) {
        // Update existing transaction
        await transactionsApi.update({ ...data, id: transaction.id });
      } else {
        // Create new transaction - send memberId and gameId as required by backend
        const transactionData = {
          memberId: data.memberId,
          gameId: data.gameId,
          amount: data.amount,
          date: data.date
        };
        await transactionsApi.create(transactionData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Member</label>
        <select
          {...register('memberId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="">Select a member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        {errors.memberId && <p className="mt-1 text-sm text-red-600">{errors.memberId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Game</label>
        <select
          {...register('gameId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="">Select a game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name} - ${game.price}
            </option>
          ))}
        </select>
        {errors.gameId && <p className="mt-1 text-sm text-red-600">{errors.gameId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          {...register('date')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : transaction ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
