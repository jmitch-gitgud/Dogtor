import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AdminNavBar() {
  return (
    <header>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand  href="/admin">Dogtor</Navbar.Brand>
        <Navbar.Collapse  id="basic-navbar-nav">
          <Nav>
            <Nav.Link className="navbar-item" href="/admin-schedule">Schedule Appointments</Nav.Link>
            <Nav.Link className="navbar-item" href="/admin-view-users">View Users/Pets/Appointmnets</Nav.Link>
            <Nav.Link className="navbar-item" href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
}

export default AdminNavBar;