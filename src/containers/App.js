import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "../lang";
import { authUserSelector, settingsSelector } from "./Application/appSelectors";
import { defaultStartPath } from "./Application/appConstants";
import { DEFAULT_ROUTES } from "./RouteDefinition";
import MainRoutes from "./MainRoutes";
import "Assets/css/vendor/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "Assets/css/sass/themes/gogo.light.blue.scss";
import "./main.scss";

/*
color options : 
   'light.purple'		'dark.purple'
   'light.blue'		'dark.blue'
   'light.green'		'dark.green'
   'light.orange'		'dark.orange'
   'light.red'		'dark.red'
*/

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
                component={MainRoutes}
              />
              {DEFAULT_ROUTES.map((page, i) => {
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
