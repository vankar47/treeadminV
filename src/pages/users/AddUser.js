import React, { Component } from "react";
import Header from "../../components/Headers/Header";
import Input from "../../components/Inputs/Input";
import Toggle from "../../components/Inputs/Toggle";
import Joi from "joi-browser";
import { Container, Card, CardBody, CardHeader } from "reactstrap";
import { toast } from "react-toastify";
import ToastBody from "../../components/Popups/ToastBody";
import validateSchema from "../../helpers/validation";
import { handleHttpErrors } from "../../helpers/error";
import usersHttp from "../../http/usersHttp";
import { connect } from "react-redux";

const schema = {
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(25)
    .required(),
  confirmPassword: Joi.string().required(),
  userType: Joi.number().required()
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: 1
      },
      errors: {}
    };
  }

  createUser = async () => {
    const { form } = this.state;
    const errors = validateSchema(form, schema);
    if (errors) return this.setState({ errors });

    try {
      this.setState({ loading: true });
      const { adminAuthToken } = this.props;
      const user = await usersHttp.create(form, adminAuthToken);
      toast.success(
        <ToastBody title="Success" message="User created successfuly" />
      );
      //going back
      const { history } = this.props;
      history.goBack();
    } catch (err) {
      console.log(err);
      handleHttpErrors(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { form, errors } = this.state;
    return (
      <>
        <Header />
        <div class="row" style={{ marginRight: "20px", marginLeft: "20px" }}>
          <div class="col-12 col-xl-12">
            <section class="section Transactions_table">
              <div class="card" style={{backgroundColor: '#f8f9fa'}}>
                <div class="card-header">Add User</div>
                <CardBody style={{paddingTop:'20px'}}>
                <form
                onSubmit={e => {
                  e.preventDefault();
                  this.createUser();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Name"
                      value={form.name}
                      placeholder="Name"
                      onChange={name => {
                        form.name = name;
                        errors.name = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.name}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Username"
                      value={form.username}
                      placeholder="Username"
                      onChange={username => {
                        form.username = username;
                        errors.username = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.username}
                    />
                  </div>

                  <div className="col-md-6">
                    <Input
                      label="Email"
                      placeholder="Email"
                      value={form.email}
                      onChange={email => {
                        form.email = email;
                        errors.email = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Password"
                      placeholder="Password"
                      value={form.password}
                      onChange={password => {
                        form.password = password;
                        errors.password = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.password}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={confirmPassword => {
                        form.confirmPassword = confirmPassword;
                        errors.confirmPassword = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.confirmPassword}
                    />
                  </div>
                  <div className="col-md-6">
                    <Toggle
                      label="isAdmin"
                      checked={form.userType === 2 ? true : false}
                      onChange={checked => {
                        form.userType = checked ? 2 : 1;
                        this.setState({ form });
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <div className="text-center">
                      <button className="btn btn-primary m-auto" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
                </CardBody>
              </div>
            </section>
          </div>
        </div>
        {/* <Container className="mt--7" fluid>
          <Card className="shadow">
            <CardHeader>
              <div className="clearfix">
                <h2 className="mb-0 float-left">User</h2>
              </div>
            </CardHeader>
            <CardBody className="bg-secondary">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.createUser();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Name"
                      value={form.name}
                      placeholder="Name"
                      onChange={name => {
                        form.name = name;
                        errors.name = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.name}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Username"
                      value={form.username}
                      placeholder="Username"
                      onChange={username => {
                        form.username = username;
                        errors.username = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.username}
                    />
                  </div>

                  <div className="col-md-6">
                    <Input
                      label="Email"
                      placeholder="Email"
                      value={form.email}
                      onChange={email => {
                        form.email = email;
                        errors.email = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Password"
                      placeholder="Password"
                      value={form.password}
                      onChange={password => {
                        form.password = password;
                        errors.password = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.password}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={confirmPassword => {
                        form.confirmPassword = confirmPassword;
                        errors.confirmPassword = "";
                        this.setState({ form, errors });
                      }}
                      error={errors.confirmPassword}
                    />
                  </div>
                  <div className="col-md-6">
                    <Toggle
                      label="isAdmin"
                      checked={form.userType === 2 ? true : false}
                      onChange={checked => {
                        form.userType = checked ? 2 : 1;
                        this.setState({ form });
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <div className="text-center">
                      <button className="btn btn-primary m-auto" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        </Container> */}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminAuthToken: state.auth.adminAuthToken
  };
};

export default connect(mapStateToProps)(AddUser);
