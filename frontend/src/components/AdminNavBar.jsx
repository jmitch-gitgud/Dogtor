import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AdminNavBar() {
  return (
    <header>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Dogtor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin/pet-profiles">Pet Profiles</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/admin-schedule">Schedule</Nav.Link>
            <Nav.Link href="/admin-settings">Settings</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
}

export default AdminNavBar;