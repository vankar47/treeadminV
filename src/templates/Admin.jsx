import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import AdminFooter from "components/Footers/AdminFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import { authenticatedRoutes } from "../routes";
import { basePath } from "../configs";

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          {/* <AdminNavbar {...this.props} brandText="" /> */}
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              {authenticatedRoutes.map((route) => {
                const { path, component: Component, exact = true } = route;
                return (
                  <Route
                    path={basePath + path}
                    key={path}
                    exact={true}
                    component={Component}
                  />
                );
              })}
            </Switch>
          </Suspense>
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
        </div>
      </>
    );
  }
}

export default Admin;
