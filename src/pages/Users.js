import React, { Component } from "react";
import Header from "../components/Headers/Header";
import { Container, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { basePath } from "../configs";
import UserTable from "../components/Table/UsersTable";
import VipsTable from "../components/Table/VipsTable";
import usersHttp from "../http/usersHttp";
import { connect } from "react-redux";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "users",
      localGlobalLimit: 10,
    };
  }
  componentDidMount = async () => {
    const res = await usersHttp.getGlobalLimit(this.props.adminAuthToken);
    this.setState({ localGlobalLimit: res.data.globalLimit });
  };

  render() {
    const { adminAuthToken } = this.props;
    return (
      <>
        <Header />
        <div class="row" style={{ marginRight: "20px", marginLeft: "20px" }}>
          <div class="col-12 col-xl-12">
            <section class="section Transactions_table">
              <div class="card">
                <div class="card-header">
                  <div
                    className="clearfix"
                    style={{ left: "20px", top: "20px" }}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        this.setState({ selected: "users" });
                      }}
                      className="float-right btn btn-dark btn-sm"
                      style={{
                        padding: "0.8rem 2rem",
                        backgroundColor:
                          this.state.selected === "users"
                            ? "#adb5bd"
                            : "#dee2e6",
                        borderColor:
                          this.state.selected === "users"
                            ? "##adb5bd"
                            : "#dee2e6",
                        color: "#495057",
                      }}
                    >
                      Users
                    </Link>
                  </div>
                  <div
                    className="clearfix"
                    style={{ left: "150px", top: "25px", position: "absolute" }}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        this.setState({ selected: "vips" });
                      }}
                      className="float-right btn btn-dark btn-sm"
                      style={{
                        padding: "0.8rem 2rem",
                        backgroundColor:
                          this.state.selected === "vips"
                            ? "#adb5bd"
                            : "#dee2e6",
                        borderColor:
                          this.state.selected === "users"
                            ? "##adb5bd"
                            : "#dee2e6",
                        color: "#495057",
                      }}
                    >
                      VIPs
                    </Link>
                  </div>
                  <div
                    className="clearfix"
                    style={{ right: "20px", top: "20px", position: "absolute" }}
                  >
                    {this.state.selected === "users" ? (
                      <Link
                        className="float-right btn btn-dark btn-sm"
                        to={basePath + "/users/add"}
                      >
                        Add <i className="fa fa-user text-white"></i>
                      </Link>
                    ) : (
                      <div>
                        <label style={{marginRight:'10px',fontSize:'15px'}}>Global Coupon Limit</label>
                        <input
                          style={{
                            width: "30px",
                            height: "30px",
                            borderColor: "grey",
                            borderStyle: "none",
                            backgroundColor: "white",
                            fontSize:'20px'
                          }}
                          value={this.state.localGlobalLimit}
                          onChange={async (newlimit) => {
                            // console.log(cellData);
                            this.setState({
                              localGlobalLimit: newlimit.target.value,
                            });
                          }}
                          // onBlur={async (e) => {
                          //     try {
                          //       const res = await usersHttp.setGlobalLimit(
                          //         this.state.localGlobalLimit,
                          //         adminAuthToken
                          //       );
                          //       alert("Global Limit Increased");
                          //       console.log(res);
                          //       window.location.reload();
                          //     } catch (error) {
                          //       // setLocalLimit(cellData.couponLimit);
                          //       console.log(error);
                          //     }
                            
                          // }}
                          onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                              try {
                                const res = await usersHttp.setGlobalLimit(
                                  this.state.localGlobalLimit,
                                  adminAuthToken
                                );
                                alert("Global Limit Increased");
                                console.log(res);
                                window.location.reload();
                              } catch (error) {
                                // setLocalLimit(cellData.couponLimit);
                                console.log(error);
                              }
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {this.state.selected === "users" ? (
                  <UserTable history={this.props.history} />
                ) : (
                  <VipsTable history={this.props.history} />
                )}
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    adminAuthToken: state.auth.adminAuthToken,
  };
};
export default connect(mapStateToProps)(Users);
