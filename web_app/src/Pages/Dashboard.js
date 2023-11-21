import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const navigateToForm = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <Container className="mt-5">
          <Row style={{ fontFamily: 'Mulish, sans-serif' }}>
            {['Address', 'Person', 'Dwelling', 'Feedback'].map((section) => (
              <Col md={6} lg={3} className="mb-5" key={section}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{  fontWeight: 'bold' }}>{section} Section</Card.Title>
                    <Card.Text >
                    Click on the button to start filling out the {section.toLowerCase()} form.
                    </Card.Text>
                    <button className="round-button mb-3" type="submit" onClick={() => navigateToForm(`/${section.toLowerCase()}`)}> Go to form </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
