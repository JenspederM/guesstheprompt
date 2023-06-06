import { useNavigate } from "react-router-dom";
import { useApp } from "../providers/AppProvider";
import { useEffect, useState } from "react";
import { RoomCode } from "./RoomCode";
import findGameByRoomCode from "../helpers/findGameByRoomCode";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

type Player = {
  id: string;
  name: string;
  score: number;
};

type Game = {
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

export const Host = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState(""); // TODO: [1
  const app = useApp();
  const { user } = app;

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRoomCode(code);
  };

  const createGame = async () => {
    if (!user) return;
    const existingGame = await findGameByRoomCode(roomCode);
    if (existingGame) {
      console.log("Game already exists");
      app.addNotification({
        text: "Game already exists. Please try again.",
        type: "error",
      });
      generateRoomCode();
      return;
    }
    console.log("createGame");
    const newPlayer: Player = {
      id: user.id,
      name: user.name,
      score: 0,
    };

    const newGame: Game = {
      id: "",
      roomCode: roomCode,
      type: "simons",
      isStarted: false,
      isFinished: false,
      host: user.id,
      round: 0,
      createdAt: new Date().toISOString(),
      players: { [user.id]: newPlayer },
      rating: [],
      comments: [],
    };

    await setDoc(doc(db, "games", newGame.id), newGame);
    navigate(`/game/${roomCode}`);
  };

  useEffect(() => {
    generateRoomCode();
  }, []);

  return (
    <>
      <div className="text-4xl">Create new game!</div>
      <div className="divider" />
      <RoomCode roomCode="" />
      <div className="divider" />

      <div className="flex flex-col grow justify-end w-full">
        <button className={`btn btn-block btn-primary`} onClick={createGame}>
          Create Game!
        </button>
      </div>
    </>
  );
};
