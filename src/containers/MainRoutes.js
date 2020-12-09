import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter, Switch } from "react-router-dom";
import { compose } from "redux";
import Sidebar from "../components/Sidebar";
import TopNavigation from "../components/TopNavigation";
import { menuSelector } from "./Application/appSelectors";
import { MAIN_ROUTES } from "./RouteDefinition";

const MainRoutes = ({ history, match, menu: { containerClassnames } }) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNavigation history={history} />
      <Sidebar />
      <main>
        <div className="container-fluid">
          <Switch>
            {MAIN_ROUTES.map(({ key, path: mainPath, subRoutes, isSingle, component: Component }) => {
              if (isSingle) {
                return <Component key={key} />;
              }
              return (
                <Route key={`main-routes-${key}`} path={`${match.url}${mainPath}`}>
                  <Switch>
                    <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
                    {subRoutes.map(({ key, path: subPath, component }) => {
                      return <Route key={`sub-routes-${key}`} path={`${match.url}${mainPath}${subPath}`} component={component} />;
                    })}
                    <Redirect to="/error" />
                  </Switch>
                </Route>
              );
            })}
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

export default enhancer(MainRoutes);
