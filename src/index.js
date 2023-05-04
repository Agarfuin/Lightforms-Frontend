import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NewForm from "./pages/NewForm";
import Registration from "./pages/Registration";

// Styles
import "./assets/styles/base.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "newForm",
    element: <NewForm />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
