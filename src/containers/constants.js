import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Error from "./Error";

export const DEFAULT_PAGES = [
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
