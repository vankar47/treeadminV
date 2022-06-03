import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Media } from "reactstrap";
import Limit from "../Inputs/Limit";
import { apiPath } from "../../configs";
import { connect } from "react-redux";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import * as $ from "jquery/dist/jquery";
import usersHttp from "../../http/usersHttp";
import { handleHttpErrors } from "../../helpers/error";
import storage from "../../services/storage";
import { basePath } from "../../configs";
$.DataTable = require("datatables.net-bs4");

class UserTable extends Component {
  state = {
    loading: false,
  };
  componentDidMount = () => {
    $("#vipTable").DataTable({
      language: {
        paginate: {
          next: '<span class="pagination-fa"><i class="fa fa-chevron-right" ></i></span>',
          previous:
            '<span class="pagination-fa"><i class="fa fa-chevron-left" ></i></span>',
        },
      },
      processing: true,
      serverSide: true,
      order: [[0, "_id"]],

      ajax: {
        url: apiPath + "/users/vips",
        type: "GET",
      },

      columns: [
        { data: "username" },
        { data: "name" },
        { data: "email" },
        { data: "isBlocked" },
        { data: "isEmailVerified" },
        {data: "affiliate"}
      ],

      columnDefs: [
        {
          targets: 0,
          createdCell: this.renderUsernameCell,
        },
        {
          targets: 2,
          createdCell: this.renderEmailCell,
        },
        { targets: 3, createdCell: this.renderBlockedCell },
        {
          targets: 4,
          createdCell: this.renderLinkButtons,
        },
        {
            targets: 5,
            createdCell: this.renderLimitCell
        }
      ],
    });
  };

  createUserSession = async (userId) => {
    const conf = window.confirm(
      "Are you sure you want to use this users session?"
    );
    if (!conf) return;
    try {
      this.setState({ loading: true });
      const { adminAuthToken } = this.props;
      const res = await usersHttp.createUserSession(userId, adminAuthToken);
      const { headers, data } = res;
      const xAuthToken = headers["x-auth-token"];
      const user = data;
      storage.save("xAuthToken", xAuthToken);
      storage.save("user", user);
      // storage.remove("adminAuthToken");
      // storage.remove("adminUser");
      window.location.href = "/";
    } catch (err) {
      handleHttpErrors(err);
    } finally {
      this.setState({ loading: false });
    }
  };
  renderUsernameCell = (td, cellData, rowData, row, col) => {
    return ReactDOM.render(<div>@{cellData}</div>, td);
  };

  renderEmailCell = (td, cellData, rowData, row, col) => {
    return ReactDOM.render(
      <div>
        {cellData}{" "}
        <span className="ml-1">
          <i
            className={
              rowData.isEmailVerified != true
                ? "fa fa-times text-danger"
                : "fas fa-check text-success"
            }
          ></i>
        </span>
      </div>,
      td
    );
  };
  renderLimitCell = (td, cellData, rowData, row, col) => {
    const { adminAuthToken } = this.props;
    return ReactDOM.render(
        <Limit cellData={cellData} adminAuthToken={adminAuthToken} rowData={rowData}/>
      ,
      td
    );
  };

  renderBlockedCell = (td, cellData, rowData, row, col) => {
    return ReactDOM.render(
      <div>
        {cellData ? "Blocked" : "Active"}
        {/* <i className="fa fa-pencil-alt"></i> */}
      </div>,
      td
    );
  };

  renderLinkButtons = (td, cellData, rowData, row, col) => {
    return ReactDOM.render(
      <div>
        <button
          className="btn btn-primary btn-sm "
          style={{marginRight:'5px'}}
          onClick={() => {
            this.navigateToEditUser(rowData._id);
          }}
        >
          <i className="fa fa-pencil-alt"></i>
        </button>
        {/* //createUserSession */}

        <button
          className="btn btn-success btn-sm "
          style={{marginRight:'5px'}}
          onClick={() => {
            this.createUserSession(rowData._id);
          }}
        >
          <i className="fa fa-user"></i>
        </button>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          style={{color:'white'}}
          onClick={async () => {
            const { adminAuthToken } = this.props;
            try {
              const res = await usersHttp.removeVip(rowData._id, adminAuthToken);
              alert("User removed from VIPs");
              console.log(res);
              window.location.reload();
            } catch (error) {
              console.log(error);
            }
            // this.navigateToEditUser(rowData._id);
          }}
        >
          Remove from VIPs
        </button>
        {/* <button
          className="btn btn-danger btn-sm "
          onClick={() => {
            this.deleteUser(rowData._id, td);
          }}
        >
          <i className="fa fa-trash-alt"></i>
        </button> */}
      </div>,
      td
    );
  };

  navigateToEditUser = (_id) => {
    this.props.history.push(basePath + "/users/" + _id);
  };
  render() {
    const { loading } = this.state;
    return (
      <>
        
                <div class="card-body" style={{backgroundColor:'#f8f9fa',paddingTop:'20px'}}>
                  <table class="table table-striped" id="vipTable">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Limit</th>
                      </tr>
                    </thead>
                  </table>
                  {loading && (
            <div
              className="pt-5"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <h1 className="text-white text-center ">Generating Session</h1>
            </div>
          )}
                </div>
             

        {/* <div style={{ position: "relative" }}>
          <table id="userTable" className="w-100 table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
          
        </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminAuthToken: state.auth.adminAuthToken,
  };
};
export default connect(mapStateToProps)(UserTable);
