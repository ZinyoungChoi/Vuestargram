<template>
  <div class="header">
    <ul class="header-button-left">
      <li v-if="step < 3" @click="step--">Cancel</li>
      <li v-else-if="step == 3" @click="step = 0">Cancel</li>
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


  <!--@text 하위 컴포넌트에서 데이터 보내준 것 받아주기-->
  <Container
    @text="mytext = $event"
    :filterList="filterList"
    :uploadImg="uploadImg"
    :InstarList="InstarList"
    :step="step"
    :selectFilter="selectFilter"
  />

  <!--store로 더보기 버튼 만들기-->
  <div class="footer">
    <ul class="footer-button-plus">
      <!--store에 있는 actions 불러올때는 .dispatch('')-->
      <li @click="$store.dispatch('getData')" class="more_content">+</li>
    </ul>
  </div>
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
  //mitt로 보낸갑 수신받을때는 보통 라이프사이클 훅 중 하나인 mounted()안에 적음.
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
    //발행버튼 클릭 시 InstarList배열 앞에 추가할 데이터
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
    /**1. 파일업로드시에 e.target.files 라는 코드를 활용하면 업로드한 파일을 리스트로 알려줌.
     * 2. URL.createObjectURL()에 업로드한 파일을 담으면 가상의 url을 하나 생성해줌.
     * 3. 업로드하면 다음페이지로 넘어가야함(this.step = 1).
     */
    upload(e) {
      let file = e.target.files;
      let url = URL.createObjectURL(file[0]);
      this.step = 1;
      this.uploadImg = url;
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
