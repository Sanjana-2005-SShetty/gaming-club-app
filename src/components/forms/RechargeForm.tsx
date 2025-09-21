import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Recharge, Member } from '../../types';
import { rechargesApi } from '../../services/api';
import Button from '../Button';

const rechargeSchema = z.object({
  memberName: z.string().min(1, 'Member is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
});

type RechargeFormData = z.infer<typeof rechargeSchema>;

interface RechargeFormProps {
  recharge?: Recharge | null;
  members: Member[];
  onSubmit: () => void;
  onCancel: () => void;
}

const RechargeForm: React.FC<RechargeFormProps> = ({ 
  recharge, 
  members, 
  onSubmit, 
  onCancel 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RechargeFormData>({
    resolver: zodResolver(rechargeSchema),
    defaultValues: {
      memberName: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (recharge) {
      reset({
        memberName: recharge.memberName,
        amount: recharge.amount,
        date: recharge.date,
      });
    }
  }, [recharge, reset]);

  const onFormSubmit = async (data: RechargeFormData) => {
    try {
      setIsSubmitting(true);
      if (recharge?.id) {
        // Update existing recharge
        await rechargesApi.update({ ...data, id: recharge.id });
      } else {
        // Create new recharge - send memberName as required by backend
        const rechargeData = {
          memberName: data.memberName,
          amount: data.amount,
          date: data.date
        };
        await rechargesApi.create(rechargeData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving recharge:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Member</label>
        <select
          {...register('memberName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="">Select a member</option>
          {members.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
        {errors.memberName && <p className="mt-1 text-sm text-red-600">{errors.memberName.message}</p>}
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
          {isSubmitting ? 'Saving...' : recharge ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default RechargeForm;
