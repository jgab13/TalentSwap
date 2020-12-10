import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../AuthSystem/styles.css';



class AddCourseReview extends React.Component {
  state = {
    rating: this.props.stars,
    desc: this.props.description
  }


  handleInput = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  validForm = (event) => {
    this.placeholderChecker();
    if (this.state.rating < 0 || this.state.rating > 5) {
      event.preventDefault();
      alert('The rating must be between 0 and 5 stars.');
    } else if (this.state.date === "" || this.state.desc === ""){
      event.preventDefault();
      alert('Please enter a valid description.');
    } 
  }

  render() {

    const {stars, description, addReview, cancelForm} = this.props;

    return (
      <div className='popup_inner auth-system'>
          <Form>
            <Form.Group controlId="starRating">
              <Form.Label>Star Rating</Form.Label>
              <Form.Control name="rating" onChange={this.handleInput} value={this.state.rating} placeholder={stars} />
            </Form.Group>

            <Form.Group controlId="reviewDesc">
              <Form.Label>Review Description</Form.Label>
              <Form.Control name="desc" onChange={this.handleInput} value={this.state.desc} placeholder={description} />
            </Form.Group>

            <Button onClick={(e) => addReview(this.state.rating, this.state.desc)} variant="success">
              Submit
            </Button>
            <Button className="float-right" onClick={cancelForm} variant="success">Cancel</Button>    
            
          </Form>
      </div>
    );
  }
}

export default AddCourseReview;