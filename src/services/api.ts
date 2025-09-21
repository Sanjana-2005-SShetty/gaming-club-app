import axios from 'axios';
import { Game, Member, Collection, Transaction, Recharge } from '../types';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Games API
export const gamesApi = {
  getAll: (): Promise<Game[]> => api.get('/games').then(res => res.data),
  create: (game: Omit<Game, 'id'>): Promise<Game> => api.post('/games', game).then(res => res.data),
  update: (game: Game): Promise<Game> => api.put(`/games/${game.id}`, game).then(res => res.data),
  delete: (id: string): Promise<void> => api.delete(`/games/${id}`).then(res => res.data),
};

// Members API
export const membersApi = {
  getAll: (): Promise<Member[]> => api.get('/members').then(res => res.data),
  getById: (id: string): Promise<Member> => api.get(`/members/${id}`).then(res => res.data),
  create: (member: Omit<Member, 'id'>): Promise<Member> => api.post('/members', member).then(res => res.data),
  update: (member: Member): Promise<Member> => api.put(`/members/${member.id}`, member).then(res => res.data),
  delete: (id: string): Promise<void> => api.delete(`/members/${id}`).then(res => res.data),
};

// Collections API
export const collectionsApi = {
  getAll: (): Promise<Collection[]> => api.get('/collections').then(res => res.data),
  create: (collection: Omit<Collection, 'id'>): Promise<Collection> => api.post('/collections', collection).then(res => res.data),
  update: (collection: Collection): Promise<Collection> => api.put(`/collections/${collection.id}`, collection).then(res => res.data),
  delete: (id: string): Promise<void> => api.delete(`/collections/${id}`).then(res => res.data),
};

// Transactions API
export const transactionsApi = {
  getAll: (): Promise<Transaction[]> => api.get('/transactions').then(res => res.data),
  create: (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => api.post('/transactions', transaction).then(res => res.data),
  update: (transaction: Transaction): Promise<Transaction> => api.put(`/transactions/${transaction.id}`, transaction).then(res => res.data),
  delete: (id: string): Promise<void> => api.delete(`/transactions/${id}`).then(res => res.data),
};

// Recharges API
export const rechargesApi = {
  getAll: (): Promise<Recharge[]> => api.get('/recharges').then(res => res.data),
  create: (recharge: Omit<Recharge, 'id'>): Promise<Recharge> => api.post('/recharges', recharge).then(res => res.data),
  update: (recharge: Recharge): Promise<Recharge> => api.put(`/recharges/${recharge.id}`, recharge).then(res => res.data),
  delete: (id: string): Promise<void> => api.delete(`/recharges/${id}`).then(res => res.data),
};

export default api;
