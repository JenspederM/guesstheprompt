import { useNavigate } from "react-router-dom";
import { useApp } from "../providers/AppProvider";
import { useEffect, useState } from "react";
import { RoomCode } from "../components/RoomCode";
import { findGameByRoomCode } from "../utils";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { generateSlug } from "random-word-slugs";
import { firebaseGuid } from "../utils";
import { Game, Player } from "../types";
import { GoHome } from "../components/GoHome";

export const Host = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState(""); // TODO: [1
  const app = useApp();
  const { user } = app;

  const generateRoomCode = () => {
    const code = generateSlug(1);
    console.log("generateRoomCode", code);
    setRoomCode(code);
  };

  const createGame = async () => {
    if (!user) return;
    const existingGame = await findGameByRoomCode(roomCode);
    if (existingGame) {
      app.addNotification({
        text: "Game already exists. Please try again.",
        type: "error",
      });
      generateRoomCode();
      return;
    }
    // Create the user as a player
    const newPlayer: Player = {
      id: user.id,
      name: user.name,
      score: 0,
    };

    // Create the game
    const newGame: Game = {
      id: firebaseGuid(),
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

    // Add the game to the database
    await setDoc(doc(db, "games", newGame.id), newGame);

    // Set the current game for the user
    await updateDoc(doc(db, "users", user.id), { currentGame: newGame.id });

    // Navigate to the lobby
    navigate(`/lobby/${roomCode}`);
  };

  useEffect(() => {
    generateRoomCode();
  }, []);

  return (
    <>
      <div className="text-4xl">Create new game!</div>
      <div className="divider" />
      <RoomCode roomCode={roomCode} />
      <div className="divider" />
      <button onClick={generateRoomCode} className="btn btn-block btn-neutral">
        Generate Room Code
      </button>

      <div className="flex flex-col grow justify-end w-full space-y-4">
        <button className={`btn btn-block btn-primary`} onClick={createGame}>
          Create Game!
        </button>
        <GoHome className="btn-secondary" />
      </div>
    </>
  );
};
