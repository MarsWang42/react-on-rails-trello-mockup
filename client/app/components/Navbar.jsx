import React, { Component, PropTypes } from 'react';
import { Modal, Button, Menu, Icon, Affix, Input } from 'antd';
import SignInForm from './User/SignInForm';
import SignUpForm from './User/SignUpForm';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInVisible: false,
      signUpVisible: false,
    };
    this.showSignInModal = this.showSignInModal.bind(this);
    this.showSignUpModal = this.showSignUpModal.bind(this);
    this.hideSignInModal = this.hideSignInModal.bind(this);
    this.hideSignUpModal = this.hideSignUpModal.bind(this);
  }

  showSignInModal() {
    this.setState({
      signInVisible: true,
      signUpVisible: false,
    });
  }

  showSignUpModal() {
    this.setState({
      signUpVisible: true,
      signInVisible: false,
    });
  }

  hideSignUpModal(e) {
    this.setState({
      signUpVisible: false,
    });
  }

  hideSignInModal(e) {
    this.setState({
      signInVisible: false,
    });
  }

  render() {
    const {
      user: {
        isSignedIn,
        currentUser,
        editPath,
        registrationPath,
        loginPath,
        csrfToken,
        signInError,
        signUpError,
      },
      logoutUser,
      loginUser,
      registerUser,
    } = this.props;

    return (
      <Affix>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="logo">
            <a href="/" className="navbar-logo" rel="noopener noreferrer">React App</a>
          </Menu.Item>
          { !isSignedIn &&
            <Menu.Item key="signup" className="float-right">
              <a onClick={this.showSignUpModal} className="navbar-logo" rel="noopener noreferrer">Sign up</a>
              <Modal
                title="Register Now!" visible={this.state.signUpVisible && !isSignedIn}
                onCancel={this.hideSignUpModal} footer={null}
              >
                <SignUpForm
                  onFormSubmit={registerUser}
                  signUpError={signUpError}
                  csrfToken={csrfToken}
                  hideSignUpModal={this.hideSignUpModal}
                />
              </Modal>
            </Menu.Item>
          }
          { !isSignedIn &&
            <Menu.Item key="signin" className="float-right">
              <a onClick={this.showSignInModal} className="navbar-logo" rel="noopener noreferrer">Sign in</a>
              <Modal
                title="Sign In" visible={this.state.signInVisible && !isSignedIn}
                onCancel={this.hideSignInModal} footer={null}
              >
                <SignInForm
                  onFormSubmit={loginUser}
                  csrfToken={csrfToken}
                  signInError={signInError}
                  hideSignInModal={this.hideSignInModal}
                  showSignUpModal={this.showSignUpModal}
                />
              </Modal>
            </Menu.Item>
          }
          { isSignedIn &&
            <SubMenu
              title={<span><Icon type="setting" />Hello,&nbsp;<span className="caret">{currentUser && currentUser.username}</span></span>}
              className="float-right">
              <Menu.Item key="setting">
                <a href={editPath}>Settings</a>
              </Menu.Item>
              <Menu.Item key="logout">
                <a onClick={() => logoutUser(csrfToken)}>Logout</a>
              </Menu.Item>
            </SubMenu>
          }
        </Menu>
      </Affix>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Navbar;
