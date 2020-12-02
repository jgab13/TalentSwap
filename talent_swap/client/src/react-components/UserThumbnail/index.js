import React from "react";
import "./styles.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


function UserThumbnail(props){
// class UserThumbnail extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    // render(){
        // const user = this.props.user;
        const user = props.user;
        return(
                // <div>
                <Card id="card">
                    <Card.Img id="userPic" variant="top" src= {user.pic} />
                    <Card.Body id="body">
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Subtitle>{user.bio}</Card.Subtitle>
                        <Card.Text>
                            <span id="doeHeader"> Teaching</span><br></br>
                            <span id="doeContents">{user.expertise}</span><br></br>
                            <span id="doeHeader"> Learning</span><br></br>
                            <span id="doeContents">{user.development}</span>
                        </Card.Text>
                        <Button variant="success" className="userButton" href={`/UserProfile/${user.username}`} >
                            view complete profile
                        </Button>
                    </Card.Body>
                </Card>
                
                // </div>
        );
    }
// }


export default UserThumbnail;