import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { PrivateLayout } from "@/layouts/PrivateLayout";
import { lazy, Suspense } from "react";

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
  const isAuthenticated = true;

  return (
    <Switch>
      {/* TODO - Colocar uma tela de 404 Page not found */}
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
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
