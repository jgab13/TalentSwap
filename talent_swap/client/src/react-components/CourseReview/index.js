import React from "react";
import StarRatings from 'react-star-ratings';
import "./styles.css";
import Button from "react-bootstrap/Button";
import instImg from "./../DetailedCoursePage/logo192.png";



class CourseReview extends React.Component {
  render() {
  	const {review, edit, compl, sign, user, editLink, deleteLink} = this.props;

    const revisedDate = new Date(review.date)
    const reviewButton = (!sign ? null :
      (!compl ? null:
        edit && review.user===user ? (<div className="starRating"><Button variant="outline-success" name={review.description} onClick={editLink}> Edit</Button><Button onClick={deleteLink} className="modify" name={review.description} variant="outline-success"> Delete </Button></div>)  :
        null));

    return (
        <div className="reviewContainer">
          <div className="userContainer">  
            <img className="userImg" src={instImg}/>
            <span className="element">{review.user}</span>
            <span className="element">{revisedDate.toLocaleString("en-US")}</span>

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
