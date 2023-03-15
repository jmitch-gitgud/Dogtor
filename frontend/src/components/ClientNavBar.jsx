import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from "react-router-dom";

function AdminNavBar() {
  const { userId} = useParams();

  return (
    <header>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-brand" href={`/user/${userId}`}>Dogtor</Navbar.Brand>
        <Navbar.Collapse className="navbar-collapse" id="basic-navbar-nav">
          <Nav>
            <Nav.Link className="navbar-item" href={`/user-select-type/${userId}`}>Book Appointment</Nav.Link>
            <Nav.Link className="navbar-item" href={`/view-user-schedule/${userId}`}>View Appointments</Nav.Link>
            <Nav.Link className="navbar-item" href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
}

export default AdminNavBar;