import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import { Container } from "./components/Container";
import { routes } from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  routes.map((route) => {
    return {
      path: route.path,
      element: route.element,
    };
  }),
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <div className="flex flex-col absolute inset-0 items-center overscroll-contain max-h-screen min-h-0 overflow-hidden bg-base-200">
      <div className="flex flex-col grow w-full max-w-4xl items-center bg-base-100 pb-8 px-4">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
