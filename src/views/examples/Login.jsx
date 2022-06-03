
import React from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import Joi from 'joi-browser';
import http from "../../services/http";
import {HashLoader} from 'react-spinners'

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(25).required()
}

class Login extends React.Component {

  state = {
    form: {
      email: '',
      password: ''
    },
    formErrors: {},
    loader: false
  }

  handleSubmit = async (e) => {
    if(this.state.loader) return;
    e.preventDefault();
    const formErrors = this.validateForm();
    if(formErrors) {
      this.setState({formErrors});
      return;
    }
    
    this.setState({loader: true});
    try{
      const result = await http.post('api/users/signin', this.state.form); 
      if(result.status === 200) {
        const token = result.headers['x-auth-token'];
        localStorage.setItem('token', token);
        this.props.history.replace('/admin/index')
      }
      console.log(result);
    } catch (e) {
    } finally {
      this.setState({loader: false});
    }
    
    
  }

  handleChange = ({currentTarget: input}) => {
    const {form, formErrors} = this.state;
    form[input.name] = input.value;
    formErrors[input.name] = null;
    this.setState({form, formErrors});
  }

  validateForm = () => {
    const result = Joi.validate(this.state.form, schema, {abortEarly: false});

    if(result.error) {
      const formErrors = {}
      for(let e of result.error.details) {
        if(!formErrors[e.path[0]]) {
          formErrors[e.path[0]] = e.message;
        }
      }
      return formErrors;
    }

    return null;
  }

 
  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={this.handleSubmit} >
                <FormGroup className="mb-4">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" onChange={this.handleChange} name="email" type="text" />
                  </InputGroup>
                  {this.state.formErrors.email && <div className="alert alert-danger">{this.state.formErrors.email}</div>}
                </FormGroup>
                <FormGroup >
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" onChange={this.handleChange} name="password" type="password" />
                  </InputGroup>
                  {this.state.formErrors.password && <div className="alert alert-danger">{this.state.formErrors.password}</div>}
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                    checked={true}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  {this.state.loader ? 
                  <HashLoader width={25} height={25} color="#5e72e4"/> : 
                  (<Button color="primary" type="submit">
                    Sign in
                  </Button>)}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
        {/* {this.state.loader ? this.showLoader() : this.showForm()} */}
      </>
    );
  }
}

export default Login;
