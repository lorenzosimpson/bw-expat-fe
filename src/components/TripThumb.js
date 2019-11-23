// import React from 'react';

// const TripThumb = props => {

//     return (
//         <div className='trip-thumbnail'>
//             <h4>{props.trip_title}</h4>
//             <p>{props.trip_desc}</p>
//             <p>{props.city}</p>
//             <p>{props.country}</p>
//         </div>
//     )
// }

// export default TripThumb;

import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const TripThumb = (props) => {
  return (
    <div>
      <Card className='trip-thumbnail'>
        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.trip_title}</CardTitle>
          <CardSubtitle>{`${props.city}, ${props.country}`}</CardSubtitle>
            <CardText>{props.trip_desc}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default TripThumb;
