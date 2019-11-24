import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';

const Home = (props) => {
  return (
    <div>
      <Jumbotron id='jumbo' fluid>
        <Container id='container' fluid>
          <h1 className="display-3">Share your stories</h1>
          <p className="lead">From all over the world.</p>
          <Button outline color="secondary" size="lg">Get Started</Button>
        </Container>
       
      </Jumbotron>
     
    </div>
  );
};

export default Home;
