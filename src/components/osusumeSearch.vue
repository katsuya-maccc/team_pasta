<template>
  <div class="osusume">
    自分のユーザー名を入力
    <div>
      <input type="text" v-model="inputText" />
      <button v-on:click="getMyinfo">ログイン</button>
    </div>
    <div>----</div>
    <div>
      <button v-on:click="search">おすすめユーザーを探す</button>
    </div>
    <div v-for="user in Playlist" :key="user">
      <div>ユーザー名：{{ user[0].username }}</div>
      <div>お気に入りアーティスト：{{ user[0].likeArtist }}</div>
      <div>--Playlist--</div>
      <div v-for="playlist in user" :key="playlist">
        <div>曲名：{{ playlist.musicName }}</div>
        <div>{{ playlist.artist }}</div>
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
      Playlists: [],
      Playlist: [],
    };
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

      for (let i = 0; i < this.osusumeUsers.length; i++) {
        if (this.osusumeUsers[i].id != this.myinfo[0].id) {
          if (this.osusumeUsers[i].category == this.myinfo[0].category) {
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
        console.log(pid);
        const db = firebase.firestore();
        const snapshot = await db
          .collection("users")
          .doc(pid)
          .collection("Playlist")
          .get();
        snapshot.forEach((doc) => {
          this.Playlists.push({
            username: this.osusumeUsers2[i].name,
            likeArtist: this.osusumeUsers2[i].likeArtist,
            docid: doc.id,
            ...doc.data(),
          });
        });
        this.Playlist.push({ ...this.Playlists });
        console.log("Playlist:", this.Playlist);
        this.Playlists.splice(0, this.Playlists.length);
      }
    },
  },
};
</script>
