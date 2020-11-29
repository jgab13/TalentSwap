import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../AuthSystem/styles.css';



class AddCourseReview extends React.Component {
  //Add a cancel button
  // state = {
  //   date: "",
  //   rating: "",
  //   desc: ""
  // }
  state = {
    date: this.props.curDate,
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
      console.log(this.state)
      alert('The rating must be between 0 and 5 stars.');
    } else if (this.state.date === "" || this.state.desc === ""){
      event.preventDefault();
      console.log(this.state)
      alert('Please enter a valid description or date.');
    } 
    console.log(this.state);

  }

  // placeholderChecker = () =>{
  //   console.log(this.props)
  //   if (this.props.curDate !== "" && this.props.description !== "" && this.props.stars < 6 && this.props.stars > -1){
  //     this.setState({
  //       date: this.props.curDate,
  //       rating: this.props.stars,
  //       desc: this.props.description
  //     })
  //   }
  // }

  render() {

    const {curDate, stars, description, addReview, cancelForm} = this.props;

    return (
      <div className='popup_inner auth-system'>
          <Form>
            <Form.Group controlId="date">
              <Form.Label>Review Date</Form.Label>
              <Form.Control name="date" onChange={this.handleInput} value={this.state.date} placeholder={curDate} />
            </Form.Group>

            <Form.Group controlId="starRating">
              <Form.Label>Star Rating</Form.Label>
              <Form.Control name="rating" onChange={this.handleInput} value={this.state.rating} placeholder={stars} />
            </Form.Group>

            <Form.Group controlId="reviewDesc">
              <Form.Label>Review Description</Form.Label>
              <Form.Control name="desc" onChange={this.handleInput} value={this.state.desc} placeholder={description} />
            </Form.Group>

            <Button onClick={(e) => addReview(this.state.date, this.state.rating, this.state.desc)} variant="success">
              Submit
            </Button>
            <Button className="float-right" onClick={cancelForm} variant="success">Cancel</Button>    
            
          </Form>
      </div>
    );
  }
}

export default AddCourseReview;