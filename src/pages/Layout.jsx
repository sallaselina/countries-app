import { Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";

const Layout = () => {
  const [user] = useAuthState(auth);
  return (
    <Container fluid>
      <Row>
        <Navbar sticky="top" bg="info" variant="light">
          <Container className="d-flex">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="d-flex justify-content-end">
                <Nav>
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
                  <div className="greeting p-2">
                    {user && `Hello and welcome ${user?.email}`}
                  </div>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default Layout;
