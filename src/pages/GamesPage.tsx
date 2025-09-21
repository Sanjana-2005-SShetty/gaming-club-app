import React, { useState, useEffect } from 'react';
import { Plus, Gamepad2 } from 'lucide-react';
import { Game } from '../types';
import { gamesApi } from '../services/api';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import GameForm from '../components/forms/GameForm';

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const data = await gamesApi.getAll();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleAddGame = () => {
    setEditingGame(null);
    setIsModalOpen(true);
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setIsModalOpen(true);
  };

  const handleDeleteGame = async (game: Game) => {
    if (window.confirm(`Are you sure you want to delete "${game.name}"?`)) {
      try {
        await gamesApi.delete(game.id!);
        await fetchGames();
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingGame(null);
  };

  const handleFormSubmit = async () => {
    await fetchGames();
    handleModalClose();
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price', render: (value: number) => `$${value.toFixed(2)}` },
    { key: 'description', label: 'Description' },
    { key: 'minPlayers', label: 'Min Players' },
    { key: 'maxPlayers', label: 'Max Players' },
    { key: 'duration', label: 'Duration' },
    { key: 'status', label: 'Status', render: (value: string) => (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-200 to-blue-200 rounded-xl p-6 text-purple-900 shadow-lg border border-purple-300">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-300 rounded-lg">
            <Gamepad2 className="h-8 w-8 text-purple-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-purple-900">Games</h1>
            <p className="text-purple-700">Manage your game collection</p>
          </div>
        </div>
        <Button onClick={handleAddGame} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Game
        </Button>
      </div>

      <Table
        columns={columns}
        data={games}
        onEdit={handleEditGame}
        onDelete={handleDeleteGame}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingGame ? 'Edit Game' : 'Add New Game'}
      >
        <GameForm
          game={editingGame}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default GamesPage;
