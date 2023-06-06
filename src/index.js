import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Redux Toolkit
import { store } from "./store/store";
import { Provider as ReduxProvider} from "react-redux";

// Pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NewForm from "./pages/NewForm";
import Registration from "./pages/Registration";

// Styles
import "./assets/styles/base.scss";

const theme = "light";
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
root.render(
  <ReduxProvider store={store}>
    <div className={theme}>
      <RouterProvider router={router} />
    </div>
  </ReduxProvider>
);
