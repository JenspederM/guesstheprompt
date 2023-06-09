export type User = {
  id: string;
  name: string;
  theme: string;
  lastLogin: number;
  createdAt: number;
};

export type CustomNotification = {
  text: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
};

export type Player = {
  id: string;
  name: string;
  score: number;
};

export type Game = {
  id: string;
  host: string;
  roomCode: string;
  type: string;
  players: { [key: string]: Player };
  round: number;
  isStarted: boolean;
  isFinished: boolean;
  createdAt: string;
  rating: number[];
  comments: string[];
};

export type Round = {
  id: number;
  scenario: string;
  images: string[];
  bestImage: string;
};

export type PromptedImage = {
  id: string;
  type: string;
  uri: string;
  createdBy: string;
  prompt: string;
};
