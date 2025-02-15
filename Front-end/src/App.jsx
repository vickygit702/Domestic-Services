import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Protected from "./pages/Auth/Protected";
import { HomePage, NotFoundPage, LoginPage, SignupPage } from "./pages/index";

function App() {
  const isAuthChecked = true;
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

  return isAuthChecked ? <RouterProvider router={routes} /> : "";
}

export default App;
