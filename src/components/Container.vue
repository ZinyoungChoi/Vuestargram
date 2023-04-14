<template>
  <div>
    <div v-if="step == 0">
      <Post
        :InstarList="InstarList[i]"
        v-for="(Lists, i) in InstarList"
        :key="i"
        :i="i"
      />
    </div>
    <div v-else-if="step == 1">
      <div
        :class="`upload-image ${selectFilter}`"
        :style="{
          backgroundImage: `url(${uploadImg})`,
          backgroundPosition: `center`,
        }"
      ></div>
      <div class="filters">
        <FilterBox
          v-for="filters in filterList"
          :key="filters"
          :filterList="filters"
          :uploadImg="uploadImg"
          >{{ filters }}
          <!-- <template v-slot:default="name">{{ name.msg}}</template> --></FilterBox
        >
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-else-if="step == 2">
      <div
        :class="`upload-image ${selectFilter}`"
        :style="{
          backgroundImage: `url(${uploadImg})`,
          backgroundPosition: `center`,
        }"
      ></div>
      <div class="write">
        <textarea @input="textchange" class="write-box"></textarea>
      </div>
    </div>

    <div v-else-if="step == 3">
      <Mypage />
    </div>
  </div>

  

</template>

<script>
import FilterBox from "./FilterBox.vue";
import Mypage from './Mypage.vue';
import Post from "./Post.vue";

export default {
  name: "App",
  components: {
    Post,
    FilterBox,
    Mypage,
  },
  props: {
    InstarList: Array,
    step: Number,
    uploadImg: String,
    filterList: Array,
    selectFilter: String,
  },
  methods: {
    textchange(e) {
      let texts = e.target.value;
      console.log("TEST", texts);
      this.$emit("text", texts);
    },
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
