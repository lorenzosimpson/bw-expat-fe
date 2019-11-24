import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const TripThumb = (props) => {
  return (
    <div>
      <Card className='trip-thumbnail'>
        <CardImg top width="100%" src={`https://source.unsplash.com/featured/1600x900?${props.city}, city, skyline`} alt="Card image cap" />
        <CardBody>
          <h1>{props.trip_title}</h1>
          <h4>{`${props.city}, ${props.country}`}</h4>
            <CardText>{props.trip_desc}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default TripThumb;
