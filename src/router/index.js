import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Osusume from "../components/osusumeSearch.vue";
import Playlist from "../components/anythingSearch.vue";
import BeforeSignIn from "@/views/BeforeSignIn.vue";
import AfterSignIn from "@/views/AfterSignIn.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
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
  {
    path: "/createPlaylist",
    name: "createPlaylist",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: () => import("../views/Playlist.vue"),
  },
  {
    path: "/",
    redirect: "/BeforeSignIn",
  },
  {
    path: "/BeforeSignIn",
    name: "BeforeSignIn",
    component: BeforeSignIn,
  },
  {
    path: "/AfterSignIn",
    name: "AfterSignIn",
    component: AfterSignIn,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const isSignedIn = () => {
  return store.getters.isSignedIn;
};

router.beforeEach((to, from, next) => {
  if (to.name !== "BeforeSignIn" && !isSignedIn()) {
    next("/BeforeSignIn");
  } else {
    next();
  }
});

export default router;
