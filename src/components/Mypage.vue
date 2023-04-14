<!-- composition API 사용 -->

<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input @input="search" placeholder="🔍" class="search"/>
    <div v-for="follow in follower" :key="follow" class="post-header">
      <div
        class="profile"
        :style="{ backgroundImage: `url(${follow.image})` }"
      ></div>
      <span class="profile-name">{{ follow.name }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  name: "mypage",
  props: {
    one: Number,
  },
  setup(props) {
    let follower = ref([]);
    let followerCopy = ref([]);

    onMounted(() => {
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
        followerCopy.value = a.data;
      });
    });
    function search(e) {
      const searchText = e.target.value;
      const searchResult = follower.value.filter(
        (data) => data.name.includes(searchText) == true
      );
      follower.value = searchResult;
      if (searchText.length === 0) {
        follower.value = followerCopy.value;
      }
    }
    return { follower, search };
  },
};
</script>

<style></style>
