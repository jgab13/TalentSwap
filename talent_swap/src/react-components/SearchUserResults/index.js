import React from "react"
import CardDeck from "react-bootstrap/CardDeck"
import UserThumbnail from "./../UserThumbnail"
// import "./styles.css"



class UserResults extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         users : props.users
    //     }
    // }
    render(){
        const users = this.props.users;

        return(
            <CardDeck>
                {users.map((user) => 
                    <UserThumbnail key={user.id.toString()}
                        user = {user} />
                )}
            </CardDeck>
        );
    }
}

export default UserResults;