import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles
}) => {

  const token = localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");

  const user =
    userData ? JSON.parse(userData) : null;

  if (!token) {

    return <Navigate to="/" />;

  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role)
  ) {

    return <Navigate to="/" />;

  }

  return children;

};

export default ProtectedRoute;