import React, { useState, useEffect } from 'react';
import { Plus, CreditCard } from 'lucide-react';
import { Transaction, Member, Game } from '../types';
import { transactionsApi, membersApi, gamesApi } from '../services/api';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import TransactionForm from '../components/forms/TransactionForm';

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionsData, membersData, gamesData] = await Promise.all([
        transactionsApi.getAll(),
        membersApi.getAll(),
        gamesApi.getAll()
      ]);
      setTransactions(transactionsData);
      setMembers(membersData);
      setGames(gamesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = async (transaction: Transaction) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionsApi.delete(transaction.id!);
        await fetchData();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleFormSubmit = async () => {
    await fetchData();
    handleModalClose();
  };

  const columns = [
    { key: 'memberName', label: 'Member', render: (value: string) => value || 'Unknown Member' },
    { key: 'gameName', label: 'Game', render: (value: string) => value || 'Unknown Game' },
    { key: 'amount', label: 'Amount', render: (value: number) => `$${value.toFixed(2)}` },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl p-6 text-indigo-900 shadow-lg border border-indigo-300">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-300 rounded-lg">
            <CreditCard className="h-8 w-8 text-indigo-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Transactions</h1>
            <p className="text-indigo-700">Track game purchases</p>
          </div>
        </div>
        <Button onClick={handleAddTransaction} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <Table
        columns={columns}
        data={transactions}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      >
        <TransactionForm
          transaction={editingTransaction}
          members={members}
          games={games}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default TransactionsPage;
