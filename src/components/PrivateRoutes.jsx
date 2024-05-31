import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";

const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  } else if (!user || error) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
    //  the Outlet component renders the corresponding child route's component within the parent route's layout.
  }
};

export default PrivateRoutes;