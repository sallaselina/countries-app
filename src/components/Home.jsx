import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-image">
        <div className="hero-text text-center pt-5">
          <h1>Countries App</h1>
          <h2>Search for countries and add them to favourites!</h2>
          <Button>Get started</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
