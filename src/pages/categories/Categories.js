import React, { Component } from "react";
import Header from "../../components/Headers/Header";
import { Container, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { basePath } from "../../configs";
import MySelect from "../../components/Inputs/MySelect";
import CategoryTable from "../../components/Table/CategoryTable";

class Categories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        {/* <Container className="mt--7" fluid>
          <Card className="shadow">
            <CardHeader className="bg-secondary">
              <div className="clearfix">
                <h2 className="mb-0 float-left">Categories</h2>
                <Link
                  className="float-right btn btn-dark btn-sm"
                  to={basePath + "/categories/add"}
                >
                  Add <i className="fa fa-user text-white"></i>
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <CategoryTable history={this.props.history} />
            </CardBody>
          </Card>
        </Container> */}
        <div class="row" style={{marginRight:'20px',marginLeft:'20px'}}>
          <div class="col-12 col-xl-12">
            <section class="section Transactions_table">
              <div class="card">
            <div class="card-header"> Categories
            <div className="clearfix" style={{right:'20px',top:'20px',position:'absolute'}}>
                <Link
                  className="float-right btn btn-dark btn-sm"
                  to={basePath + "/categories/add"}
                >
                  Add <i class="bi bi-stack"></i>
                </Link>
              </div>
             </div>
             <CategoryTable history={this.props.history} />
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default Categories;
