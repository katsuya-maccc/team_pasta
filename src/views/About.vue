<template>
  <div id="app">
    <section id="theme">
      <h1>自分だけのプレイリストを作ろう</h1>
    </section>
    <div id="search-input-container">
      <input
        class="search-input"
        type="text"
        v-model="inputText"
        placeholder="アーティスト名や曲名を検索"
        @keydown.enter="search"
      />
      <button class="search-button" v-on:click="search">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div id="result-container">
      <div
        v-for="(result, index) in results"
        v-bind:key="`result:${index}`"
        class="search-result"
        v-on:click="select(index)"
        :class="{ active: result.isChecked }"
      >
        <div :class="{ checkIconHidden: !result.isChecked }">
          <i class="fas fa-check"></i>
        </div>
        <img
          id="songs-img"
          v-bind:src="result.album.images[0].url"
          alt="photo"
        />
        <div class="songs-detail">{{ result.name }}</div>
        <div class="songs-detail">{{ result.artists[0].name }}</div>
        <div>
          <a v-bind:href="result.external_urls.spotify" target="_blank"
            >聞いてみる
          </a>
        </div>
      </div>
    </div>
    <div>プレイリストに入る曲のデータ:{{ selectSongs }}</div>
    <div>
      <button v-on:click="postSlectedSong">firebaseに保存</button>
    </div>
  </div>
</template>

<script>
import { functions } from "@/firebase";
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
      inputText: "",
      results: [],
      resultFeature: [],
    };
  },
  computed: {
    selectSongs() {
      const selectedSongs = [];
      for (let result of this.results) {
        if (result.isChecked) {
          selectedSongs.push({
            name: result.name,
            id: result.id,
            imageUrl: result.album.images[0].url,
            valence: result.valence,
            acousticness: result.acousticness,
            instrumentalness: result.instrumentalness,
            tempo: result.tempo,
            artistName: result.artists[0].name,
          });
        }
      }
      return selectedSongs;
    },
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    async search() {
      const searchSpotify = functions.httpsCallable("searchSpotify");
      const resSearchSpotify = await searchSpotify(this.inputText);
      const items = resSearchSpotify.data.body?.tracks?.items;
      console.log(items);
      if (items) {
        this.results = [];
        for (let item of items) {
          this.results.push({
            isChecked: false,
            ...(await this.getAudioFeatures(item.id)),
            ...item,
          });
        }
        console.log(this.results);
      }
    },

    select(i) {
      if (this.results[i].isChecked === true) {
        this.results[i].isChecked = false;
      } else {
        this.results[i].isChecked = true;
      }
    },

    async postSlectedSong() {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .collection("playlist")
        .add({ songs: this.selectSongs });
      for (let result of this.results) {
        result.isChecked = false;
      }
    },
    async getAudioFeatures(songId) {
      const getAudioFeatures = functions.httpsCallable("getAudioFeatures");
      const resGetAudioFeatures = await getAudioFeatures(songId);
      this.resultFeature = resGetAudioFeatures.data?.body;
      return this.resultFeature;
    },
  },
};
</script>
<style scoped>
@import "https://use.fontawesome.com/releases/v5.15.3/css/all.css";
a {
  color: rgb(10, 107, 192);
}
#app {
  background-color: rgb(45, 45, 45);
  height: 100vh;
}

#theme {
  color: aliceblue;
  padding: 1%;
}

.checkIconHidden {
  visibility: hidden;
}

.search-result {
  height: 32.5%;
  width: 32.5vh;
  margin: 0.5%;
  padding: 2%;
  color: aliceblue;
}

.active {
  background-color: #1853ada9;
  border-radius: 10px;
}

.search-result:hover {
  background-color: #1853ada9;
  border-radius: 10px;
  transition: 0.5s;
}

#result-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

#songs-img {
  height: 32.5vh;
  max-width: 32.5vh;
}
.search-input {
  border: 1px solid #999;
  padding: 3px 5px;
  border-radius: 20px;
  height: 2em;
  width: 245px;
  overflow: hidden;
}
.search-input:focus {
  outline: 0;
}
.search-button {
  cursor: pointer;
  font-size: 1.3em;
  border: none;
  background: none;
  color: #3879d9;
  outline: none;
  display: inline-block;
  vertical-align: middle;
}
#search-input-container {
  height: 7%;
}
.songs-detail {
  width: 100%;
  height: 3vh;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
