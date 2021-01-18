import React from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Credit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credit: {
        description: "",
        amount: 0,
        date: "",
      },
      // redirect: false,
    };
  }
  handleChange = (event) => {
    const newCredit = { ...this.state.credit };
    const name = event.target.name;
    const value = event.target.value;
    newCredit[name] = value;
    let curDate = new Date();
    curDate = curDate.toISOString();
    console.log(curDate);
    newCredit.date = curDate;
    this.setState({
      credit: newCredit,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addToCreditHistory(this.state.credit);
    // this.setState({
    //   redirect: true,
    // });
    this.forceUpdate();
  };
  render() {
    return (
      <div>
        <h1>Credits</h1>
        <Link to="/">Home</Link>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <div>
          <form>
            <div>
              <label htmlFor="description">Credit Description: </label>
              <input
                type="text"
                name="description"
                placeholder="Enter credit description"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="amount">Credit Amount: </label>
              <input
                type="text"
                name="amount"
                placeholder="Enter credit amount"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>
        <div>
          <h3>Credit History</h3>
          <ul>
            {this.props.creditHistory.map((credit) => (
              <li key={credit.id}>
                Desciption: {credit.description}, Amount: {credit.amount}, Date:{" "}
                {credit.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Credit;
