import { Link, useNavigate, useParams } from "react-router-dom";
import { GoBack } from "../components/GoBack";
import { useApp } from "../providers/AppProvider";
import { PlayerList } from "./PlayerList";
import { RoomCode } from "./RoomCode";

export const Lobby = () => {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const app = useApp();
  if (!app) {
    return null;
  }

  const { user } = app;
  const isHost = user?.id === "1234";

  const game = {
    id: "1234",
    host: "5678",
    playersIds: ["5678", "9012"],
    players: [
      {
        name: "John Doe",
        id: "5678",
      },
      {
        name: "Jane Doe",
        id: "9012",
      },
    ],
  };

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
