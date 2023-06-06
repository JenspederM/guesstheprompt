import { useEffect } from "react";
import { routes } from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import { AppProvider } from "./providers/AppProvider";
import { themeChange } from "theme-change";

const router = createBrowserRouter(
  routes.map((route) => {
    return {
      path: route.path,
      element: route.element,
      errorElement: <ErrorPage />,
    };
  }),
);

function App() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
