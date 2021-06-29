<template>
  <div>
    <div class="signed-in-user-profile" v-if="user">
      <div>id : {{ user.uid }}</div>
      <div>name : {{ user.displayName }}</div>
      <br /><br />
      <div class="signed-in-user-profile__photo">
        <img
          v-bind:src="
            user.photoURL ? user.photoURL : 'https://via.placeholder.com/150'
          "
        />
      </div>
    </div>
    <div v-else>No User Signed In</div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.signed-in-user-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signed-in-user-profile__photo {
  height: 10rem;
}
.signed-in-user-profile__photo img {
  border-radius: 50%;
  height: 100%;
  object-fit: contain;
  border: 4px solid #ffffff;
  animation: fuwafuwa 2s infinite ease-in-out;
}

@keyframes fuwafuwa {
  0% {
    taransform: translate(0, 0);
  }
  50% {
    transform: translate(0, -20px);
  }
  100% {
    tarnsform: translate(0, 0);
  }
}
</style>
