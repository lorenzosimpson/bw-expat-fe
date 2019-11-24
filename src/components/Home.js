import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Home = (props) => {
  return (
    <div>
      <Jumbotron id='jumbo' fluid>
        <Container id='container' fluid>
          <h1 className="display-3">Share your stories</h1>
          <p className="lead">From all over the world.</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;
