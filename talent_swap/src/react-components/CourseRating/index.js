import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import { uid } from "react-uid";
// <li className="rating"><span id="color">{rating}</span> out of 5 ratings</li>
import StarRatings from 'react-star-ratings';


class CourseRating extends React.Component {
  render() {
  	const {rating, instructor, instructImg} = this.props;
    return (
          <div className="rating">
            <StarRatings
            rating={rating}
            starRatedColor="orange"
            numberOfStars={5}
            name='rating'
            starDimension='20px'/>
          </div>
    );
  }
}

export default CourseRating;
