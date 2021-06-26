import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import MyPage from "../views/MyPage.vue";
import Osusume from "../components/osusumeSearch.vue";
import Playlist from "../components/anythingSearch.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/osusume",
    name: "Osusume",
    component: Osusume,
  },
  {
    path: "/playlist",
    name: "playlist",
    component: Playlist,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
