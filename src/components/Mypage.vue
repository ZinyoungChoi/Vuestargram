<!-- composition API 사용 -->

<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="🔍" />
    <div v-for="follow in follower" :key="follow" class="post-header">
      <div class="profile" :style="{backgroundImage : `url(${follow.image})`}"></div>
      <span class="profile-name">{{ follow.name }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  name: "mypage",
  setup() {
    let follower = ref([]);

    onMounted(() => {
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
      });
    });

    return { follower };
  },
};
</script>

<style></style>
