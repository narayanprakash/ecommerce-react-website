import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp, user, login, logout } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    let result;
    setError(null);
    if (mode === "login") {
      result = login(data.email, data.password);
      return;
    }
    else {
      result = signUp(data.email, data.password);
    }
    if (result.error) {
      setError(result.error);
    }
    else {

      navigate("/");
    }
    console.log(result);
  }
  return (
    <div className="page" >
      <div className="container">
        <div className="auth-container">
          <button className="btn btn-secondary" onClick={logout}>Logout</button>
          {user && <div>Welcome, {user.email}!</div>}
          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email:</label>
              <input type="email" id="email" className="form-input" placeholder="Enter your email"
                {...register("email", { required: true })} />
              {errors.email && <span className="form-error">Invalid Email</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password:</label>
              <input type="password" id="password" className="form-input" placeholder="Enter your password" {...register("password", { required: true, minLength: 6, maxLength: 28 })} />
              {errors.password && <span className="form-error">Password must be between 6 and 28 characters</span>}
            </div>
            <button type="submit" className="btn btn-primary">{mode === "signup" ? "Sign Up" : "Login"}</button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p>Don't have an account?
                <span className="auth-link" onClick={() => setMode("login")}>Sign Up</span>
              </p>
            ) : (
              <p>Already have an account?
                <span className="auth-link" onClick={() => setMode("signup")}>Login</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}