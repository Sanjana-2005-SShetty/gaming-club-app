import React, { useState, useEffect } from 'react';
import { Plus, FolderOpen } from 'lucide-react';
import { Collection } from '../types';
import { collectionsApi } from '../services/api';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import CollectionForm from '../components/forms/CollectionForm';

const CollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const data = await collectionsApi.getAll();
      setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleAddCollection = () => {
    setEditingCollection(null);
    setIsModalOpen(true);
  };

  const handleEditCollection = (collection: Collection) => {
    setEditingCollection(collection);
    setIsModalOpen(true);
  };

  const handleDeleteCollection = async (collection: Collection) => {
    if (window.confirm(`Are you sure you want to delete "${collection.name}"?`)) {
      try {
        await collectionsApi.delete(collection.id!);
        await fetchCollections();
      } catch (error) {
        console.error('Error deleting collection:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCollection(null);
  };

  const handleFormSubmit = async () => {
    await fetchCollections();
    handleModalClose();
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-orange-200 to-red-200 rounded-xl p-6 text-orange-900 shadow-lg border border-orange-300">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-300 rounded-lg">
            <FolderOpen className="h-8 w-8 text-orange-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-orange-900">Collections</h1>
            <p className="text-orange-700">Organize your games</p>
          </div>
        </div>
        <Button onClick={handleAddCollection} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Collection
        </Button>
      </div>

      <Table
        columns={columns}
        data={collections}
        onEdit={handleEditCollection}
        onDelete={handleDeleteCollection}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingCollection ? 'Edit Collection' : 'Add New Collection'}
      >
        <CollectionForm
          collection={editingCollection}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default CollectionsPage;
