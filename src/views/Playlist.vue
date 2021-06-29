<template>
  <div id="app">
    <div id="theme">
      <h2>みんなのプレイリストを見てみよう</h2>
    </div>
    <div><button v-on:click="getDb">コンソール用</button></div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    getDb() {
      firebase
        .firestore()
        .collection("users")
        .doc("uid")
        .collection("playlist")
        .get()
        .then(function (getSongsData) {
          getSongsData.forEach(function (songData) {
            console.log(songData.id, " => ", songData.data());
            let songDataChangeJson = JSON.stringify(songData.data());
            localStorage.setItem("songsData", songDataChangeJson);
          });
        });
    },
  },
};
</script>

<style scoped>
#app {
  background-color: rgb(45, 45, 45);
  height: 100vh;
}

#theme {
  color: aliceblue;
  padding: 1%;
}
</style>
