import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "..";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const lastPath = localStorage.getItem("lastPath") || "/";
  const navigate = useNavigate();
  const onLogin = () => {
    login("Eduardo");
    navigate(lastPath, { replace: true });
  };
  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <button className="btn btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};
