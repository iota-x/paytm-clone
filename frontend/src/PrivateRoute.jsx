import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null || token === "null") {
      // Redirecting to sign-in page if token is null
      navigate("/signin");
    }
  }, []);

  return <Outlet />;
}

