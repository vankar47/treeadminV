import React from "react";
import { Button, Card, CardBody, Form, Row, Col, Container } from "reactstrap";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import ToastBody from "../components/Popups/ToastBody";
import { HashLoader } from "react-spinners";
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import logoImg from "../assets/img/brand/logo.png";
import IconInput from "./../components/Inputs/IconInput";
import storage from "../services/storage";
import validateSchema from "../helpers/validation";
import authHttp from "../http/auth";
import { handleHttpErrors } from "../helpers/error";
import { loginUser } from "../actions/authActions";
import { connect } from "react-redux";
import { basePath } from "../configs";
import "assets/css/pages/auth.css";

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(25).required(),
};

class Login extends React.Component {
  state = {
    form: {
      email: "",
      password: "",
    },
    errors: {},
    loading: false,
  };


  loginHandler = async (e) => {
    e.preventDefault();
    const { form } = this.state;
    const errors = validateSchema(form, schema);
    if (errors) return this.setState({ errors });

    // http task
    try {
      this.setState({ loading: true });
      const res = await authHttp.login(form);
      const { headers, data } = res;

      const adminAuthToken = headers["x-auth-token"];
      const adminUser = data;

      if (adminUser.userType !== 2)
        return toast.error(
          <ToastBody
            title="Access Denied"
            message="you are not authorized for this area."
          />,
          { autoClose: false }
        );

      //saving to redux
      this.props.dispatch(loginUser({ adminAuthToken, adminUser }));

      //saving credentials
      storage.save("adminAuthToken", adminAuthToken);
      storage.save("adminUser", adminUser);

      // redirecting to home
      if (adminUser.isEmailVerified === true) {
        toast.success(
          <ToastBody title="Signed In" message="Welcome to Admin Panel." />
        );
        this.props.history.replace(basePath + "/users");
      } else {
        toast.warn(
          <ToastBody
            title="Warning"
            message="It seems like your email is not verified."
          />,
          { autoClose: false }
        );
      }
    } catch (err) {
      console.log(err);
      handleHttpErrors(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  showForm = () => {
    const { errors, form } = this.state;
    return (
      // <form onSubmit={this.loginHandler}>
      //                   <div className="form-group position-relative has-icon-left mb-4">
      //                       <input name="email" type="text" className="form-control form-control-xl" placeholder="Email" onChange={(email) => {
      //       form.email = email;
      //       errors.email = "";
      //       this.setState({ form, errors });
      //     }}
      //     autoFocus={true}
      //     error={errors.email}/>
      //                       <div className="form-control-icon">
      //                           <i className="bi bi-person"></i>
      //                       </div>
      //                   </div>
      //                   <div className="form-group position-relative has-icon-left mb-4">
      //                       <input  icon="ni ni-lock-circle-open"
      //     placeholder="Password"
      //     onChange={(password) => {
      //       form.password = password;
      //       errors.password = "";
      //       this.setState({ form, errors });
      //     }}
      //     error={errors.password} type="password" className="form-control form-control-xl"/>
      //                       <div className="form-control-icon">
      //                           <i className="bi bi-shield-lock"></i>
      //                       </div>
      //                   </div>
      //                   <button type="submit" className="btn btn-primary btn-block btn-lg shadow-lg mt-5">Log in</button>
      //               </form>
      <Form role="form" onSubmit={this.loginHandler}>
        <IconInput
          icon="ni ni-email-83"
          style={{height:'3.7rem'}}
          className="form-control form-control-xl"
          placeholder="Email"
          onChange={(email) => {
            form.email = email;
            errors.email = "";
            this.setState({ form, errors });
          }}
          name="email"
          type="text"
          value={form.email}
          autoFocus={true}
          error={errors.email}
        />

        <IconInput
          icon="ni ni-lock-circle-open"
          style={{height:'3.7rem'}}
          className="form-control form-control-xl"
          placeholder="Password"
          onChange={(password) => {
            form.password = password;
            errors.password = "";
            this.setState({ form, errors });
          }}
          type="password"
          value={form.password}
          error={errors.password}
        />

        <div className="d-flex justify-content-center mt-4">
          <Button className="btn btn-primary btn-block btn-lg shadow-lg mt-5" color="primary" type="submit">
            Sign in
          </Button>
        </div>
      </Form>
    );
  };

  showLoader = () => {
    return (
      <div className="d-flex justify-content-center my-5">
        <HashLoader width={25} height={25} color="#5e72e4" />
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <>
      <div id="auth">
        
        <div className="row h-100">
            <div className="col-lg-5 col-12">
                <div id="auth-left">
                    <div className="auth-logo">
                        <a href="index.html"><img src={require("assets/img/logo.png")} alt="Logo"/></a>
                    </div>
                    <h1 className="auth-title">Log in.</h1>
                    <p className="auth-subtitle mb-5">Log in with your data that you entered during registration.</p>
                    {loading ? this.showLoader() : this.showForm()}
                    
                </div>
            </div>
            <div className="col-lg-7 d-none d-lg-block">
                <div id="auth-right">
        
                </div>
            </div>
        </div>
        
            </div>
        {/* <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="d-flex justify-content-center mb-4">
                      <img src={logoImg} style={{ height: 100 }} alt="Logo" />
                    </div>
                    {loading ? this.showLoader() : this.showForm()}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(Login);
