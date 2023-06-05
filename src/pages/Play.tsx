import { Link, useNavigate } from "react-router-dom";
import { GoBack } from "../components/GoBack";
import { useState } from "react";

export const Play = () => {
  let navigate = useNavigate();
  const [action, setAction] = useState<"join" | "host">("join");

  const activeTabClass = "tab tab-active tab-bordered tab-lg";
  const inactiveTabClass = "tab tab-lg";

  const switchAction = (action: "join" | "host") => {
    setAction(action);
  };

  return (
    <div className="flex flex-col grow w-full">
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
          {action === "join" && (
            <Input id="room-code" label="Room Code" value="hello" />
          )}
          <Input id="username" label="Name" value="fighter" />
          <Link to="/game" className="btn btn-primary btn-block">
            {action === "join" ? "Join game" : "Host game"}
          </Link>
        </div>
      </div>
    </div>
  );
};
function Input({
  id,
  value,
  label,
  maxChars = 0,
  disabled,
  placeholder,
}: {
  id: string;
  value: string;
  label?: string;
  maxChars?: number;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
        {maxChars > 0 && (
          <span className="label-text-alt">
            {value?.length || 0}/{maxChars}
          </span>
        )}
      </label>
      {maxChars > 30 ? (
        <textarea
          className="textarea textarea-bordered w-full placeholder-primary"
          onChange={(e) => {
            if (e.target.value.length > maxChars) {
              e.target.value = e.target.value.slice(0, maxChars);
            }
          }}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="input input-bordered w-full placeholder-primary"
          onChange={(e) => {
            if (e.target.value.length > maxChars) {
              e.target.value = e.target.value.slice(0, maxChars);
            }
          }}
          type="text"
          id={id}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
