import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { PrivateLayout } from "@/layouts/PrivateLayout";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFound";

const routesPublic = [
  {
    path: "/login",
    element: lazy(() => import("@/pages/Login")),
  },
  {
    path: "/register",
    element: lazy(() => import("@/pages/Register")),
  },
];

const routesPrivate = [
  {
    path: "/",
    element: lazy(() => import("@/pages/Dashboard")),
    isIndex: true,
  },
  {
    path: "/products",
    element: lazy(() => import("@/pages/Products")),
    isIndex: false,
  },
  {
    path: "/products/:id",
    element: lazy(() => import("@/pages/Products/View")),
    isIndex: false,
  },
];

export function Routes() {
  const isAuthenticated = localStorage.getItem("@matera-dashboard:user-token");

  return (
    <Switch>
      <Route
        path="*"
        element={
          <Suspense fallback={"Carregando..."}>
            <NotFoundPage />
          </Suspense>
        }
      />
      {isAuthenticated ? (
        <Route path="/" element={<PrivateLayout />}>
          {routesPrivate.map((route, index) => {
            if (route.isIndex) {
              return (
                <Route
                  key={index}
                  index
                  element={
                    <Suspense fallback={"Carregando..."}>
                      <route.element />
                    </Suspense>
                  }
                />
              );
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={"Carregando..."}>
                    <route.element />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      ) : (
        <Route element={<Navigate to="/login" />} index />
      )}
      {routesPublic.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            !!isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={"Carregando..."}>
                <route.element />
              </Suspense>
            )
          }
        />
      ))}
    </Switch>
  );
}
