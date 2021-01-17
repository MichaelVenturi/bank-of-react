import React from "react";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <h1>User Profile</h1>
        <Link to="/">Home page</Link>
        <div>Username: {this.props.userName}</div>
        <div>Member Since: {this.props.memberSince}</div>
      </div>
    );
  }
}

export default UserProfile;
