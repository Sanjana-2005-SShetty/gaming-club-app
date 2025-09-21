import React, { useState, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import { Member } from '../types';
import { membersApi } from '../services/api';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import MemberForm from '../components/forms/MemberForm';

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await membersApi.getAll();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (member: Member) => {
    if (window.confirm(`Are you sure you want to delete "${member.name}"?`)) {
      try {
        await membersApi.delete(member.id!);
        await fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleFormSubmit = async () => {
    await fetchMembers();
    handleModalClose();
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-green-200 to-teal-200 rounded-xl p-6 text-green-900 shadow-lg border border-green-300">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-300 rounded-lg">
            <Users className="h-8 w-8 text-green-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-900">Members</h1>
            <p className="text-green-700">Manage your gaming community</p>
          </div>
        </div>
        <Button onClick={handleAddMember} className="bg-green-600 hover:bg-green-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      <Table
        columns={columns}
        data={members}
        onEdit={handleEditMember}
        onDelete={handleDeleteMember}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingMember ? 'Edit Member' : 'Add New Member'}
      >
        <MemberForm
          member={editingMember}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default MembersPage;
