import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Navbar from '../containers/NavbarContainer';

export default class App extends Component {
  componentDidMount() {
    if (!this.props.isSignedIn) {
      browserHistory.push('/');
    } else {
      const pathRegex = /^\/board/;
      if (this.props.location.pathname.match(pathRegex)) {
        document.body.className = "red-gradient-background";
      } else document.body.className = "body-background";
    }
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
