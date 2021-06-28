<template>
  <div class="osusume">
    <div>
      <button v-on:click="search">おすすめユーザーを探す</button>
    </div>
    <div v-for="Playlist in Playlists" :key="Playlist">
      <div>ユーザー名：{{ Playlist.username }}</div>
      <div>--Playlist--</div>
      <div v-for="song in Playlist.songs" :key="song">
        <div>曲名：{{ song.name }}</div>
        <div>アーティスト名：{{ song.artistName }}</div>
      </div>
      <div>----</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      osusumeUsers: [],
      osusumeUsers2: [],
      myinfo: [],
      playlistsID: [],
      Playlists: [],
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    async getMyinfo() {
      const db = firebase.firestore();
      const snapshot = await db
        .collection("users")
        .where("name", "==", this.inputText)
        .get();
      snapshot.forEach((doc) => {
        this.myinfo.push({
          docid: doc.id,
          ...doc.data(),
        });
        console.log("ログイン完了");
        console.log(this.myinfo);
      });
    },

    async search() {
      const db = firebase.firestore();
      const snapshot = await db.collection("users").get();
      snapshot.forEach((doc) => {
        this.osusumeUsers.push({
          docid: doc.id,
          ...doc.data(),
        });
      });
      console.log(this.user);
      for (let i = 0; i < this.osusumeUsers.length; i++) {
        if (this.osusumeUsers[i].id != this.user.uid) {
          if (this.osusumeUsers[i].category == this.user.category) {
            this.osusumeUsers2.push({
              name: this.osusumeUsers[i].name,
              likeArtist: this.osusumeUsers[i].likeArtist,
              docid: this.osusumeUsers[i].docid,
              numberLikes: this.osusumeUsers[i].numberLikes,
            });
          }
        }
      }
      console.log("!!:", this.osusumeUsers2);

      for (let i = 0; i < this.osusumeUsers2.length; i++) {
        const pid = this.osusumeUsers2[i].docid;
        const db = firebase.firestore();
        const snapshot = await db
          .collection("users")
          .doc(pid)
          .collection("playlist")
          .get();
        snapshot.forEach((doc) => {
          this.playlistsID.push({
            username: this.osusumeUsers2[i].name,
            likeArtist: this.osusumeUsers2[i].likeArtist,
            docid: doc.id,
            ...doc.data(),
          });
          console.log("ID", this.playlistsID);
        });
      }

      this.Playlists.push(...this.playlistsID);
      console.log("Playlists:", this.Playlists);
      this.playlistsID.splice(0, this.playlistsID.length);
    },
  },
};
</script>
