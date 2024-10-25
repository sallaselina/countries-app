import { Button, Form } from "react-bootstrap";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter both email and password");
    }
    loginWithEmailAndPassword(email, password);
    if (user) {
      navigate("/countries");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center text-center">
      <Form>
        <Form.Group className="mb-3 p-2">
          <h2>Welcome {user?.email}</h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-1 rounded"
          />
        </Form.Group>
        <Form.Group className="p-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-1 rounded"
          />
        </Form.Group>
        <Button onClick={handleLogin} className="m-2">
          Log In
        </Button>
        <Button onClick={() => navigate("/register")} className="m-2">
          Create an account
        </Button>
      </Form>
    </div>
  );
};

export default Login;
