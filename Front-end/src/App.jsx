import React from "react";

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
  TechnicianDashboard,
  TechnicianMyJobs,
  Payment,
  TechnicianProfile,
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
        >
          <Route index element={<TechnicianDashboard />} />
          <Route path="dashboard" element={<TechnicianDashboard />} />
          <Route path="my-jobs" element={<TechnicianMyJobs />} />
          <Route path="payments" element={<Payment />} />
          <Route path="profile" element={<TechnicianProfile />} />
        </Route>

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
          <Route path="dashboard/:categoryName" element={<ServiceDetails />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
