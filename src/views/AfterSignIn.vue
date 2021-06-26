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
        @input="sendUB"
        type="range"
        min="0"
        max="200"
        step="1"
        v-model="userBpm"
      />
      High BPM
    </ul>
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

<style scoped></style>
