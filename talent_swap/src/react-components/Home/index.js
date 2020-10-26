import React from "react";
import Header from "./../Header";
import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {
  render() {
    return (
      <div>
        {/* Header component(navbar). need login state check */}
        <Header/>
      {/* Website descriptions */}
      This is Home page.
      {/* Popular courses */}
      </div>
    );
  }
}

export default Home;