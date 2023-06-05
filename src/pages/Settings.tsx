import { Link } from "react-router-dom";

export const Settings = () => {
  return (
    <div>
      <div>Settings!</div>
      <Link to="/" className="btn btn-block">
        Go back home
      </Link>
    </div>
  );
};
