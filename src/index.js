import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Redux Toolkit
import { store } from "./store/store";
import { Provider as ReduxProvider } from "react-redux";

// Pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NewForm from "./pages/NewForm";
import Registration from "./pages/Registration";

// Styles
import "./assets/styles/base.scss";

const theme = "light";

const fetchForm = async (request, formId) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return await fetch(
    `https://api.lightforms.co/api/services/forms/byUuid/${formId}`,
    { signal: request.signal, headers: headers }
  );
};

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
  {
    path: "/forms/:formId",
    id: "viewFormWithId",
    element: <NewForm />,
    // with this data loaded before rendering
    loader: async ({ request, params }) => {
      return fetchForm(request, params.formId);
    },
    // performing this mutation when data is submitted to it
    action: async ({ request }) => {
      // http://localhost:3000/forms/:byUuid adresinde submit tetiklenirse çalışır
      return await request.formData();
    },

    // and renders this element in case something went wrong
    /*  errorElement: <ErrorBoundary />, */
  },
  {
    path: "/forms/:formId/edit",
    id: "editFormWithId",
    element: <NewForm />,
    // with this data loaded before rendering
    loader: async ({ request, params }) => {
      return fetchForm(request, params.formId);
    },
    // performing this mutation when data is submitted to it
    action: async ({ request }) => {
      // http://localhost:3000/forms/:byUuid adresinde submit tetiklenirse çalışır
      return await request.formData();
    },
    // and renders this element in case something went wrong
    /*  errorElement: <ErrorBoundary />, */
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
