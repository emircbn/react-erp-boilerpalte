import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Error from "./Error";
import { Start } from "./Homepage";
import { Second } from "./SecondMenu";
import ThirdSinglePage from "./ThirdSinglePage";

export const DEFAULT_ROUTES = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/forgot-password",
    component: ForgotPassword
  },
  {
    path: "/error",
    component: Error
  }
];

export const MAIN_ROUTES = [
  {
    key: "homepage",
    path: "/homepage",
    defaultSubRoute: "/start",
    subRoutes: [
      {
        key: "start",
        path: "/start",
        component: Start
      }
    ]
  },
  {
    key: "second-menu",
    path: "/second-menu",
    defaultSubRoute: "/second",
    subRoutes: [
      {
        key: "second",
        path: "/second",
        component: Second
      }
    ]
  },
  {
    key: "third-single",
    path: "/third-single",
    isSingle: true,
    component: ThirdSinglePage
  }
];
