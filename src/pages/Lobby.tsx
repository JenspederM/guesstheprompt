import { Link, useNavigate, useParams } from "react-router-dom";
import { GoBack } from "../components/GoBack";

export const Lobby = () => {
  const navigate = useNavigate();
  const { roomCode } = useParams();
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
      {
        name: "Jane Doe",
        id: "9012",
      },
      {
        name: "Jane Doe",
        id: "9012",
      },
      {
        name: "Jane Doe",
        id: "9012",
      },
      {
        name: "Jane Doe",
        id: "9012",
      },
    ],
  };

  const player = game.players[0];
  const isHost = game.host === player.id;

  const copyToClipboard = () => {
    const roomCode = document.getElementById("roomCode") as HTMLSpanElement;
    const range = document.createRange();
    range.selectNode(roomCode);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    navigator.clipboard.writeText(roomCode.innerText);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <>
      <GoBack onClick={() => navigate(-1)} />
      <div className="text-4xl">Lobby!</div>
      <div className="divider" />
      <div className="flex space-x-2 py-8 px-16 text-2xl bg-base-300 shadow-lg rounded-box text-center">
        <span>Your room code is</span>
        <button
          className="flex items-center font-mono uppercase text-primary-content"
          id="roomCode"
          onClick={copyToClipboard}
        >
          {roomCode}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
          >
            <path d="M10 3V5H5V19H19V14H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H10ZM17.5858 5H13V3H21V11H19V6.41421L12 13.4142L10.5858 12L17.5858 5Z"></path>
          </svg>
        </button>
      </div>
      <div className="divider" />

      <div className="flex flex-col w-full grow items-center justify-start overflow-hidden py-4">
        <div className="flex text-3xl mb-4 w-full justify-between items-center">
          <div>🧛‍♂️</div>
          <div>🤦🏽‍♀️</div>
          <div>Players</div>
          <div>🙅🏿‍♂️</div>
          <div>🙋🏼‍♀️</div>
        </div>
        <div className="grid grid-cols-2 grow w-full place-items-center overflow-y-auto">
          {game.players.map((player) => (
            <div className="flex space-x-2 w-full items-center justify-center">
              <div className="pb-1">{player.id === game.host && "👑"}</div>
              <div>{player.name}</div>
              <div className="pb-1">{player.id === game.host && "👑"}</div>
            </div>
          ))}
        </div>
      </div>

      <Link
        to={`/game/${roomCode}`}
        className={`btn btn-block ${isHost ? "btn-primary" : "btn-disabled"}`}
      >
        Start Game!
      </Link>
    </>
  );
};
