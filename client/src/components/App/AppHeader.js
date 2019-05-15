import React, { Component } from "react";
import logo from "../../logo.svg";

class AppHeader extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-intro">Customer List</h1>
          <p>
            <a
              className="social-link"
              href="https://github.com/AbiralRai"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default AppHeader;
