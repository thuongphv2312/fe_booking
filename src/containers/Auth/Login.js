import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errCode: "",
      message: "",
      isShowPassword: false,
    };
  }

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({ message: "", errCode: "" });
    console.log(
      "username: ",
      this.state.username,
      "password: ",
      this.state.password
    );
    try {
      await handleLogin(this.state.username, this.state.password).then(
        (data) => {
          this.setState({
            message: data.message,
            errCode: data.errCode,
          });
          if (data.errCode === 0) {
            this.props.userLoginSuccess(data.user);
            console.log("Login success!");
          }
          console.log(data);
        }
      );
    } catch (error) {
      if (error) {
        this.setState({
          message: error.response.data.errMessage,
          errCode: error.response.data.errCode,
        });
        console.log("e", error.response);
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="login-form">
              <div className="col-12 login-text">Login</div>
              <div className="col-12 form-group row">
                <label>Username: </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Type your email"
                  value={this.state.username}
                  onChange={(e) => this.handleOnChangeUsername(e)}
                />
              </div>
              <div className="password col-12 form-group row">
                <label>Password: </label>
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  name="password"
                  placeholder="Type your password"
                  value={this.state.password}
                  onChange={(e) => this.handleOnChangePassword(e)}
                />
                <span className="image-hide-show">
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye i"
                        : "fas fa-eye-slash icon-password"
                    }
                    onClick={this.handleShowHidePassword}
                  ></i>
                </span>
                <span className="error-message">
                  {this.state.errCode !== 0 ? this.state.message : undefined}
                </span>
              </div>
              <div className="col-12 row">
                <button className="button-submit" onClick={this.handleLogin}>
                  LOGIN
                </button>
              </div>
              <div className="col-12 row">
                <a className="forgot-pass" href="#">
                  Forgot your password?
                </a>
              </div>
              <div className="col-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
