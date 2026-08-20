import { Navigate, useLocation } from "react-router-dom";
import FullPageLoader from "./FullPageLoader";
import { useUser } from "../features/authentication/useUser";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return <FullPageLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
