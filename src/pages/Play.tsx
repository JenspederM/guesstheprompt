import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/Input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useApp } from "../providers/AppProvider";
import { GoHome } from "../components/GoHome";
import { AddIcon, PromptIcon } from "../components/Icons";
import { findGameByRoomCode } from "../utils";

export const Play = () => {
  let navigate = useNavigate();
  const app = useApp();
  const [action, setAction] = useState<"join" | "host">("join");
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [roomCodeError, setRoomCodeError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const activeTabClass = "tab tab-active tab-bordered tab-lg";
  const inactiveTabClass = "tab tab-lg";

  const switchAction = (action: "join" | "host") => {
    setAction(action);
  };

  const validateInputs = () => {
    if (!app?.user) return false;
    const _name = username.trim().toLowerCase();
    const _roomCode = roomCode.trim().toLowerCase();

    if (!_name) {
      setUsernameError("Please enter a name");
      console.log("not valid");
      return false;
    }
    if (action === "join" && !_roomCode) {
      setRoomCodeError("Please enter a room code");
      console.log("not valid");
      return false;
    }
    console.log("valid");
    return true;
  };

  const submit = async () => {
    if (!app?.user) return;
    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    await updateDoc(doc(db, "users", app.user.id), { name: username });

    console.log("action", action);
    if (action === "join") {
      console.log("joining game");
      const game = await findGameByRoomCode(roomCode, app.user.id);
      console.log("game", game);
      if (!game) {
        setRoomCodeError("Game not found");
        return;
      }
      await updateDoc(doc(db, "games", game.id), {
        [`players.${app.user.id}`]: {
          id: app.user.id,
          name: username,
          score: 0,
        },
      });
    }

    navigate(`/lobby/${roomCode}`);
  };

  return (
    <>
      <div className="tabs pt-16">
        <button
          className={action === "join" ? activeTabClass : inactiveTabClass}
          onClick={() => switchAction("join")}
        >
          Join Game
        </button>
        <button
          className={action === "host" ? activeTabClass : inactiveTabClass}
          onClick={() => switchAction("host")}
        >
          Host Game
        </button>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <Input
          id="room-code"
          label="Room Code"
          value={roomCode}
          onChange={setRoomCode}
          errorText={roomCodeError}
          disabled={action === "host"}
        />
        <Input
          id="username"
          label="Name"
          maxChars={12}
          value={username}
          errorText={usernameError}
          onChange={setUsername}
        />
      </div>
      <div className="divider" />
      <div className="flex flex-col grow justify-end space-y-4 w-full">
        <button className="btn btn-primary btn-block" onClick={submit}>
          {action === "join" ? (
            <>
              Join game <AddIcon />
            </>
          ) : (
            <>
              Host game <PromptIcon />
            </>
          )}
        </button>
        <GoHome className="btn-secondary" />
      </div>
    </>
  );
};
