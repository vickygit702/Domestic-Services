import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  UserDashboard,
  UserLoginPage,
  UserSignupPage,
  UserProtected,
  TechnicianHomePage,
  TechnicianLogin,
  TechnicianProtected,
  TechnicianSignup,
  NotFoundPage,
  Welcome,
  Dashboard,
  MyBookings,
  Profile,
  ServiceDetails,
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
        {/* <Route
          path="/my-project/user/:id"
          element={
            <UserProtected>
              <UserHomePage />
            </UserProtected>
          }
        /> */}
        {/* <Route
          path="/my-project/user/:id/dashboard"
          element={
            <UserProtected>
              <Dashboard />
            </UserProtected>
          }
        />
        <Route
          path="/my-project/user/:id/my-bookings"
          element={
            <UserProtected>
              <MyBookings />
            </UserProtected>
          }
        />
        <Route
          path="/my-project/user/:id/profile"
          element={
            <UserProtected>
              <Profile />
            </UserProtected>
          }
        /> */}

        <Route
          path="/my-project/user/:id"
          element={
            <UserProtected>
              <UserDashboard />
            </UserProtected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:serviceName" element={<ServiceDetails />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
