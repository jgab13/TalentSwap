import React from "react";
import { Link } from "react-router-dom";
// import { uid } from "react-uid";
import StarRatings from 'react-star-ratings';
import "./styles.css";
import Button from "react-bootstrap/Button";


class CourseReview extends React.Component {
  render() {
  	const {review, edit, compl, sign} = this.props;

    const reviewButton = (!sign ? null :
      (!compl ? null:
        edit ? <Button className="starRating" variant="outline-success"> Edit</Button> :
      <Button className="starRating" variant="outline-success"> Delete </Button>));
    return (
      <>
        <div >
          <ul>
            <li>   
              <img className="userImg" src={review.img}/>
              <span>{review.user}</span>
            </li>
            <li>
              <span>12/10/2019</span>
            </li>
          </ul>
          <p className="starRating">
              <StarRatings
              rating={review.rating}
              starRatedColor="orange"
              numberOfStars={5}
              name='rating'
              starDimension='20px'/>
          </p>
          <p className="starRating">
            {review.description}
          </p>
          <p className="StarRating">
            {reviewButton}
          </p>
        </div>
      </>

    );
  }
}

export default CourseReview;
