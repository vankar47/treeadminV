import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { basePath } from "../configs";

const AuthGuard = ({
  component: Component,
  adminUser,
  adminAuthToken,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        adminAuthToken && adminUser && adminUser.userType === 2 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: basePath + "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = state => {
  return {
    adminAuthToken: state.auth.adminAuthToken,
    adminUser: state.auth.adminUser
  };
};

export default connect(mapStateToProps)(AuthGuard);
