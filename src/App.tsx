import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import GamesPage from './pages/GamesPage';
import MembersPage from './pages/MembersPage';
import CollectionsPage from './pages/CollectionsPage';
import TransactionsPage from './pages/TransactionsPage';
import RechargesPage from './pages/RechargesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/games" replace />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/recharges" element={<RechargesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

