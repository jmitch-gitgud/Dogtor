import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from "react-router-dom";

function AdminNavBar() {
  const { userId} = useParams();
  return (
    <header>
    <Navbar expand="lg">
        <Navbar.Brand className="navbar-brand" href={`/admin/${userId}`}>Dogtor</Navbar.Brand>
        <Navbar.Collapse className="navbar-collapse" id="basic-navbar-nav">
          <Nav className="navbar-items-admin">
            <Nav.Link className="navbar-item" href="/admin-schedule">Schedule Appointment</Nav.Link>
            <Nav.Link className="navbar-item" href="/admin-view-users">View Users/Pets/Appointmnets</Nav.Link>
            <Nav.Link className="navbar-item" href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </header>
  );
}

export default AdminNavBar;