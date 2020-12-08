import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "../lang";
import MainRoute from "Routes";
import { authUserSelector, menuSelector, settingsSelector } from "./Application/appSelectors";
import { defaultStartPath } from "./Application/appConstants";
import { DEFAULT_PAGES } from "./constants";
import "Assets/css/vendor/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "Assets/css/sass/themes/gogo.light.blue.scss";
import "./main.scss";
import TopNavigation from "../components/TopNavigation";
import Sidebar from "../components/Sidebar";
import gogo from "../routes/gogo";
import { compose } from "redux";

/*
color options : 
   'light.purple'		'dark.purple'
   'light.blue'		'dark.blue'
   'light.green'		'dark.green'
   'light.orange'		'dark.orange'
   'light.red'		'dark.red'
*/

const MainRoutes = ({ history, match, menu: { containerClassnames } }) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNavigation history={history} />
      <Sidebar />
      <main>
        <div className="container-fluid">
          <Switch>
            <Route path={`${match.url}/gogo`} component={gogo} />
            {/* <Route path={`${match.url}/second-menu`} component={secondMenu} />
            <Route path={`${match.url}/third-single`} component={thirdSingle} /> */}
            <Redirect to="/error" />
          </Switch>
        </div>
      </main>
    </div>
  );
};

const mainRoutesMapStateToProps = (state) => {
  return {
    menu: menuSelector(state)
  };
};

const enhancer = compose(
  withRouter,
  connect(mainRoutesMapStateToProps, {})
);

const connectedMainRoutes = enhancer(MainRoutes);


const InitialPath = ({ component: Component, authUser, ...rest }) => {
  return <Route
    {...rest}
    render={(props) => {
      return authUser !== null
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />;
    }}
  />;
};

class App extends React.Component {
  render() {
    const { location, match, settings, authUser } = this.props;
    const currentAppLocale = AppLocale[settings.locale];
    if (location.pathname === "/" || location.pathname === "/app" || location.pathname === "/app/") {
      return (<Redirect to={defaultStartPath} />);
    }
    return (
      <React.Fragment>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <Switch>
              <InitialPath
                path={`${match.url}app`}
                authUser={authUser.user}
                component={connectedMainRoutes}
              />
              {DEFAULT_PAGES.map((page, i) => {
                return <Route key={`default-pages-${i}`} path={page.path} component={page.component} />;
              })}
            </Switch>
          </React.Fragment>
        </IntlProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: settingsSelector(state),
    authUser: authUserSelector(state)
  };
};

export default connect(mapStateToProps, {})(App);
