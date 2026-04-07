import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TFBSNav() {
    const navigate = useNavigate();

    const onHandleLogout = async () => {
        await fetch("/api/logout", {credentials: "include"});
        navigate("/");
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home"><i className="bi bi-house me-2" />TFBS</Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link onClick={onHandleLogout}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )

}

export default TFBSNav;