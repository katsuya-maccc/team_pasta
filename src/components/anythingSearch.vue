<template>
  <div class="good">
    <div>
      UpperChill検索 0~1
    </div>
    <div>
      音楽的なポジティブさを表す0.0から1.0までのメジャー。価数の高いトラックはよりポジティブに聞こえ、価数の低いトラックはよりネガティブに聞こえます。
    </div>
    <div>
      <input type="text" v-model="inputText" />
      <button v-on:click="search">検索</button>
    </div>
    <div v-for="playlist in list" :key="playlist">
      {{ playlist[0].username }}
      <div v-for="music in playlist" :key="music">
        <div>曲名：{{ music.musicName }}</div>
        <div>valence：{{ music.valence }}</div>
      </div>
      <div>----</div>
    </div>
    <div>
      アコースティック検索 0~1
    </div>
    <div>
      トラックが音響であるかどうか。高いほど音響がある可能性が高い。
    </div>
    <div>
      <input type="text" v-model="inputTextA" />
      <button v-on:click="searchA">検索</button>
    </div>
    <div v-for="playlistA in Alist" :key="playlistA">
      {{ playlistA[0].username }}
      <div v-for="music in playlistA" :key="music">
        <div>曲名：{{ music.musicName }}</div>
        <div>acousticness：{{ music.acousticness }}</div>
      </div>
      <div>----</div>
    </div>
    <div>
      ボーカル検索 0~1
    </div>
    <div>
      トラックにボーカルが含まれていないかどうかの予測。高いほど可能性が高い。
    </div>
    <div>
      <input type="text" v-model="inputTextB" />
      <button v-on:click="searchB">検索</button>
    </div>
    <div v-for="playlistB in Blist" :key="playlistB">
      {{ playlistB[0].username }}
      <div v-for="music in playlistB" :key="music">
        <div>曲名：{{ music.musicName }}</div>
        <div>instrumentalness：{{ music.instrumentalness }}</div>
      </div>
      <div>----</div>
    </div>
    <div>
      BPM検索 平均100くらい
    </div>
    <div>
      トラックの全体的な推定テンポ（ビート/分（BPM））。
    </div>
    <div>
      <input type="text" v-model="inputTextC" />
      <button v-on:click="searchC">検索</button>
    </div>
    <div v-for="playlistC in Clist" :key="playlistC">
      {{ playlistC[0].username }}
      <div v-for="music in playlistC" :key="music">
        <div>曲名：{{ music.musicName }}</div>
        <div>BPM：{{ music.bpm }}</div>
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
      Users: [],
      Playlists: [],
      list: [],
      Alist: [],
      Blist: [],
      Clist: [],
    };
  },
  methods: {
    async search() {
      this.Users.splice(0, this.Users.length);
      const db = firebase.firestore();
      const snapshot = await db.collection("users").get();
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.Users.push({
          docid: doc.id,
          ...doc.data(),
        });
      });

      console.log("Users:", this.Users);

      let it = Number(this.inputText);

      for (let i = 0; i < this.Users.length; i++) {
        const pid = this.Users[i].docid;
        const db = firebase.firestore();
        const snapshot = await db
          .collection("users")
          .doc(pid)
          .collection("Playlist")
          .get();
        snapshot.forEach((doc) => {
          this.Playlists.push({
            username: this.Users[i].name,
            docid: doc.id,
            ...doc.data(),
          });
        });
        console.log("Playlists:", this.Playlists);
        let k = 0;
        let sumUC = 0;
        for (let j = 0; j < this.Playlists.length; j++) {
          let UC = this.Playlists[j].valence;
          sumUC = sumUC + UC;
          k += 1;
        }
        console.log("計算：", sumUC / k);

        let UC = it + 0.1;

        let CU = UC - 0.2;

        console.log("UC:", UC);
        console.log("CU:", CU);

        if (sumUC / k < UC && CU < sumUC / k) {
          console.log("if可");
          this.list.push({ ...this.Playlists });
        }
        this.Playlists.splice(0, this.Playlists.length);
      }
    },

    async searchA() {
      this.Users.splice(0, this.Users.length);
      const db = firebase.firestore();
      const snapshot = await db.collection("users").get();
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.Users.push({
          docid: doc.id,
          ...doc.data(),
        });
      });

      console.log("Users:", this.Users);

      let it = Number(this.inputTextA);

      for (let i = 0; i < this.Users.length; i++) {
        const pid = this.Users[i].docid;
        const db = firebase.firestore();
        const snapshot = await db
          .collection("users")
          .doc(pid)
          .collection("Playlist")
          .get();
        snapshot.forEach((doc) => {
          this.Playlists.push({
            username: this.Users[i].name,
            docid: doc.id,
            ...doc.data(),
          });
        });
        console.log("Playlists:", this.Playlists);
        let k = 0;
        let sumUC = 0;
        for (let j = 0; j < this.Playlists.length; j++) {
          let UC = this.Playlists[j].acousticness;
          sumUC = sumUC + UC;
          k += 1;
        }
        console.log("計算：", sumUC / k);

        let UC = it + 0.1;

        let CU = UC - 0.2;

        console.log("UC:", UC);
        console.log("CU:", CU);

        if (sumUC / k < UC && CU < sumUC / k) {
          console.log("if可");
          this.Alist.push({ ...this.Playlists });
        }
        this.Playlists.splice(0, this.Playlists.length);
      }
    },

    async searchB() {
      this.Users.splice(0, this.Users.length);
      const db = firebase.firestore();
      const snapshot = await db.collection("users").get();
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.Users.push({
          docid: doc.id,
          ...doc.data(),
        });
      });

      console.log("Users:", this.Users);

      let it = Number(this.inputTextB);

      for (let i = 0; i < this.Users.length; i++) {
        const pid = this.Users[i].docid;
        const db = firebase.firestore();
        const snapshot = await db
          .collection("users")
          .doc(pid)
          .collection("Playlist")
          .get();
        snapshot.forEach((doc) => {
          this.Playlists.push({
            username: this.Users[i].name,
            docid: doc.id,
            ...doc.data(),
          });
        });
        console.log("Playlists:", this.Playlists);
        let k = 0;
        let sumUC = 0;
        for (let j = 0; j < this.Playlists.length; j++) {
          let UC = this.Playlists[j].instrumentalness;
          sumUC = sumUC + UC;
          k += 1;
        }
        console.log("計算：", sumUC / k);

        let UC = it + 0.1;

        let CU = UC - 0.2;

        console.log("UC:", UC);
        console.log("CU:", CU);

        if (sumUC / k < UC && CU < sumUC / k) {
          console.log("if可");
          this.Blist.push({ ...this.Playlists });
        }
        this.Playlists.splice(0, this.Playlists.length);
      }
    },

    async searchC() {
      this.Users.splice(0, this.Users.length);
      const db = firebase.firestore();
      const snapshot = await db.collection("users").get();
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.Users.push({
          docid: doc.id,
          ...doc.data(),
        });
      });

      console.log("Users:", this.Users);

      let it = Number(this.inputTextC);

      for (let i = 0; i < this.Users.length; i++) {
        const pid = this.Users[i].docid;
        const db = firebase.firestore();
        const snapshot = await db
          .collection("users")
          .doc(pid)
          .collection("Playlist")
          .get();
        snapshot.forEach((doc) => {
          this.Playlists.push({
            username: this.Users[i].name,
            docid: doc.id,
            ...doc.data(),
          });
        });
        console.log("Playlists:", this.Playlists);
        let k = 0;
        let sumUC = 0;
        for (let j = 0; j < this.Playlists.length; j++) {
          let UC = this.Playlists[j].bpm;
          sumUC = sumUC + UC;
          k += 1;
        }
        console.log("計算：", sumUC / k);

        let UC = it + 15;
        let CU = it - 15;

        console.log("UC:", UC);
        console.log("CU:", CU);

        if (sumUC / k < UC && CU < sumUC / k) {
          console.log("if可");
          this.Clist.push({ ...this.Playlists });
        }
        this.Playlists.splice(0, this.Playlists.length);
      }
    },
  },
};
</script>
