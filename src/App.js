import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store/store";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";
import "assets/css/app.css";
// import "assets/css/app.rtl.css";
import "assets/css/bootstrap.css";
// import "assets/css/bootstrap.rtl.css";
// import "assets/css/pages/auth.rtl.css";
import "assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "assets/vendor/iconly/bold.css"

import AuthGuard from "./guards/AuthGuard";
import { basePath } from "./configs";
import Login from "pages/Login";
import Dashboard from "./views/Dashboard";
import Admin from "./templates/Admin";

// const $ = require("jquery/dist/jquery");

const hist = createBrowserHistory();

class App extends React.Component {
  renderLogin() {
    return <Login />;
  }

  render() {
    return (
      <Provider store={store}>
        <ToastContainer hideProgressBar={true} closeButton={false} />
        <Router history={hist} basename={basePath}>
          <Switch>
            <Route path={`${basePath}/signin`} component={Login} />
            <AuthGuard path={`${basePath}`} component={Admin} />
            <Redirect to={`${basePath}`} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
