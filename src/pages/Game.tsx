import { useNavigate, useParams } from "react-router-dom";
import { GoBack } from "../components/GoBack";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { Game as GameType } from "../types";

export const Game = () => {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const [game, setGame] = useState<GameType>(); // TODO: [1

  useEffect(() => {
    if (!roomCode) {
      navigate("/");
      return;
    }

    const _query = query(
      collection(db, "games"),
      where("roomCode", "==", roomCode),
    );

    const querySnapshot = onSnapshot(_query, (snap) => {
      console.log("snapshot", snap);
    });

    return () => querySnapshot();
  }, []);

  useEffect(() => {
    if (!game) {
      return;
    }
    const unsubscribe = onSnapshot(doc(db, "games", game.id), (doc) => {
      const game = doc.data() as GameType;
      setGame(game);
    });
    return () => unsubscribe();
  }, [game]);

  return (
    <>
      <GoBack onClick={() => navigate(-1)} />
      <div>Welcome to {roomCode}</div>
    </>
  );
};
