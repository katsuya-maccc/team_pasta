<template>
  <div class="osusume">
    <p>ユーザー名を入力</p>
    <div>
      <input type="text" v-model="inputText" />
      <button v-on:click="getMyinfo">ログイン</button>
    </div>
    <div>----</div>
    <button v-on:click="osusumeSearch">探す</button>
    <div>----</div>
    <div v-for="user in osusumeUsers2" :key="user">
      <div>ユーザー名：{{ user.name }}</div>
      <div>お気に入りアーティスト：{{ user.likeArtist }}</div>
      <div><button v-on:click="goodPlus">いいね！</button></div>
      <div>----</div>
    </div>
    <div>
      ----
    </div>
    <div>
      <button>アカウントを探しに行く！</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      //１段階目()
      osusumeUsers: [
        /*{
          likeArtist: "",
          name: "",
          numberLikes: "",
          id: "",
          category: ""
        }*/
      ],
      //最終的な出力
      osusumeUsers2: [
        /*{
          likeArtist: "",
          name: "",
          numberLikes: "",
          id: "",
          category: ""
        }*/
      ],
      myinfo: [],
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
    async osusumeSearch() {
      const db = firebase.firestore();
      //document取得
      /*const doc = await db
        .collection("users")
        .doc("ExsalyVN0ZAcId6RC037")
        .get();

      console.log("data:", doc.data());
      console.log("search");
      */
      //collection取得
      const snapshot = await db
        .collection("users")
        //.where("category", "==", this.inputText)
        //.limit(5)
        //where,limitをいいね数で制限することが可能
        .get();
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
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
    },
    async goodPlus() {
      console.log("いいねしました！");
      console.log("user:", this.user);
      /* const db = firebase.firestore();
      let goodnumber = this.user.numberLikes;
      (goodnumber += 1),
        await db
          .collection("users")
          .doc(this.user.docid)
          .update({
            numberLikes: goodnumber,
          });
      this.user.numberLikes = goodnumber;
      console.log("user:", this.user);*/
    },
  },
};
</script>
