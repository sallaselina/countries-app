import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // below handles the auth state from firebase
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name) {
      alert("name is required");
    }
    registerWithEmailAndPassword(name, email, password);
  };
  //TODO: add check to see if user is logged in navigate to countries if logged in
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default Register;
