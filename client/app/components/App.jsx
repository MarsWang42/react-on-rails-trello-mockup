import React, { Component } from 'react';
import Navbar from '../containers/NavbarContainer';

export default class App extends Component {
  componentDidMount() {
    const pathRegex = /^\/board/;
    if (this.props.location.pathname.match(pathRegex)) {
      document.body.className = "red-gradient-background";
    } else document.body.className = "body-background";
  }

  render() {
    const { isSignedIn } = this.props;
    return (
      <div>
        <Navbar />
        { !isSignedIn && <h1>Welcome to Trello</h1> }
        { isSignedIn && this.props.children }
      </div>
    );
  }
}
