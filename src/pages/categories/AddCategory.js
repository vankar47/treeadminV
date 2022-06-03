import React, { Component } from "react";
import Header from "../../components/Headers/Header";
import Input from "../../components/Inputs/Input";
import Toggle from "../../components/Inputs/Toggle";
import Joi from "joi-browser";
import { Container, Card, CardBody, CardHeader, Progress } from "reactstrap";
import { toast } from "react-toastify";
import ToastBody from "../../components/Popups/ToastBody";
import validateSchema from "../../helpers/validation";
import { handleHttpErrors } from "../../helpers/error";
import categoriesHttp from "../../http/categories";
import { connect } from "react-redux";
import SearchSelect from "../../components/Inputs/SearchSelect";
import mediaHttp from "../../http/media";
import imagePlaceholder from "../../assets/img/img-placeholder.png";
const schema = {
  name: Joi.string().min(2).max(50).trim().required(),
  image: Joi.string().allow("").trim().optional(),
  allowedTypes: Joi.array().items(Joi.string().trim()).min(1).required(),
};

const allowedTypesOptions = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  // { value: "document", label: "Document" },
  { value: "texteditor", label: "Text Editor" },
];

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: null,
      isUploading: false,
      uploadProgress: 0,
      form: {
        image: "",
        name: "",
        allowedTypes: [],
      },
      errors: {},
    };
  }

  createCategory = async () => {
    const { form, isUploading } = this.state;
    if (isUploading) return alert("Please wait until image upload comletes.");
    const tempData = {
      ...form,
    };
    const temp = [];
    for (let i = 0; i < form.allowedTypes.length; i++) {
      const t = form.allowedTypes[i];
      temp.push(t.value);
    }
    tempData.allowedTypes = temp;

    const errors = validateSchema(tempData, schema);
    if (errors) return this.setState({ errors });

    try {
      this.setState({ loading: true });
      const { adminAuthToken } = this.props;
      const category = await categoriesHttp.create(tempData, adminAuthToken);
      toast.success(
        <ToastBody title="Success" message="Category created successfuly" />
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
      form.image = res.data._id;
      this.setState({ form });
      console.log(form);
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

  render() {
    const {
      form,
      errors,
      imagePreview,
      isUploading,
      uploadProgress,
    } = this.state;
    return (
      <>
        <Header />
        <div class="row" style={{ marginRight: "20px", marginLeft: "20px" }}>
          <div class="col-12 col-xl-12">
            <section class="section Transactions_table">
              <div class="card" style={{backgroundColor: '#f8f9fa'}}>
                <div class="card-header">Add Category</div>
                <CardBody style={{paddingTop:'20px'}}>
                <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.createCategory();
                }}
              >
                <div className="row">
                  <div className="col-12" style={{marginBottom:'20px'}}>
                    <img
                      className="mb-2"
                      src={imagePreview || imagePlaceholder}
                      style={{ width: "200px" }}
                      alt="category image"
                    />
                    {isUploading && (
                      <Progress
                        value={uploadProgress}
                        style={{ width: "200px" }}
                      />
                    )}
                    <br />
                    <label for="imageInput">
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
                    <SearchSelect
                      name="allowedTypes"
                      label="File Type"
                      isMulti={true}
                      placeholder="File Type"
                      value={this.state.form.allowedTypes}
                      onChange={(v) => {
                        form.allowedTypes = v;
                        errors.allowedTypes = "";
                        this.setState({ form });
                      }}
                      options={allowedTypesOptions}
                      error={errors.allowedTypes}
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
                <h2 className="mb-0 float-left">Add Category</h2>
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

export default connect(mapStateToProps)(AddUser);
