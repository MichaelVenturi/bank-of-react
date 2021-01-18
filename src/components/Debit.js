import React from "react";
import AccountBalance from "./AccountBalance";

class Debit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      debit: {
        description: "",
        amount: 0,
        date: "",
      },
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
    // let curDate = new Date();

    // curDate = curDate.toISOString().substring(0, 10);

    // const newDebit = { ...this.state.debit };
    // newDebit.date = curDate;
    // console.log(newDebit.date);
    // this.setState({
    //   debit: {
    //     date: curDate,
    //   },
    // });
    // console.log(this.state.debit.date);
    this.forceUpdate();
    this.state.history.push(this.state.debit);
  };

  render() {
    return (
      <div>
        <h1>Debits</h1>
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
          <ul>
            {this.state.history.map((debit) => (
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
