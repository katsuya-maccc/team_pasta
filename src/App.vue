<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/BeforeSignIn">Before Sign In Page</router-link> |
      <router-link to="/AfterSignIn">After Sign In Page</router-link> |
      <router-link to="/createPlaylist">Create Playlist</router-link> |
      <router-link to="/playlist">Display Playlist</router-link> |
      <router-link to="/osusume">osusume</router-link> |
      <router-link to="/playlist">playlist</router-link>
    </div>
    <div class="sign-in">
      <span @click="signIn">Sign In</span>
      <span @click="signOut">Sign Out</span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    signIn() {
      this.$store.dispatch("signInWithGoogle");
    },
    signOut() {
      this.$store.dispatch("signOut");
    },
  },
};
</script>

<style>
body {
  background-color: rgb(34, 34, 34);
  color: aliceblue;
  font-family: "MS Pゴシック", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: rgb(104, 104, 246);
}
</style>
