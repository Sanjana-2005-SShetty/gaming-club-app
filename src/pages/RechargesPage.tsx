import React, { useState, useEffect } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { Recharge, Member } from '../types';
import { rechargesApi, membersApi } from '../services/api';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import RechargeForm from '../components/forms/RechargeForm';

const RechargesPage: React.FC = () => {
  const [recharges, setRecharges] = useState<Recharge[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecharge, setEditingRecharge] = useState<Recharge | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [rechargesData, membersData] = await Promise.all([
        rechargesApi.getAll(),
        membersApi.getAll()
      ]);
      setRecharges(rechargesData);
      setMembers(membersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRecharge = () => {
    setEditingRecharge(null);
    setIsModalOpen(true);
  };

  const handleEditRecharge = (recharge: Recharge) => {
    setEditingRecharge(recharge);
    setIsModalOpen(true);
  };

  const handleDeleteRecharge = async (recharge: Recharge) => {
    if (window.confirm('Are you sure you want to delete this recharge?')) {
      try {
        await rechargesApi.delete(recharge.id!);
        await fetchData();
      } catch (error) {
        console.error('Error deleting recharge:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRecharge(null);
  };

  const handleFormSubmit = async () => {
    await fetchData();
    handleModalClose();
  };

  const columns = [
    { key: 'memberName', label: 'Member', render: (value: string) => value || 'Unknown Member' },
    { key: 'amount', label: 'Amount', render: (value: number) => `$${value.toFixed(2)}` },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-xl p-6 text-emerald-900 shadow-lg border border-emerald-300">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-300 rounded-lg">
            <Wallet className="h-8 w-8 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Recharges</h1>
            <p className="text-emerald-700">Manage member accounts</p>
          </div>
        </div>
        <Button onClick={handleAddRecharge} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Recharge
        </Button>
      </div>

      <Table
        columns={columns}
        data={recharges}
        onEdit={handleEditRecharge}
        onDelete={handleDeleteRecharge}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingRecharge ? 'Edit Recharge' : 'Add New Recharge'}
      >
        <RechargeForm
          recharge={editingRecharge}
          members={members}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default RechargesPage;
