import { AuthData } from "@/api/types/user";
import { Navigate, Outlet } from "react-router-dom";

const AuthedRoute = ({ user }: { user: AuthData | undefined }) => {
  return user ? <Outlet /> : <Navigate to='/admin/auth/login' />;
};

export default AuthedRoute;
