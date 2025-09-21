export interface Game {
  id?: string;
  name: string;
  price: number;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  playerMultiple: number;
  status: string;
  duration: string;
}

export interface Member {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Collection {
  id?: string;
  name: string;
  description: string;
}

export interface Transaction {
  id?: string;
  memberId: string;
  gameId: string;
  amount: number;
  date: string;
  memberName?: string;
  gameName?: string;
}

export interface Recharge {
  id?: string;
  memberName: string;
  amount: number;
  date: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
