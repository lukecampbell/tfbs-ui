import { Container, Card } from "react-bootstrap";
import TFBSNav from "../components/TFBSNav";
import LogTerminal from "../components/LogTerminal";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useParams } from "react-router-dom";

function Logs() {
    const { loading } = useAuth();
    const { fileId } = useParams();
    if (loading) return null;
    if (!fileId) {
        console.warn("No fileId");
        return <Navigate to="/dashboard" />;
    }

    return (
        <div>
            <TFBSNav />
            <Container className="mt-4">
                <Card>
                    <Card.Header>Logs</Card.Header>
                    <Card.Body style={{ padding: 0, backgroundColor: "#1e1e1e" }}>
                        <LogTerminal fileId={fileId}/>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Logs;
