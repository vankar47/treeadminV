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
  email: Joi.string().email().required(),
  password: Joi.string().allow("").optional(),
  confirmPassword: Joi.string().allow("").optional(),
  userType: Joi.number().required(),
};

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      form: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: 1,
        isBlocked: false,
      },
      errors: {},
      couponCode: ""
    };
  }

  getUser = async (_id) => {
    try {
      const { adminAuthToken } = this.props;
      const res = await usersHttp.get(_id, adminAuthToken);
      const form = res.data;
      // this.setState({couponCode:form.affiliate.couponCode})
      console.log("FORMMMM +> ", form);
      form.password = "";
      form.confirmPassword = "";
      this.setState({ form });
      console.log("Response => ", form);
    } catch (err) {
      console.log(err);
      handleHttpErrors(err);
      // this.props.history.goBack();
    }
  };

  componentDidMount = () => {
    const { _id } = this.props.match.params;
    this.setState({ userId: _id });
    this.getUser(_id);
  };

  editUser = async () => {
    const { form, userId } = this.state;
    const errors = validateSchema(form, schema);
    if (errors) return this.setState({ errors });

    try {
      this.setState({ loading: true });
      const { adminAuthToken } = this.props;
      form._id = userId;
      const user = await usersHttp.edit(form, adminAuthToken);
      toast.success(
        <ToastBody title="Success" message="User Editted successfuly" />
      );
      // //going back
      // const { history } = this.props;
      // history.goBack();
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
                <div class="card-header">Edit User</div>
                <CardBody style={{paddingTop:'20px'}}>
                <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.editUser();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Name"
                      value={form.name}
                      placeholder="Name"
                      onChange={(name) => {
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
                      onChange={(username) => {
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
                      onChange={(email) => {
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
                      onChange={(password) => {
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
                      onChange={(confirmPassword) => {
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
                      onChange={(checked) => {
                        form.userType = checked ? 2 : 1;
                        this.setState({ form });
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Toggle
                      label="isBlocked"
                      checked={form.isBlocked ? true : false}
                      onChange={(checked) => {
                        form.isBlocked = checked ? true : false;
                        this.setState({ form });
                      }}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    Coupon Code: {this.state.couponCode}
                  </div> */}
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
              
            </CardBody>
          </Card>
        </Container> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminAuthToken: state.auth.adminAuthToken,
  };
};

export default connect(mapStateToProps)(EditUser);
