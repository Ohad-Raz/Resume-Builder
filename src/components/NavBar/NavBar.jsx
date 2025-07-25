import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUser } from "../Context/UserContext";
import styles from "./NavBar.module.css"; // Import CSS module

function NavBar() {
  const auth = getAuth();
  const { user, setUser } = useUser(); // Use the user state and setUser from the context
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Additional logic after signing out
      setUser(null); // Update the user state after signing out
      navigate('/authentications');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" className={`${styles.navBar} fixed-top`}>
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Home page
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/resume-builder">
              Resume Builder
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/my-resumes">
                  My Resumes
                </Nav.Link>
                <button onClick={handleSignOut} className={`signOutBtn ${styles.SignOutBtn}`}>
                  Sign Out
                </button>
              </>
            ) : (
              <Nav.Link as={Link} to="/authentications">
                Authentications
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
