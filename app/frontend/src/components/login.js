import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
//Firebase
import app from "../base";
import { AuthContext } from "../Auth.js";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      <h3>
        Dont have an account?
        <Link to="/signup"> Click Here </Link>
      </h3>
    </div>
  );
};

export default withRouter(Login);
