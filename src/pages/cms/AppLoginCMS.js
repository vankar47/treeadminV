import React, { Component } from "react";
import Header from "../../components/Headers/Header";
import { Container, Card, CardBody, CardHeader, Progress } from "reactstrap";
import { basePath } from "../../configs";
import { toast } from "react-toastify";
import ToastBody from "../../components/Popups/ToastBody";
import { HashLoader } from "react-spinners";
// import Loader from "../../components/"
import validateSchema from "../../helpers/validation";
import { handleHttpErrors } from "../../helpers/error";
import { connect } from "react-redux";
import mediaHttp from "../../http/media";
import imagePlaceholder from "../../assets/img/img-placeholder.png";

import Joi from "joi-browser";
import Input from "../../components/Inputs/Input";
import loginScreenHttp from "../../http/cms/loginScreen";
import loginScreen from "../../http/cms/loginScreen";

const schema = {
  loginBG: Joi.string().optional().allow("").trim(),
  artworkBy: Joi.string().min(2).max(50).trim().required(),
  artist: Joi.string().min(2).max(50).trim().required(),
  platform: Joi.string().min(2).max(50).trim().required(),
};

class AppLoginCMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      imagePreview: null,
      isUploading: false,
      uploadProgress: 0,
      form: {
        artworkBy: "",
        artist: "",
        platform: "app",
      },
      errors: {},
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    try {
      this.setState({ loading: true });
      const { form } = this.state;
      const res = await loginScreenHttp.get(form.platform);
      const { loginBG, artist, artworkBy } = res.data;
      form.artworkBy = artworkBy;
      form.artist = artist;
      this.setState({ form, imagePreview: loginBG });
    } catch (err) {
      handleHttpErrors(err);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  onImageChange = async (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({ imagePreview: reader.result });
    }.bind(this);

    try {
      const { form } = this.state;
      this.setState({ isUploading: true, uploadProgress: 0 });
      const formData = new FormData();
      formData.append("image", file);
      const res = await mediaHttp.uploadImage(formData, this.onUploadProgress);
      form.loginBG = res.data._id;
      this.setState({ form });
    } catch (err) {
      handleHttpErrors(err);
    } finally {
      this.setState({ isUploading: false });
    }
  };

  onUploadProgress = (progressEvent) => {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    this.setState({ uploadProgress: percentCompleted });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    const { form, isUploading } = this.state;
    if (isUploading) return alert("Please wait until image upload comletes.");

    const errors = validateSchema(form, schema);
    if (errors) return this.setState({ errors });
    try {
      const { adminAuthToken } = this.props;
      this.setState({ loading: true });
      const res = await loginScreen.edit(form, adminAuthToken);

      const { loginBG, artist, artworkBy } = res.data;

      form.artworkBy = artworkBy;
      form.artist = artist;
      this.setState({ form, imagePreview: loginBG });
    } catch (err) {
      handleHttpErrors(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  showLoader = () => {
    return (
      <div className="d-flex justify-content-center my-5">
        <HashLoader width={25} height={25} color="#5e72e4" />
      </div>
    );
  };

  renderForm = () => {
    const {
      form,
      errors,
      imagePreview,
      isUploading,
      uploadProgress,
    } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="row">
          <div className="col-12">
            <img
              className="mb-2"
              src={imagePreview || imagePlaceholder}
              style={{ width: "200px" }}
              alt="category image"
            />
            {isUploading && (
              <Progress value={uploadProgress} style={{ width: "200px" }} />
            )}
            <br />
            <label htmlFor="imageInput" style={{marginBottom: '20px'}}>
              <span className="btn btn-primary btn-sm">Pick Image</span>
            </label>
            <input
              type="file"
              onChange={this.onImageChange}
              className="d-none"
              id="imageInput"
            />
          </div>

          <div className="col-md-6">
            <Input
              label="Artwork By:"
              value={form.artworkBy}
              placeholder="artworkBy"
              onChange={(artworkBy) => {
                form.artworkBy = artworkBy;
                errors.artworkBy = "";
                this.setState({ form, errors });
              }}
              error={errors.artworkBy}
            />
          </div>
          <div className="col-md-6">
            <Input
              label="Artist"
              value={form.artist}
              placeholder="Artist Name"
              onChange={(artist) => {
                form.artist = artist;
                errors.artist = "";
                this.setState({ form, errors });
              }}
              error={errors.artist}
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
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header />
        <div class="row" style={{ marginRight: "20px", marginLeft: "20px" }}>
          <div class="col-12 col-xl-12">
            <section class="section Transactions_table">
              <div class="card" style={{backgroundColor: "#f8f9fa"}}>
                <div class="card-header">App Login Screen</div>
                <CardBody style={{paddingTop:'20px'}}>
                {loading ? this.showLoader() : this.renderForm()}
                </CardBody>
              </div>
            </section>
          </div>
        </div>
        {/* <Container className="mt--7" fluid>
          <Card className="shadow">
            <CardHeader className="bg-secondary">
              <div className="clearfix">
                <h2 className="mb-0 float-left">App Login Screen</h2>
              </div>
            </CardHeader>
            <CardBody>
              {loading ? this.showLoader() : this.renderForm()}
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

export default connect(mapStateToProps)(AppLoginCMS);
