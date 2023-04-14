<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step--">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 0">
        <input
          @change="upload"
          accept="image/*"
          type="file"
          id="file"
          class="inputfile"
        />
        <label for="file" class="input-plus">업로드</label>
      </li>
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.svg" class="logo" @click="step = 0" />
  </div>

  <!--computed && mapState 사용-->
  <div v-if="step == 0" class="my_profile">
    <h4>{{ myname }} 님</h4>
    <p class="cursor" @click="step = 3"> My Follower</p>
  </div>

  <!--   <p>{{ $store.state.more }}</p> -->

  <Container
    @text="mytext = $event"
    :filterList="filterList"
    :uploadImg="uploadImg"
    :InstarList="InstarList"
    :step="step"
    :selectFilter="selectFilter"
  />

  <br />
  <!--store로 더보기 버튼 만들기-->

  <div class="footer">
    <ul class="footer-button-plus">
      <li @click="$store.dispatch('getData')" class="more_content">+</li>
    </ul>
  </div>

  <!-- Tab 만들었던 것
    <div v-if="step === 0">내용0</div>
  <div v-else-if="step === 1">내용1</div>
  <div v-else-if="step === 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button> -->
</template>

<script>
import Container from "./components/Container.vue";
import data from "./assets/data/InstarList.js";
import filter from "./assets/data/filterList.js";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      InstarList: data,
      plus: 0,
      step: 0,
      uploadImg: "",
      mytext: "",
      filterList: filter,
      selectFilter: "",
    };
  },
  mounted() {
    this.emitter.on("mitt", (a) => {
      this.selectFilter = a;
    });
  },
  components: {
    Container,
  },
  methods: {
    //mapMutations = store mutations 한번에 가져다 쓰기
    ...mapMutations(["setMore", "plusAge"]),
    publish() {
      var mylist = {
        name: "Choi Zin",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.uploadImg,
        likes: 36,
        date: "April 5",
        liked: false,
        content: this.mytext,
        filter: this.selectFilter,
      };
      this.InstarList.unshift(mylist);
      this.step = 0;
      this.$store.commit("unshiftLike", mylist);
    },
    upload(e) {
      let file = e.target.files;
      console.log(file[0]);
      let url = URL.createObjectURL(file[0]);
      this.step = 1;
      this.uploadImg = url;
      console.log("URL", url);
    },
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    ...mapState(["name", "age", "likes"]),
    ...mapState({ myname: "name" }),
  },
};
</script>

<style>
@import "./assets/css/style.css";
</style>
