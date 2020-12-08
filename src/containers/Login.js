import React from "react";
import { Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import { FormattedMessage } from "react-intl";
import { authUserSelector } from "./Application/appSelectors";
import { loginUser, loginUserSuccess } from "./Application/appActions";

class LoginLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "demo@gogo.com",
      password: "gogo123"
    };
  }

  onUserLogin() {
    const { email, password } = this.state;
    const { loginUser, loginUserSuccess, history } = this.props;
    if (email !== "" && this.state.password !== "") {
      loginUser(this.state, history);
      setTimeout(() => {
        loginUserSuccess({email, password});
        history.push("/app");
      }, 2000);
    }
  }

  componentDidMount() {
    document.body.classList.add("background");
  }

  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    return (
      <React.Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container login-pages">
            <Row className="content" justify="center" align="middle">
              <Col xs={12} md={10} className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                    <p className="white">
                      Please use your credentials to login.
                      <br />
                      If you are not a member, please{" "}
                      <NavLink to={"/register"} className="white">
                        register
                      </NavLink>
                      .
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={"/"} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <FormattedMessage id="user.login-title" />
                    </CardTitle>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="email" defaultValue={this.state.email} />
                        <FormattedMessage id="user.email" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="password" />
                        <FormattedMessage
                          id="user.password"
                          defaultValue={this.state.password}
                        />
                      </Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={"/forgot-password"}>
                          <FormattedMessage id="user.forgot-password-question" />
                        </NavLink>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          onClick={() => { this.onUserLogin(); }}
                        >
                          <FormattedMessage id="user.login-button" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authUser: authUserSelector(state)
  };
};

const mapDispatchToProps = { loginUser, loginUserSuccess };

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);
