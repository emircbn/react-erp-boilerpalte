import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import gogo from "./gogo";
import secondMenu from "./second-menu";
import thirdSingle from "./third-single";
import { connect } from "react-redux";
import { menuSelector } from "../containers/Application/appSelectors";
import { compose } from "redux";
import TopNavigation from "../components/TopNavigation";
import Sidebar from "../components/Sidebar";

class MainApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, menu: { containerClassnames } } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNavigation history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
            <Switch>
              <Route path={`${match.url}/gogo`} component={gogo} />
              <Route path={`${match.url}/second-menu`} component={secondMenu} />
              <Route path={`${match.url}/third-single`} component={thirdSingle} />
              <Redirect to="/error" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    menu: menuSelector(state)
  };
};

const enhancer = compose(
  withRouter,
  connect(mapStateToProps, {})
);

export default enhancer(MainApp);
