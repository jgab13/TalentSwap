import React from "react";
import { Link } from "react-router-dom";
// import { uid } from "react-uid";
import StarRatings from 'react-star-ratings';
import "./styles.css";
import Button from "react-bootstrap/Button";


class CourseReview extends React.Component {
  render() {
  	const {review, edit, compl, sign, user, editLink, deleteLink} = this.props;

    const username = user !== null ? user._id: null

    const reviewButton = (!sign ? null :
      (!compl ? null:
        edit && review.user===username ? (<div className="starRating"><Button variant="outline-success" name={review.description} onClick={editLink}> Edit</Button><Button onClick={deleteLink} className="modify" name={review.description} variant="outline-success"> Delete </Button></div>)  :
        null));
      console.log(sign)
      console.log(compl)
      console.log(edit)
      console.log(review.user === user)
      console.log(reviewButton);
    return (
        <div className="reviewContainer">
          <div className="userContainer">  
            <img className="userImg" src={review.img}/>
            <span className="element">{review.user}</span>
            <span className="element">{review.date}</span>

            <p className="starRating">
              <StarRatings
              rating={review.rating}
              starRatedColor="orange"
              numberOfStars={5}
              name='rating'
              starDimension='20px'/>
            </p>
          </div>
          <div className="descContainer">
            <p className="starRating">
              {review.description}
            </p>
            <p className="StarRating">
              {reviewButton}
            </p>
          </div>
        </div>
    );
  }
}

export default CourseReview;
