<template>
  <div class="good">
    <div>
      <button v-on:click="erase">リセット</button>
    </div>
    <div>UpperChill検索 0~1</div>
    <div>
      音楽的なポジティブさを表す0.0から1.0までのメジャー。価数の高いトラックはよりポジティブに聞こえ、価数の低いトラックはよりネガティブに聞こえます。
    </div>
    <div>
      <input type="text" v-model="inputText" />
      <button v-on:click="search">検索</button>
    </div>
    <div v-for="playlist in list" :key="playlist">
      {{ playlist.username }}
      <div v-for="song in playlist.songs" :key="song">
        <div>曲名：{{ song.name }}</div>
        <div>valence：{{ song.valence }}</div>
      </div>
      <div>----</div>
    </div>
    <div>アコースティック検索 0~1</div>
    <div>トラックが音響であるかどうか。高いほど音響がある可能性が高い。</div>
    <div>
      <input type="text" v-model="inputTextA" />
      <button v-on:click="searchA">検索</button>
    </div>
    <div v-for="playlistA in Alist" :key="playlistA">
      {{ playlistA.username }}
      <div v-for="song in playlistA.songs" :key="song">
        <div>曲名：{{ song.name }}</div>
        <div>acousticness：{{ song.acousticness }}</div>
      </div>
      <div>----</div>
    </div>
    <div>ボーカル検索 0~1</div>
    <div>
      トラックにボーカルが含まれていないかどうかの予測。高いほど可能性が高い。
    </div>
    <div>
      <input type="text" v-model="inputTextB" />
      <button v-on:click="searchB">検索</button>
    </div>
    <div v-for="playlistB in Blist" :key="playlistB">
      {{ playlistB.username }}
      <div v-for="song in playlistB.songs" :key="song">
        <div>曲名：{{ song.name }}</div>
        <div>instrumentalness：{{ song.instrumentalness }}</div>
      </div>
      <div>----</div>
    </div>
    <div>BPM検索 平均100くらい</div>
    <div>トラックの全体的な推定テンポ（ビート/分（BPM））。</div>
    <div>
      <input type="text" v-model="inputTextC" />
      <button v-on:click="searchC">検索</button>
    </div>
    <div v-for="playlistC in Clist" :key="playlistC">
      {{ playlistC.username }}
      <div v-for="song in playlistC.songs" :key="song">
        <div>曲名：{{ song.name }}</div>
        <div>BPM：{{ song.tempo }}</div>
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
    erase() {
      this.list.splice(0, this.list.length);
      this.Alist.splice(0, this.Alist.length);
      this.Blist.splice(0, this.Blist.length);
      this.Clist.splice(0, this.Clist.length);
    },

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
          .collection("playlist")
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
          for (let i = 0; i < this.Playlists[j].songs.length; i++) {
            let UC = this.Playlists[j].songs[i].valence;
            sumUC = sumUC + UC;
            k += 1;
          }
          console.log("計算：", sumUC / k);

          let UC = it + 0.1;
          let CU = UC - 0.2;

          console.log("UC:", UC);
          console.log("CU:", CU);

          if (sumUC / k < UC && CU < sumUC / k) {
            this.list.push({ ...this.Playlists[j] });
          }
        }
        this.Playlists.splice(0, this.Playlists.length);
      }
      console.log("list", this.list);
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
          .collection("playlist")
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
          for (let i = 0; i < this.Playlists[j].songs.length; i++) {
            let UC = this.Playlists[j].songs[i].acousticness;
            sumUC = sumUC + UC;
            k += 1;
          }
          console.log("計算：", sumUC / k);

          let UC = it + 0.1;
          let CU = UC - 0.2;

          console.log("UC:", UC);
          console.log("CU:", CU);

          if (sumUC / k < UC && CU < sumUC / k) {
            this.Alist.push({ ...this.Playlists[j] });
          }
        }
        this.Playlists.splice(0, this.Playlists.length);
      }
      console.log("Alist", this.Alist);
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
          .collection("playlist")
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
          for (let i = 0; i < this.Playlists[j].songs.length; i++) {
            let UC = this.Playlists[j].songs[i].instrumentalness;
            sumUC = sumUC + UC;
            k += 1;
          }
          console.log("計算：", sumUC / k);

          let UC = it + 0.1;
          let CU = UC - 0.2;

          console.log("UC:", UC);
          console.log("CU:", CU);

          if (sumUC / k < UC && CU < sumUC / k) {
            this.Blist.push({ ...this.Playlists[j] });
          }
        }
        this.Playlists.splice(0, this.Playlists.length);
      }
      console.log("Blist", this.Blist);
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
          .collection("playlist")
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
          for (let i = 0; i < this.Playlists[j].songs.length; i++) {
            let UC = this.Playlists[j].songs[i].tempo;
            sumUC = sumUC + UC;
            k += 1;
          }
          console.log("計算：", sumUC / k);

          let UC = it + 15;
          let CU = it - 15;

          console.log("UC:", UC);
          console.log("CU:", CU);

          if (sumUC / k < UC && CU < sumUC / k) {
            this.Clist.push({ ...this.Playlists[j] });
          }
        }
        this.Playlists.splice(0, this.Playlists.length);
      }
      console.log("Clist", this.Clist);
    },
  },
};
</script>
