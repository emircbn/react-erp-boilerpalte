import React from "react";
import { Card, CardTitle, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Col, Row } from "antd";
import { FormattedMessage } from "react-intl";

class Error404 extends React.Component {
  constructor(props) {
    super(props);
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
                    <p className="white">Yes, it is indeed!</p>
                  </div>
                  <div className="form-side">
                    <NavLink to={"/"} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <FormattedMessage id="layouts.error-title" />
                    </CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      <FormattedMessage id="layouts.error-code" />
                    </p>
                    <p className="display-1 font-weight-bold mb-5">404</p>
                    <Button
                      href="/app"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      <FormattedMessage id="layouts.go-back-home" />
                    </Button>
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

export default Error404;
