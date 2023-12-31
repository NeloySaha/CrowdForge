import { useState } from "react";
import { Registration } from "./components/Registration";
import { Login } from "./components/Login";

export const AuthPage = (props) => {
  const [authState, setAuthState] = useState(false);
  const currentStyle = (cond) => ({
    borderBottom: cond ? "3px solid #1a76f5" : "",
  });

  return (
    <section className="section-auth">
      <div className="auth-container">
        <div className="auth-heading">
          <h1>Welcome to CrowdForge</h1>
        </div>

        <div className="auth">
          <ul className="auth-nav">
            <li>
              <button
                className="auth-nav-btn"
                onClick={() => setAuthState(true)}
                style={currentStyle(authState)}
              >
                Create an Account
              </button>
            </li>
            <li>
              <button
                className="auth-nav-btn"
                onClick={() => setAuthState(false)}
                style={currentStyle(!authState)}
              >
                Sign in
              </button>
            </li>
          </ul>

          <div className="form-container">
            {authState ? <Registration {...props} /> : <Login {...props} />}
          </div>
        </div>
      </div>
    </section>
  );
};
