import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  let error = useRouteError();
  return (
    <div
      className="flex flex-col grow items-center w-full justify-center space-y-12"
      id="error-page"
    >
      <h1>Oops!</h1>
      <div className="text-center">
        <p>Sorry, an unexpected error has occurred.</p>
        {isRouteErrorResponse(error) && (
          <p className="border border-primary rounded-lg p-4">
            <i>{error.statusText || error.statusText}</i>
          </p>
        )}
      </div>
      <Link className="btn btn-block btn-primary" to="/">
        Go back home
      </Link>
    </div>
  );
}
