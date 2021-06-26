<template>
  <div class="good">
    <input type="text" v-model="inputText" />
    <button v-on:click="searchA">ユーザー検索</button>
    <div v-for="user in showUser" :key="user">
      <div>ユーザー名：{{ user.name }}</div>
      <div>お気に入りアーティスト：{{ user.likeArtist }}</div>
      <div><button v-on:click="goodPlus">いいね！</button></div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

export default{
    data() {
        return{
            showUsers:[],
            showUser:[],
        }
    },
    methods: {
        async searchA(){
            const db = firebase.firestore();
            const snapshot = await db
            .collection("users")
            .get();
            snapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());
                this.showUsers.push({
                docid: doc.id,
                ...doc.data(),
                });
            });
            for (let i = 0; i < this.showUsers.length; i++) {
                if (this.showUsers[i].name == this.inputText) {
                    this.showUser = this.showUsers[i]
                }
            }
        },
       async goodPlus() {
        console.log("いいねしました！");
        const db = firebase.firestore();
        let goodnumber = this.showUser.numberLikes;
        console.log(goodnumber),
        (goodnumber += 1),
        console.log(goodnumber),
            await db
            .collection("users")
            .doc(this.showUser.docid)
            .update({
                numberLikes: goodnumber,
            });
        //console.log("user:", this.user);
    },
    }
}