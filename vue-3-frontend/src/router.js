import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue");
const BoardAdmin = () => import("./components/BoardAdmin.vue");
const BoardModerator = () => import("./components/BoardModerator.vue");
const BoardUser = () => import("./components/BoardUser.vue");
const BoardUserEdit = () => import("./components/pages/admin/PageUserEdit.vue");
const AdminLayout = () => import("./components/pages/admin/PageLayout.vue");
const FlowSpec = () => import("./components/pages/user/FlowSpec.vue");
const FlowSpecLayout = () =>
  import("./components/pages/user/FlowSpecLayout.vue");
const FlowSpecCreate = () => import("./components/pages/user/FlowSpecAdd.vue");
const FlowSpecEdit = () => import("./components/pages/user/FlowSpecEdit.vue");
const Welcome = () => import("./components/Welcome.vue");
const PasswordReset = () => import("./components/PasswordReset.vue");
const PasswordResetInput = () => import("./components/PasswordResetInput.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/passwordReset",
    name: "passwordReset",
    component: PasswordReset,
  },
  {
    path: "/passwordResetInput/:confirmationCode",
    name: "passwordResetInput",
    component: PasswordResetInput,
  },
  {
    path: "/confirm/:confirmationCode",
    name: "welcome",
    component: Welcome,
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "admin",
        component: BoardAdmin,
      },
      {
        path: "user/edit/:id",
        name: "BoardUserEdit",
        component: BoardUserEdit,
      },
    ],
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/flowspec",
    component: FlowSpecLayout,
    children: [
      {
        path: "",
        name: "rule",
        component: FlowSpec,
      },
      {
        path: "create",
        name: "flowspecCreate",
        component: FlowSpecCreate,
      },
      {
        path: "edit/:id",
        name: "flowspecEdit",
        component: FlowSpecEdit,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.beforeEach((to, from, next) => {
//   const publicPages = [
//     "/login",
//     "/register",
//     "/home",
//     "/passwordReset",
//     "/confirm",
//     "/welcome",
//     "/passwordResetInput",
//   ];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next("/login");
//   } else {
//     next();
//   }
// });
export default router;
