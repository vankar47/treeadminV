import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Media } from "reactstrap";
import { apiPath } from "../../configs";
import { connect } from "react-redux";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import categoriesHttp from "../../http/categories";
import * as $ from "jquery/dist/jquery";
import { handleHttpErrors } from "../../helpers/error";
import { basePath } from "../../configs";
$.DataTable = require("datatables.net-bs4");

class CategoryTable extends Component {
  componentDidMount = () => {
    $("#categoryTable").DataTable({
      language: {
        paginate: {
          next:
            '<span class="pagination-fa"><i class="fa fa-chevron-right" ></i></span>',
          previous:
            '<span class="pagination-fa"><i class="fa fa-chevron-left" ></i></span>',
        },
      },
      processing: true,
      serverSide: true,
      order: [[0, "_id"]],
      ajax: {
        url: apiPath + "/categories/data_table",
        type: "GET",
      },
      columns: [{ data: "name" }, { data: "_id" }],
      columnDefs: [
        {
          targets: 1,
          createdCell: this.renderLinkButtons,
        },
      ],
    });
  };

  renderLinkButtons = (td, cellData, rowData, row, col) => {
    return ReactDOM.render(
      <div>
        <button
          className="btn btn-primary btn-sm "
          style={{marginRight:'5px'}}
          onClick={() => {
            this.navigateToEditCategory(rowData._id);
          }}
        >
          <i className="fa fa-pencil-alt"></i>
        </button>

        <button
          className="btn btn-danger btn-sm "
          onClick={() => {
            this.deleteCategory(rowData._id, td);
          }}
        >
          <i className="fa fa-trash-alt"></i>
        </button>
      </div>,
      td
    );
  };
  deleteCategory = async (_id, td) => {
    var consent = window.confirm("are you sure you want to delete?");
    if (!consent) return;
    try {
      const { adminAuthToken } = this.props;
      const res = await categoriesHttp.delete(_id, adminAuthToken);
      td.parentNode.style.display = "none";
    } catch (err) {
      handleHttpErrors(err);
    }
  };
  navigateToEditCategory = (_id) => {
    this.props.history.push(basePath + "/categories/" + _id);
  };
  render() {
    return (
      <>
      <div class="card-body" style={{backgroundColor:'#f8f9fa',paddingTop:'20px'}}>
                  <table class="table table-striped" id="categoryTable">
                    <thead>
                      <tr>
                      <th>Name</th>
            <th>Actions</th>
                      </tr>
                    </thead>
                  </table>
                </div>
      {/* <table id="categoryTable" className="w-100 table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminAuthToken: state.auth.adminAuthToken,
  };
};
export default connect(mapStateToProps)(CategoryTable);
