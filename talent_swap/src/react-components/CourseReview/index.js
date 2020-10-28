import React from "react";
import { Link } from "react-router-dom";
// import { uid } from "react-uid";
import StarRatings from 'react-star-ratings';
import "./styles.css";


class CourseReview extends React.Component {
  render() {
  	const {review} = this.props;


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
        </div>
      </>

    );
  }
}

export default CourseReview;
