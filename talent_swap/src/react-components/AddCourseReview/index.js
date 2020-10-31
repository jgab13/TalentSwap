import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../AuthSystem/styles.css';


class AddCourseReview extends React.Component {
  render() {

    const {curDate, stars, description} = this.props;

    return (
      <div className='popup_inner auth-system'>
          <Form>
            <Form.Group controlId="date">
              <Form.Label>Review Date</Form.Label>
              <Form.Control placeholder={curDate} />
            </Form.Group>

            <Form.Group controlId="starRating">
              <Form.Label>Star Rating</Form.Label>
              <Form.Control placeholder={stars} />
            </Form.Group>

            <Form.Group controlId="reviewDesc">
              <Form.Label>Review Description</Form.Label>
              <Form.Control placeholder={description} />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
      </div>
    );
  }
}

export default AddCourseReview;