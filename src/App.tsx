import { useState, type FormEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setError('')
    setSuccess(false);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({login, password})
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      setError('Invalid login or password.');
    }
  }

  return (
    <Container
      className="min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">TFBS Login</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Login successful!</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="login">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App
