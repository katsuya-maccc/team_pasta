<template>
  <div>
    <osusumeSearch />
    <div>
      --以下いいね機能--
    </div>
    <good />
  </div>
</template>

<script>
import osusumeSearch from "@/components/osusumeSearch.vue";
import good from "@/components/good.vue";

export default {
  components: {
    osusumeSearch,
    good,
  },
};
</script>
