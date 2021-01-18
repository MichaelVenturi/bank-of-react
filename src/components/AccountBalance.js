import React from "react";

class AccountBalance extends React.Component {
  render() {
    return <div>Balance: {this.props.accountBalance.toFixed(2)}</div>;
  }
}

export default AccountBalance;
