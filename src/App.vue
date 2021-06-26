<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/createPlaylist">Create Playlist</router-link> |
      <router-link to="/playlist">Display Playlist</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  background-color: rgb(34, 34, 34);

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
