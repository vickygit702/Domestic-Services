import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Protected from "./pages/Auth/Protected";
import {
  HomePage,
  NotFoundPage,
  LoginPage,
  SignupPage,
  AdminHomePage,
} from "./pages/index";

function App() {
  // const loggedInUser=useSelector(selectLoggedInUser)

  // useAuthCheck();
  // useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/admin"
          element={
            <Protected>
              <AdminHomePage />
            </Protected>
          }
        />
        <Route
          path="/"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
      </>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
