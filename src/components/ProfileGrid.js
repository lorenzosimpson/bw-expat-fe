import React from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

const ProfileGrid = (props) => {
  return (
      <Card style={
          {
            width: '250px',
            margin: '10px',
            padding: '20px',
        }
          }>
        <CardImg top width="100%" src={`https://source.unsplash.com/featured/1600x900?${props.city}, city, skyline`} alt="Card image cap" />
        <CardBody>
          <h3>{props.trip_title}</h3>
          <CardText>{props.trip_desc}</CardText>
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardBody>
      </Card>
  )
};

export default ProfileGrid