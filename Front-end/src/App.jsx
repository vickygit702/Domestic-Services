import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  UserHomePage,
  UserLoginPage,
  UserSignupPage,
  UserProtected,
  TechnicianHomePage,
  TechnicianLogin,
  TechnicianProtected,
  TechnicianSignup,
  NotFoundPage,
  Welcome,
} from "./pages/index";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome />} />
        <Route path="/my-project/user/signup" element={<UserSignupPage />} />
        <Route path="/my-project/user/login" element={<UserLoginPage />} />

        <Route
          path="/my-project/technician/signup"
          element={<TechnicianSignup />}
        />
        <Route
          path="/my-project/technician/login"
          element={<TechnicianLogin />}
        />

        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/my-project/technician/:id"
          element={
            <TechnicianProtected>
              <TechnicianHomePage />
            </TechnicianProtected>
          }
        />
        <Route
          path="/my-project/user/:id"
          element={
            <UserProtected>
              <UserHomePage />
            </UserProtected>
          }
        />
      </>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
