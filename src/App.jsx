import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import Countries from "./components/Countries";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import CountrySingle from "./components/CountrySingle";
import Register from "./components/Register";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            {/* this is where other routes will go to allow layout to be visible */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/countries" element={<Countries />} />
              <Route path="/countries/:single" element={<CountrySingle />} />
              <Route path="/favourites" element={<Favourites />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
