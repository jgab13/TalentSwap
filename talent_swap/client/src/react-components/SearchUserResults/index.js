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
        if (!users) return <p> No matched users.</p>
        return(
            <div className="row row-cols-1 row-cols-md-3">
                {users.map((user) => 
                    <UserThumbnail key={user.username.toString()}
                        user = {user} />
                )}
            </div>
        );
    }
}

export default UserResults;