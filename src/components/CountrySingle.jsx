import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CountrySingle = (props) => {
  const location = useLocation();
  const country = props.country || location.state.country;
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      )
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        setWeather(response.data);
        setIsWeatherLoading(false);
      });
  }, [country.capital]);

  if (isWeatherLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  // weather data here, temp, description and icon

  return (
    <Container fluid>
      <h1 className="text-center">Weather</h1>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Image
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
        </Col>
        <Col>
          <div className="bg-info p-2 m-2 rounded">
            <h2>{country.name.common}</h2>
            <h3> {country.capital}</h3>

            <div>
              <p>{weather.weather[0].description}</p>
              <p>Temperature: {weather.main.temp} degrees</p>
            </div>
            <Button onClick={() => navigate("/countries")}>
              Back to Countries
            </Button>
          </div>
        </Col>
        <Col>{/* <Image src={country.flags.svg} /> */}</Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
