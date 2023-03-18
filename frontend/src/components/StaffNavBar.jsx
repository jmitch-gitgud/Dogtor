import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AdminNavBar() {
  return (
    <header>
    <Navbar expand="lg">
        <Navbar.Brand className="navbar-brand" href="/staff-welcome">Dogtor</Navbar.Brand>
        <Navbar.Collapse className="navbar-collapse" id="basic-navbar-nav">
          <Nav className="navbar-items-staff">
            <Nav.Link className="navbar-item" href="/admin/pet-profiles">Pet Profiles</Nav.Link>
            <Nav.Link className="navbar-item" href="/admin-schedule">Schedule</Nav.Link>
            <Nav.Link className="navbar-item" href="/admin-settings">Settings</Nav.Link>
            <Nav.Link className="navbar-item" href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </header>
  );
}

export default AdminNavBar;