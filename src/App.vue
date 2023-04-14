<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step--">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.svg" class="logo" @click="step = 0" />
  </div>
  
  <!--computed && mapState 사용-->
  <h4>{{ myname }}</h4> 
  <p>{{ age }}</p>

  <!--mapMutations 사용-->
  <button @click="plusAge(1)">Age +1</button>

  <button @click="$store.commit('changename')">버튼</button>

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
  <button @click="more">더보기 store X</button>
  <button @click="$store.dispatch('getData')">더보기 store O</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input
        @change="upload"
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
      />
      <label for="file" class="input-plus">+</label>
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
import axios from "axios";
import filter from "./assets/data/filterList.js";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      InstarList: data,
      plus: 0,
      step: 3,
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
    ...mapMutations(['setMore', 'plusAge']),
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
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.plus}.json`)
        .then((result) => {
          this.InstarList.push(result.data);
          this.plus++;
          this.$store.commit("pushLike", result.data);
        });
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
    name(){
      return this.$store.state.name
    },
    ...mapState(['name', 'age', 'likes']),
    ...mapState({myname : 'name'})
  },
};
</script>

<style>
@import "./assets/css/style.css";
</style>
