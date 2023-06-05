import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { routes } from "../routes";
import { PromptIcon } from "../components/Icons";

export const Home = () => {
  return (
    <Container>
      <div className="flex flex-col grow justify-end items-center space-y-4 p-4 overflow-y-scroll w-full">
        <div className="flex flex-col grow justify-center items-center space-y-4 text-2xl font-bold font-mono">
          <h1 className="">Guess the Prompt</h1>
          <PromptIcon />
        </div>
        <div className="flex flex-col h-2/5 justify-center w-full items-center space-y-4">
          {routes.map((route) => {
            if (route.path === "/") {
              return null;
            }

            return (
              <Link className="btn w-full sm:w-1/2 btn-primary" to={route.path}>
                {route.icon}
                {route.name}
              </Link>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
