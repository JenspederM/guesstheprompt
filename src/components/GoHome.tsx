import { Link } from "react-router-dom";
import { HomeIcon } from "./Icons";

export function GoHome({ className }: { className?: string }) {
  return (
    <Link to="/" className={`btn btn-block btn-primary ${className}`}>
      <HomeIcon />
      Go back home
    </Link>
  );
}
