import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { Card } from "react-bootstrap";
import TFBSNav from "../components/TFBSNav";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
    const [showWelcome, setShowWelcome] = useState(true);
    const { user, loading } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <Container className="min-vh-100 d-flex align-itmes-center justify-content-center">
                <Spinner animation="border" />
            </Container>
        )
    }
    
    return (
        <div>
            <TFBSNav />
            <Container className="mt-4">
                <Alert variant="success" show={showWelcome} transition>
                    Welcome {user!.login}
                </Alert>
                <Card>
                    <Card.Body>
                        <Card.Title>Dashboard</Card.Title>
                        <Card.Text className="text-muted">
                            Dashboard goes here
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Dashboard;