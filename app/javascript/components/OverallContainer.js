import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import CompletedTable from "./CompletedTable";

class OverallContainer extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.turnSwitch = this.turnSwitch.bind(this);
    this.state = { logins: [], isLoggedin: false, user: "", listSwitch: true };
    this.getLogins();
  }

  getLogins() {
    axios
      .get("/api/v2/logins")
      .then((response) => {
        this.setState({ logins: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getLogins();
  }

  login() {
    this.setState({ isLoggedin: true });
  }

  logout() {
    this.setState({ isLoggedin: false });
  }

  verify(username, code) {
    const result = this.state.logins.filter((x) => x.name == username);

    if (result[0] == undefined) {
      return 1;
    } else if (code == result[0].password) {
      return 2;
    } else {
      return 3;
    }
  }

  redirect(username, code) {
    if (this.verify(username, code) == 1) {
      alert("No such username. Please sign up!");
    } else if (this.verify(username, code) == 2) {
      this.setState({ user: username });
      this.setState({ isLoggedin: true });
    } else if (this.verify(username, code) == 3) {
      alert("Wrong password. Please try again!");
    }
  }

  turnSwitch() {
    if (this.state.listSwitch) {
      this.setState({ listSwitch: false });
    } else {
      this.setState({ listSwitch: true });
    }
  }

  render() {
    const check = this.state.isLoggedin;
    let result;
    if (check == false) {
      result = (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand">My App</a>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    Sign up
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div class="container">
            <br />
            <h1>Please sign in</h1>
            <form>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label>Username:</label>
                  <input
                    type="username"
                    className="form-control"
                    id="inputname"
                    placeholder="Username"
                  ></input>
                </div>
                <div className="form-group col-md-3">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputpassword"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
            </form>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() =>
                this.redirect(
                  document.getElementById("inputname").value,
                  document.getElementById("inputpassword").value
                )
              }
            >
              Sign in
            </button>
          </div>
        </>
      );
    } else if (this.state.listSwitch) {
      result = (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand">My App</a>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    role="button"
                    onClick={() => this.turnSwitch()}
                  >
                    Completed Items
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    role="button"
                    onClick={() => this.logout()}
                  >
                    Log Out
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">Edit Account</a>
                </li>
              </ul>
            </div>
          </nav>
          <div class="container">
            <br />
            <Table username={this.state.user} />
          </div>
        </>
      );
    } else if (!this.state.listSwitch) {
      result = (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand">My App</a>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    role="button"
                    onClick={() => this.turnSwitch()}
                  >
                    To-do List
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    role="button"
                    onClick={() => this.logout()}
                  >
                    Log Out
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">Edit Account</a>
                </li>
              </ul>
            </div>
          </nav>
          <div class="container">
            <br />
            <CompletedTable username={this.state.user} />
          </div>
        </>
      );
    }
    return <>{result}</>;
  }
}

export default OverallContainer;
