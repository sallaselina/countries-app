import { useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Spinner,
  Form,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
// import { LinkContainer } from "react-router-bootstrap";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const favouritesList = useSelector((state) => state.favourites.favourites);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);
  //handle the loading, use col and spinner
  if (isLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        ></Spinner>
        <span className="visually-hidden">Loading...</span>
      </Col>
    );
  }
  //handle the received data case here
  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18 rem", border: "2px solid black" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => dispatch(search(e.target.value))}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countries
          .filter((country) => {
            return country.name.common
              .toLowerCase()
              .includes(searchInput.toLowerCase());
          })
          .map((country) => {
            return (
              <Col className="mt-5" key={country.name.official}>
                <Card className="h-100">
                  <Link
                    to={`/countries/${country.name.common}`}
                    state={{ country: country }}
                  >
                    <Card.Img
                      variant="top"
                      src={country.flags.svg}
                      alt={country.name.common}
                      className="rounded h-50"
                      style={{
                        objectFit: "cover",
                        minHeight: "200px",
                        maxHeight: "200px",
                      }}
                    />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Subtitle className="mb-5 text-muted">
                      {country.name.official}
                    </Card.Subtitle>
                    <ListGroup
                      variant="flush"
                      className="flex-grow-1 justify-content-center"
                    >
                      <ListGroup.Item>
                        <i className="bi bi-people me-2">
                          <label>Population: </label>
                          {country.population.toLocaleString()}
                        </i>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="me-2">
                          <label>Currency: </label>
                          {Object.values(country.currencies || {})
                            .map((currency) => currency.name)
                            .join(", ") || "No currency"}
                        </i>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="me-2">
                          <label>Language(s): </label>
                          {Object.values(country.languages || {}).join(", ") ||
                            "No language"}
                        </i>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="me-2">
                          <label>Continent: </label>
                          {Object.values(country.continents || {})
                            .map((continent) => continent)
                            .join(", ") || "no continent found"}
                        </i>
                      </ListGroup.Item>
                    </ListGroup>
                    <div>
                      {favouritesList.includes(country.name.common) ? (
                        <Button
                          className="m-2 p-2"
                          variant="warning"
                          onClick={() =>
                            dispatch(removeFavourite(country.name.common))
                          }
                        >
                          <RemoveCircleIcon />
                          Remove from Favourites
                        </Button>
                      ) : (
                        <Button
                          className="m-2 p-2"
                          variant="primary"
                          onClick={() =>
                            dispatch(addFavourite(country.name.common))
                          }
                        >
                          <AddIcon />
                          Add to Favourites
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Countries;
