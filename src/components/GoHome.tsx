import { Link } from "react-router-dom";
import { HomeIcon } from "./Icons";

export function GoHome() {
  return (
    <Link to="/" className="btn btn-block btn-primary">
      <HomeIcon />
      Go back home
    </Link>
  );
}
