import { AuthData } from "@/api/types/user";
import { Navigate, Outlet } from "react-router-dom";

const UnAuthedRoute = ({ user }: { user: AuthData | undefined }) => {
  return !user ? <Outlet /> : <Navigate to='/admin' />;
};

export default UnAuthedRoute;
