import { lazy } from "react";

const Dashboard = lazy(() => import("./views/Dashboard"));

/// Users
const Users = lazy(() => import("./pages/Users"));
const AddUser = lazy(() => import("./pages/users/AddUser"));
const EditUser = lazy(() => import("./pages/users/EditUser"));

//Categories
const Categories = lazy(() => import("./pages/categories/Categories"));
const AddCategory = lazy(() => import("./pages/categories/AddCategory"));
const EditCategory = lazy(() => import("./pages/categories/EditCategory"));
const LoginCMS = lazy(() => import("./pages/cms/LoginCMS"));
const AppLoginCMS = lazy(() => import("./pages/cms/AppLoginCMS"));
const WebFeedScreenCMS = lazy(() => import("./pages/cms/WebFeedScreenCMS"));

export const authenticatedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //users
  { path: "/users/add", component: AddUser },
  { path: "/users/:_id", component: EditUser },
  { path: "/users", component: Users },
  //categories
  { path: "/categories/add", component: AddCategory },
  { path: "/categories/:_id", component: EditCategory },
  { path: "/categories", component: Categories },
  { path: "/cms/web-login-cms", component: LoginCMS },
  { path: "/cms/app-login-cms", component: AppLoginCMS },
  { path: "/cms/web-feed-cms", component: WebFeedScreenCMS },
];
