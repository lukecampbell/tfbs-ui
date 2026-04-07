import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TFBSNav from "../components/TFBSNav";

interface User {
    login: string,
    roles: string[],
}

function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user', {credentials: "include"});
            if (!res.ok) {
                navigate('/');
                return;
            }

            const data: User = await res.json();
            setUser(data);
            setLoading(false);
        }

        fetchUser();
    }, [navigate]);

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