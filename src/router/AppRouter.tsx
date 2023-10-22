import { Route, Routes } from "react-router-dom";
import { HeroresRoutes } from "../heroes";
import { LoginPage } from "../auth/pages";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <HeroresRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
