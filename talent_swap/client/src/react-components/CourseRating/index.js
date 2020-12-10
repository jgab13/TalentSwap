import React from "react";
import "./styles.css";
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
