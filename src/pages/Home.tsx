import { Link } from "react-router-dom";
import { routes } from "../routes";
import { PromptIcon } from "../components/Icons";
import { useApp } from "../providers/AppProvider";

export const Home = () => {
  const app = useApp();

  function notifyMe() {
    app.setIsLoading(true);
  }
  return (
    <>
      <div className="flex flex-col grow justify-center items-center space-y-4 text-2xl font-bold font-mono">
        <h1 className="">Guess the Prompt</h1>
        <button onClick={notifyMe}>Notify me!</button>
        <PromptIcon />
      </div>
      <div className="flex flex-col h-2/5 justify-end w-full items-center space-y-4">
        {routes.map((route) => {
          if (!route.name || route.path === "/") {
            return null;
          }

          return (
            <Link
              key={route.path}
              className="btn w-full btn-primary"
              to={route.path}
            >
              {route.icon}
              {route.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};
