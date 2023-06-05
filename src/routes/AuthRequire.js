import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//import LoadingScreen from "../components/LoadingScreen";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /*
  if (!isInitialized) {
    return <LoadingScreen />;
  }*/

  return children;
}

export default AuthRequire;
