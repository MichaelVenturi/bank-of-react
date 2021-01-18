import React from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Debit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      debit: {
        description: "",
        amount: 0,
        date: "",
      },
      // redirect: false,
    };
  }
  handleChange = (event) => {
    const newDebit = { ...this.state.debit };
    const name = event.target.name;
    const value = event.target.value;
    newDebit[name] = value;
    let curDate = new Date();
    curDate = curDate.toISOString().substring(0, 10);
    console.log(curDate);
    newDebit.date = curDate;
    this.setState({
      debit: newDebit,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addToDebitHistory(this.state.debit);
    // this.setState({
    //   redirect: true,
    // });
    this.forceUpdate();
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div>
        <h1>Debits</h1>
        <Link to="/">Home</Link>
        <AccountBalance accountBalance={this.props.accountBalance} />

        <div>
          <form>
            <div>
              <label htmlFor="description">Debit Description: </label>
              <input
                type="text"
                name="description"
                placeholder="Enter debit description"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="amount">Debit Amount: </label>
              <input
                type="text"
                name="amount"
                placeholder="Enter debit amount"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>
        <div>
          <h3>Debit History</h3>
          <ul>
            {this.props.debitHistory.map((debit) => (
              <li key={debit.id}>
                Desciption: {debit.description}, Amount: {debit.amount}, Date:{" "}
                {debit.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Debit;
