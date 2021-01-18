import React from "react";
import PropTypes from "prop-types";

class AccountBalance extends React.Component {
  render() {
    return <div>Balance: {this.props.accountBalance.toFixed(2)}</div>;
  }
}

export default AccountBalance;

AccountBalance.propTypes = {
  accountBalance: PropTypes.number,
};
