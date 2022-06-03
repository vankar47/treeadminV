import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { basePath } from "../../configs";
import { connect } from "react-redux";
class Sidebar extends React.Component {
  //
  state = {
    collapseOpen: false,
    selected:"",
    navItems: [
      // { icon: "ni ni-planet text-blue", name: "Dashboard", link: "/dashboard" },
      { icon: "ni ni-single-02 text-danger", name: "Users", link: "/users" },
      {
        icon: "ni ni-bullet-list-67 text-orange",
        name: "Categories",
        link: "/categories",
      },
      { type: "heading", heading: "Web CMS" },
      {
        icon: "ni ni-money-coins text-pink",
        name: "Web Login Page",
        link: "/cms/web-login-cms",
      },
      {
        icon: "ni ni-paper-diploma text-yellow",
        name: "Web Feed Page",
        link: "/cms/web-feed-cms",
      },
      { type: "heading", heading: "App CMS" }, //
      {
        icon: "ni ni-collection text-success",
        name: "App Login Screen",
        link: "/cms/app-login-cms",
      },
    ],
  };

  activeRoute = (routeName) => {
    return this.props.location.pathname.indexOf(basePath + routeName) > -1
      ? "active"
      : "";
  };

  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };

  closeCollapse = () => {
    this.setState({
      collapseOpen: false,
    });
  };

  createNavItem = () => {
    const { navItems } = this.state;
    return navItems.map((item, key) => {
      if (item.type === "heading") {
        return (
          <h4 className="ml-4" key={item.heading}>
            {item.heading}
          </h4>
        );
      }
      const active = this.activeRoute(item.link);
      return (
        <NavItem key={key}>
          <Link
            to={basePath + item.link}
            // onClick={this.closeCollapse}
            className={"nav-link " + active}
          >
            <i className={item.icon} />
            {item.name}
          </Link>
        </NavItem>
      );
    });
  };
  render() {
    const { logo } = this.props;
    const { adminUser } = this.props;
    return (
      <>
        <header class="mb-3 main_header">
          <div class="brand_logo d-flex align-items-center">
           
              <img
                src={require("assets/img/logo.png")}
                alt="Logo"
                srcset=""
              />
            <a href="/secure/home" class="burger-btn d-block d-lg-none ">
              <i class="bi bi-justify fs-3 m-2"></i>
            </a>
          </div>
          <nav class="navbar navbar-expand main_nav_wraper ">
            <ul class="navbar-nav">
              <li class={`nav-item ${this.state.selected=== "users"?"active":""}`}>
                <Link
                onClick={()=>{
                  this.setState({selected: 'users'})
                }}
                  to={basePath + "/users"}
                  class="nav-link icon_menu"
                style={{paddingLeft:'0.9rem',paddingTop:'0.7rem'}}
                >
                  <i class="iconly-boldProfile" aria-hidden="true"></i>
                </Link>
              </li>
              <li class={`nav-item ${this.state.selected=== "categories"?"active":""}`}>
                <Link                 style={{paddingLeft:'0.9rem',paddingTop:'0.7rem'}}
  onClick={()=>{
                  this.setState({selected: 'categories'})
                }} class="nav-link icon_menu" to={basePath + "/categories"}>
                  <i class="bi bi-stack"></i>
                </Link>
              </li>
              <li class={`nav-item ${this.state.selected=== "webLogin"?"active":""}`}>
                <Link
                                style={{paddingLeft:'0.9rem',paddingTop:'0.7rem'}}

                 onClick={()=>{
                  this.setState({selected: 'webLogin'})
                }}
                  class="nav-link icon_menu "
                  to={basePath + "/cms/web-login-cms"}
                >
                  <i class="fa fa-globe"></i>
                </Link>
              </li>
              <li class={`nav-item ${this.state.selected=== "webFeed"?"active":""}`}>
                <Link
                                style={{paddingLeft:'0.9rem',paddingTop:'0.7rem'}}

                 onClick={()=>{
                  this.setState({selected: 'webFeed'})
                }}
                  class="nav-link icon_menu"
                  to={basePath + "/cms/web-feed-cms"}
                >
                  <i class="fa fa-tree" aria-hidden="true"></i>
                </Link>
              </li>
              {/* <li class="nav-item ">
						<Link class="nav-link icon_menu " to={basePath + "/cms/web-feed-cms"}><i class="fa fa-stop-circle-o" aria-hidden="true"></i>
						</Link>
					</li> */}
              <li class={`nav-item ${this.state.selected=== "appLogin"?"active":""}`}>
                <Link
                                style={{paddingLeft:'0.9rem',paddingTop:'0.7rem'}}

                 onClick={()=>{
                  this.setState({selected: 'appLogin'})
                }}
                  class="nav-link icon_menu "
                  to={basePath + "/cms/app-login-cms"}
                >
                  <i class="fa fa-mobile" aria-hidden="true"></i>
                </Link>
              </li>
              {/* <li class="nav-item ">
						<a class="nav-link icon_menu " href="/secure/pages/inbox"><i class="fa fa-envelope-o" aria-hidden="true"></i>
					</a>

					</li>
					<li class="nav-item ">
						<a class="nav-link icon_menu " href="/secure/pages/live"><i class="fa fa-globe" aria-hidden="true"></i>
					</a>

					</li>
					<li class="nav-item ">
						<a class="nav-link icon_menu " href="/secure/pages/shops/add"><i class="fa fa-plus" aria-hidden="true"></i>
					</a>

					</li>
					<li class="nav-item ">
						<a class="nav-link icon_menu  " href="/secure/pages/operators/add"><i class="fa fa-user-circle" aria-hidden="true"></i>
					</a>

					</li>
					<li class="nav-item ">
						<a class="nav-link icon_menu  " href="/secure/pages/tools/jackpot"><i class="fa fa-th-large" aria-hidden="true"></i>
					</a>
						<div class="sub_menu">
							<div class="sub_menu_inner">
								<h6>Marketing</h6>
								<div class="lender-with-cross">
									<ul>
										<li class="option"><a href="/secure/pages/tools/jackpot"><i class="fa fa-list" aria-hidden="true"></i> JackPot</a></li>
										<li class="option"><a href="/secure/pages/tools/rtp"><i class="fa fa-bullhorn" aria-hidden="true"></i> RTP</a></li>
									</ul>
								</div>
							</div>
						</div>
					</li>
					<li class="nav-item "><a class="nav-link icon_menu  " href="/secure/pages/users/profile"><i class="iconly-boldProfile"></i></a>

					</li>
					<li class="nav-item "><a class="nav-link icon_menu  " href="/secure/pages/faq"><i class="fa fa-question-circle" aria-hidden="true"> </i></a>

					</li> */}
            </ul>
          </nav>
          <div class="right_side">
            {/* <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
					<li class="nav-item dropdown me-3">
						<a class="nav-link active dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"> <i class="bi bi-bell bi-sub fs-4 text-gray-600"></i> </a>
						<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" style={{margin: "0px"}}>
							<li>
								<h6 class="dropdown-header">Notifications</h6>
							</li>
							<li><a class="dropdown-item">No notification available</a></li>
						</ul>
					</li>
				</ul> */}

            <div class="dropdown">
              <UncontrolledDropdown  style={{listStyleType: "none"}} nav>
                <DropdownToggle nav>
                  <Media className="align-items-center">
                  <div class="user-menu d-flex">
                  <div class="user-name text-end me-3">
                    <h6 class="mb-0 text-gray-600">{adminUser.name}</h6>
                  </div>
                  <div class="user-img d-flex align-items-center">
                    <div class="avatar avatar-md">
                      <img src={adminUser.image} alt="img" />
                    </div>
                  </div>
                </div>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("adminAuthToken");
                      localStorage.removeItem("adminUser");
                      window.location.href = "/";
                    }}
                  >
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </header>
        {/* <Navbar
          className="navbar-vertical fixed-left navbar-light bg-white"
          expand="md"
          id="sidenav-main"
        >
          <Container fluid> */}
            {/* Toggler */}
            {/* <button
              className="navbar-toggler"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-icon" />
            </button> */}
            {/* Brand */}

            {/* <NavbarBrand className="pt-0">
              <img
                className="navbar-brand-img"
                src={require("../../assets/img/logo.png")}
              />
            </NavbarBrand> */}

            {/* User */}
            {/* <Nav className="align-items-center d-md-none">
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={adminUser.image} />
                    </span>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("adminAuthToken");
                      localStorage.removeItem("adminUser");
                      window.location.href = "/";
                    }}
                  >
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav> */}
            {/* Collapse */}
            {/* <Collapse navbar isOpen={this.state.collapseOpen}> */}
              {/* Collapse header */}
              {/* <div className="navbar-collapse-header d-md-none">
                <Row>
                  {logo ? (
                    <Col className="collapse-brand" xs="6">
                      {logo.innerLink ? (
                        <Link to={logo.innerLink}>
                          <img src={require("../../assets/img/logo.png")} />
                        </Link>
                      ) : (
                        <a href={logo.outterLink}>
                          <img src={require("../../assets/img/logo.png")} />
                        </a>
                      )}
                    </Col>
                  ) : null}
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      type="button"
                      onClick={this.toggleCollapse}
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div> */}
              {/* Navigation */}
              {/* <Nav navbar>{this.createNavItem()}</Nav>
            </Collapse>
          </Container>
        </Navbar> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminUser: state.auth.adminUser,
  };
};
export default connect(mapStateToProps)(Sidebar);
