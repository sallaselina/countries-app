import { Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Layout = () => {
  const [user] = useAuthState(auth);
  return (
    <Container fluid>
      <Row>
        <Navbar expand="lg" bg="info" variant="light" className="p-2">
          <Navbar.Brand href="/">
            <h1>Countries App</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/countries">
                <Nav.Link>Countries</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/favourites">
                <Nav.Link>Favourites</Nav.Link>
              </LinkContainer>
              {!user && (
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              )}

              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}

              {user && <Button onClick={logout}>Logout</Button>}

              <span
                className="greeting rounded"
                style={{
                  color: "white",
                  border: "2px solid white",
                }}
              >
                {user && ` ${user?.email}`}
              </span>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
