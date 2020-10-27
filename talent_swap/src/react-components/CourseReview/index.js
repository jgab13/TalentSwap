import React from "react";
import { Link } from "react-router-dom";
// import { uid } from "react-uid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class CourseReview extends React.Component {
  render() {
  	const {review} = this.props;
    return (
      <div>
        <Row>
          <Col>
            <ul>
              <li className="instruct">   
                <img className="instructImage"src={review.img}/><br/>
                <span className="user">{review.user}</span>
              </li>
              <li className="rating">
                <span>12/10/2019</span>
              </li>
              <li className="instruct"><p>{review.description}</p>
              </li>
            </ul>
          </Col>
        </Row>
      </div>

    );
  }
}

export default CourseReview;
