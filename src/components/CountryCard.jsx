import { Button, Col, Card, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";

const CountryCard = ({ country }) => {
  const dispatch = useDispatch();
  return (
    <div>
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
                  {country.population.toLocaleString()}
                </i>
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="me-2">
                  {Object.values(country.currencies || {})
                    .map((currency) => currency.name)
                    .join(", ") || "no currency"}
                </i>
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="me-2">
                  {Object.values(country.languages || {})
                    .map((language) => language)
                    .join(", ") || "no language"}
                </i>
              </ListGroup.Item>
            </ListGroup>
            <Button
              variant="primary"
              onClick={() => dispatch(addFavourite(country.name.common))}
            >
              Add Favourite
            </Button>
            <Button
              variant="warning"
              onClick={() => dispatch(removeFavourite(country.name.common))}
            >
              Remove Favourite
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default CountryCard;
