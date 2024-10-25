import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouritesSlice";
import CountryCard from "./CountryCard";

const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    countriesList = countriesList.filter((country) =>
      favouritesList.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (countriesLoading || favouritesLoading) {
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

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem", border: "2px solid black" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          {favouritesList.length > 0 && (
            <Button
              onClick={() => dispatch(clearFavourites())}
              variant="danger"
            >
              Clear Favourites
            </Button>
          )}
        </Col>
      </Row>
      <Row className="pt-3">
        {favouritesList.length === 0 && (
          <h2 className="me-2 text-center">No favourite countries added</h2>
        )}
      </Row>

      <Row xs={2} md={3} lg={4} className="g-3">
        {countriesList
          .filter((country) => {
            return country.name.official
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </Row>
    </Container>
  );
};

export default Favourites;
