import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/Login";
import Debit from "./components/Debit";

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
    };
  }
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };
  addToDebitHistory = (debit) => {
    this.state.debitHistory.push(debit);
    this.setState({
      debitBalance: this.state.debitBalance + debit.amount,
      accountBalance: this.state.accountBalance - debit.amount,
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

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debit" render={DebitComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
