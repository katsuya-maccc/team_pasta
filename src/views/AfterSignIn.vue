<template>
  <div>
    <h1>After Sign In Page</h1>
    <UserProfile />
    <h2>What kind of music do you like?</h2>
    <p>(Select only one)</p>
    <ul>
      <button @click="favJpop">J-pop</button
      ><button @click="favRock">Rock</button
      ><button @click="favJazz">Jazz</button>
    </ul>
    <ul>
      <button @click="favKpop">K-pop</button
      ><button @click="favClassic">Classic</button
      ><button @click="favHipHop">Hip-Hop</button>
    </ul>
    <ul>
      <button @click="favAnime">Anime</button
      ><button @click="favDance">Dance</button
      ><button @click="favRB">R&B</button>
    </ul>
    <ul>
      Chill
      <input
        @input="sendUV"
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="userValence"
      />
      Upper
    </ul>
    <ul>
      Not Acoustic
      <input
        @input="sendUA"
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="userAcousticness"
      />
      Acoustic
    </ul>
    <ul>
      Vocal
      <input
        @input="sendUI"
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="userInstrumentalness"
      />
      Instrumental
    </ul>
    <ul>
      Low BPM
      <input
        class="userBpm"
        @input="sendUB"
        type="range"
        min="0"
        max="200"
        step="1"
        v-model="userBpm"
      />
      High BPM
    </ul>
    <div id="h4-container">
      <div id="h4-subcontainer"></div>
    </div>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      userValence: 0.5,
      userAcousticness: 0.5,
      userInstrumentalness: 0.5,
      userBpm: 150,
    };
  },
  components: {
    UserProfile,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    favJpop() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "J-pop",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "J-pop",
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    favRock() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Rock",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Rock",
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    favJazz() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Jazz",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Jazz",
        userValence: this.userValence,
        serAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    favKpop() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "K-pop",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "K-pop",
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    favClassic() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Classic",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Classic",
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    favHipHop() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Hip-Hop",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Hip-Hop",
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    favAnime() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Anime",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Anime",
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    favDance() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Dance",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "Dance",
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    favRB() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "R&B",
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: "R&B",
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    sendUV() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: this.user.category,
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: this.user.category,
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    sendUA() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: this.user.category,
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: this.user.category,
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    sendUI() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: this.user.category,
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: this.user.category,
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
    sendUB() {
      this.$store.commit("setUser", {
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: this.user.category,
        userValence: this.user.userValence,
        userAcousticness: this.user.userAcousticness,
        userInstrumentalness: this.user.userInstrumentalness,
        userBpm: this.user.userBpm,
      });
      firebase.firestore().collection("users").doc(this.user.uid).set({
        id: this.user.uid,
        name: this.user.displayName,
        UserImage: this.user.photoURL,
        category: this.user.category,
        userValence: this.userValence,
        userAcousticness: this.userAcousticness,
        userInstrumentalness: this.userInstrumentalness,
        userBpm: this.userBpm,
      });
    },
  },
};
</script>

<style scoped>
input[type="range"] {
  outline: 0;
  border: 0;
  border-radius: 500px;
  width: 400px;
  max-width: 100%;
  margin: 24px 0 16px;
  transition: box-shadow 0.2s ease-in-out;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  html input[type="range"] {
    overflow: hidden;
    height: 40px;
    -webkit-appearance: none;
    background-color: #ddd;
  }
  html input[type="range"]::-webkit-slider-runnable-track {
    height: 40px;
    -webkit-appearance: none;
    color: #444;
    -webkit-transition: box-shadow 0.2s ease-in-out;
    transition: box-shadow 0.2s ease-in-out;
  }
  html input[type="range"]::-webkit-slider-thumb {
    width: 40px;
    -webkit-appearance: none;
    height: 40px;
    cursor: ew-resize;
    background: #fff;
    box-shadow: -340px 0 0 320px #1597ff, inset 0 0 0 40px #1597ff;
    border-radius: 50%;
    -webkit-transition: box-shadow 0.2s ease-in-out;
    transition: box-shadow 0.2s ease-in-out;
    position: relative;
  }
  html input[type="range"]:active::-webkit-slider-thumb {
    background: #fff;
    box-shadow: -340px 0 0 320px #1597ff, inset 0 0 0 3px #1597ff;
  }
}
html input[type="range"]::-moz-range-progress {
  background-color: #43e5f7;
}
html input[type="range"]::-moz-range-track {
  background-color: #9a905d;
}
html input[type="range"]::-ms-fill-lower {
  background-color: #43e5f7;
}
html input[type="range"]::-ms-fill-upper {
  background-color: #9a905d;
}

#h4-container {
  width: 400px;
  max-width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
}
#h4-container #h4-subcontainer {
  width: 100%;
  position: relative;
}
#h4-container #h4-subcontainer h4 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 40px;
  height: 40px;
  color: #fff !important;
  font-size: 12px;
  transform-origin: center -10px;
  transform: translateX(-50%);
  transition: margin-top 0.15s ease-in-out, opacity 0.15s ease-in-out;
}
#h4-container #h4-subcontainer h4 span {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #1597ff;
  border-radius: 0 50% 50% 50%;
  transform: rotate(45deg);
  z-index: -1;
}

input:not(:active) + #h4-container h4 {
  opacity: 0;
  margin-top: -50px;
  pointer-events: none;
}

button {
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 50px;
  position: relative;
  background: #228bc8;
  border: 1px solid #228bc8;
  border-radius: 30px;
  box-sizing: border-box;
  padding: 0 45px 0 25px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.1em;
  line-height: 1.3;
  text-align: center;
  text-decoration: none;
  transition-duration: 0.3s;
}
button:before {
  content: "";
  width: 8px;
  height: 8px;
  border: 0;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  right: 25px;
  margin-top: -6px;
}
button:hover {
  background: #fff;
  color: #228bc8;
}
:hover:before {
  border-top: 2px solid #228bc8;
  border-right: 2px solid #228bc8;
}
</style>
