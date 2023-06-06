import { Link, useNavigate } from "react-router-dom";
import { GoBack } from "../components/GoBack";
import { useState } from "react";
import { Input } from "../components/Input";

export const Play = () => {
  let navigate = useNavigate();
  const [action, setAction] = useState<"join" | "host">("join");
  const [roomCode, setRoomCode] = useState("texas");
  const [username, setUsername] = useState("");
  const [roomCodeError, setRoomCodeError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const activeTabClass = "tab tab-active tab-bordered tab-lg";
  const inactiveTabClass = "tab tab-lg";

  const switchAction = (action: "join" | "host") => {
    setAction(action);
  };

  const validateInputs = () => {
    const _name = username.trim().toLowerCase();
    const _roomCode = roomCode.trim().toLowerCase();

    if (!_name) {
      setUsernameError("Please enter a name");
      return false;
    }
    if (action === "join" && !_roomCode) {
      setRoomCodeError("Please enter a room code");
      return false;
    }

    return true;
  };

  const submit = () => {
    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    if (action === "join") {
      if (roomCode === "") {
        return;
      }
    } else {
    }
    navigate(`/play/${roomCode}`);
  };

  return (
    <>
      <GoBack onClick={() => navigate("/")} text="Back" />
      <div className="flex flex-col grow w-full items-center justify-start space-y-6">
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
            disabled={action === "host"}
          />
          <Input
            id="username"
            label="Name"
            maxChars={20}
            value={username}
            onChange={setUsername}
          />
          <div className="divider" />
          <Link
            to="/lobby/1234"
            className="btn btn-primary btn-block"
            onClick={submit}
          >
            {action === "join" ? "Join game" : "Host game"}
          </Link>
        </div>
      </div>
    </>
  );
};
