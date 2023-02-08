import { Routes as Switch, Route } from "react-router-dom";
import { Register } from "@/pages/Register";
import { Login } from "@/pages/Login";
import { PublicLayout } from "@/layouts/PublicLayout";

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Switch>
  );
}
