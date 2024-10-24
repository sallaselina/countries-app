import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page hero-image">
      <div className="hero-text text-center pt-5">
        <h1>Countries App</h1>
        <h2>Search for countries and add them to favourites!</h2>
        <Button onClick={() => navigate("/countries")}>Get started</Button>
      </div>
    </div>
  );
};

export default Home;
