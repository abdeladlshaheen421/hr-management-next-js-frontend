import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/userContext";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  if (!user) navigate("/login");
  return children;
}
