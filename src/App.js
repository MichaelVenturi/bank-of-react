import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/Login";
import Debit from "./components/Debit";
import Credit from "./components/Credit";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99",
      },
      debitHistory: [],
      debitBalance: 0,
      creditHistory: [],
      creditBalance: 0,
    };
  }

  getDebitResults = async () => {
    try {
      let response = await fetch("https://moj-api.herokuapp.com/debits");
      if (!response.ok) {
        throw new Error("error");
      }
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };
  getCreditResults = async () => {
    try {
      let response = await fetch("https://moj-api.herokuapp.com/credits");
      if (!response.ok) {
        throw new Error("error");
      }
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  componentDidMount = async () => {
    let debits = await this.getDebitResults();
    let credits = await this.getCreditResults();
    this.setState({
      debitHistory: debits,
      creditHistory: credits,
    });
    let debitBalance = 0;
    let creditBalance = 0;
    for (let debit of debits) {
      debitBalance += debit.amount;
    }
    for (let credit of credits) {
      creditBalance += credit.amount;
    }
    let accountBalance = creditBalance - debitBalance;
    this.setState({
      debitBalance: debitBalance,
      creditBalance: creditBalance,
      accountBalance: accountBalance,
    });
  };

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };
  addToDebitHistory = (debit) => {
    this.state.debitHistory.push(debit);
    this.setState({
      debitBalance: this.state.debitBalance + parseFloat(debit.amount),
      accountBalance: this.state.accountBalance - parseFloat(debit.amount),
    });
  };
  addToCreditHistory = (credit) => {
    this.state.creditHistory.push(credit);
    this.setState({
      creditBalance: this.state.creditBalance + parseFloat(credit.amount),
      accountBalance: this.state.accountBalance + parseFloat(credit.amount),
    });
  };

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );
    const DebitComponent = () => (
      <Debit
        accountBalance={this.state.accountBalance}
        debitHistory={this.state.debitHistory}
        addToDebitHistory={this.addToDebitHistory}
      />
    );
    const CreditComponent = () => (
      <Credit
        accountBalance={this.state.accountBalance}
        creditHistory={this.state.creditHistory}
        addToCreditHistory={this.addToCreditHistory}
      />
    );

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debit" render={DebitComponent} />
          <Route exact path="/credit" render={CreditComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
