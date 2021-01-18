import React from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <img
          src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png"
          alt="bank"
        />
        <h1>Bank of React</h1>
        <Link to="/userProfile">User Profile</Link>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <Link to="/debit">Debits</Link>
        <br></br>
        <Link to="/credit">Credits</Link>
      </div>
    );
  }
}

export default Home;
