import { Link, useNavigate, useParams } from "react-router-dom";
import { GoBack } from "../components/GoBack";
import { useApp } from "../providers/AppProvider";
import { PlayerList } from "../components/PlayerList";
import { RoomCode } from "../components/RoomCode";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { Game } from "../types";

export const Lobby = () => {
  const [game, setGame] = useState<Game>(); // TODO: [1
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const app = useApp();
  if (!app) {
    return null;
  }

  useEffect(() => {
    if (!roomCode) {
      navigate("/");
      return;
    }

    const gamesCollection = collection(db, "games");
    const _query = query(gamesCollection, where("roomCode", "==", roomCode));
    // const querySnapshot = getDocs(_query);
    const querySnapshot = onSnapshot(_query, (snap) => {
      console.log("snapshot", snap);
      snap.docs.forEach((doc) => {
        console.log("doc", doc.data());
      });
      setGame(snap.docs[0].data() as Game);
    });
    return () => querySnapshot();
  }, []);

  useEffect(() => {
    if (!game) {
      return;
    }
    const unsubscribe = onSnapshot(doc(db, "games", game.id), (doc) => {
      const game = doc.data() as Game;
      console.log("game", game);
      setGame(game);
    });
    return () => unsubscribe();
  }, [game]);

  const { user } = app;

  if (!user || !roomCode || !game) {
    navigate("/");
    return (
      <div>
        <GoBack onClick={() => navigate(-1)} />

        <div className="text-4xl">Game not found!</div>
      </div>
    );
  }

  const isHost = user.id;

  return (
    <>
      <GoBack onClick={() => navigate(-1)} />
      <div className="text-4xl">Lobby!</div>
      <div className="divider" />
      <RoomCode roomCode={roomCode} />
      <div className="divider" />
      <PlayerList game={game} />
      <Link
        to={`/game/${roomCode}`}
        className={`btn btn-block ${isHost ? "btn-primary" : "btn-disabled"}`}
      >
        Start Game!
      </Link>
    </>
  );
};
