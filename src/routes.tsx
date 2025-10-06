import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages/not-found-page";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import { RoutePath } from "./utils/types/common";
import { Layout } from "./components/layout";
import { DashboardPage } from "./pages/dashboard-page";

export const routes = (
  <Routes>
    <Route element={<Layout />}>
      <Route
        element={
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        }
      >
        <Route
          index={true}
          path={RoutePath.DASHBOARD}
          element={<DashboardPage />}
        />
        <Route
          path={RoutePath.HOME}
          element={<Navigate to={RoutePath.DASHBOARD} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  </Routes>
);
