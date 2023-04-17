<!-- composition API 사용 -->

<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input @input="search" placeholder="🔍" class="search" />
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
  setup(props) { //props = 1
    let follower = ref([]);
    let followerCopy = ref([]);

    onMounted(() => {
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
        followerCopy.value = a.data;
      });
    });
    /*검색기능 
    기준값.match(new RegExp(입력값 , "플래그")
    ->정규표현식으로 문자열에서 특정내용을 찾거나 대체 또는 발췌하는데 사용
    (i플래그는 대소문자 구별없이 검색하게 해준다.)
    */
    function search(e) {
      const searchText = e.target.value;

      follower.value = followerCopy.value.filter((data) =>
        data.name.match(new RegExp(searchText, "i"))
      );
    }

    return { follower, search };
  },
};
</script>

<style></style>
