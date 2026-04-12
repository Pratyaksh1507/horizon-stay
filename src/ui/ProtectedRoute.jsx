import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return <Spinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
