import { ChevronLeftIcon } from "./Icons";

export function GoBack({
  onClick,
  className,
  text,
}: {
  onClick?: () => void;
  className?: string;
  text: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <button
        onClick={onClick}
        className="flex space-x-1 items-center py-2 px-4 -ml-4"
      >
        <ChevronLeftIcon />
        <div>{text}</div>
      </button>
    </div>
  );
}
