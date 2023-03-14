import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AdminNavBar() {
  return (
    <header>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-brand" href="/welcome">Dogtor</Navbar.Brand>
        <Navbar.Collapse className="navbar-collapse" id="basic-navbar-nav">
          <Nav className="me-auto navbar-items">
            <Nav.Link className="navbar-item" href="/admin/pet-profiles">Pet Profiles</Nav.Link>
            <Nav.Link className="navbar-item" href="/admin-schedule">Schedule</Nav.Link>
            <Nav.Link className="navbar-item" href="/admin-settings">Settings</Nav.Link>
            <Nav.Link className="navbar-item" href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
}

export default AdminNavBar;