import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import problemSets from './ProblemSet.json';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../CSS/ProblemSolving.css'

function ProblemSolving() {
  const { uid } = useParams();
  const [problemSet, setProblemSets] = useState([]);

  useEffect(() => {
    // Fetch the problem sets from your JSON file
    setProblemSets(Object.keys(problemSets));
    // fetch('./ProblemSet.json')
    //   .then((response) => response.json())
    //   .then((data) => setProblemSets(Object.keys(data)));
  }, []);

  return (
    <>
      <Header uid={uid} />
      <Container>
      <Row xs={1} md={3}>
          {problemSet.map((set, index) => (
            <Col key={index}>
              <Card style={{borderColor: "black", borderWidth: "2px", backgroundColor: "#f8f9fa"}} className='mb-4'>
                <Card.Body>
                  <Link className="link" to={`/${uid}/problems/${set}`}>
                    <Card.Title style={{color: "#1F0954"}}>{set}</Card.Title>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ProblemSolving;
