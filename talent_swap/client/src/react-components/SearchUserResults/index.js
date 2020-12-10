import React from "react"
import UserThumbnail from "./../UserThumbnail"

class UserResults extends React.Component {
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