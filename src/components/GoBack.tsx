import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "./Icons";

export function GoBack({
  onClick,
  className,
  text = "Back",
}: {
  onClick?: () => void;
  className?: string;
  text?: string;
}) {
  const navigate = useNavigate();
  return (
    <div className={`w-full ${className}`}>
      <button
        onClick={onClick || (() => navigate(-1))}
        className="flex space-x-1 items-center py-2 px-4 -ml-4"
      >
        <ChevronLeftIcon />
        <div>{text}</div>
      </button>
    </div>
  );
}
