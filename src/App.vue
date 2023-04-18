<template>
  <!--header-->
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

  <!--computed && mapState 사용 : follwer 보러가기-->
  <div v-if="step == 0" class="my_profile">
    <h4>{{ name }} 님</h4>
    <p class="cursor" @click="step = 3"> My Follower</p>
  </div>


  <!--Container-->
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
  //mitt로 보낸값 수신받을때는 보통 라이프사이클 훅 중 하나인 mounted()안에 적음.
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
      //store > mutations에 mylist 보내주기
      this.$store.commit("unshiftLike", mylist); 
    },

    /**1. 파일업로드시에 e.target.files 라는 코드를 활용하면 업로드한 파일을 리스트로 알려줌.
     * 2. URL.createObjectURL()에 업로드한 파일을 담으면 가상의 url을 하나 생성해줌.
     * 3. 업로드하면 다음페이지로 넘어가야함(this.step = 1).
     */

    upload(e) {
      let file = e.target.files; //업로드한 파일
      let url = URL.createObjectURL(file[0]); //가상 url 생성
      this.step = 1; //페이지 이동
      this.uploadImg = url; //state에 생성한 url담기
    },
  },

  /**computed
   * - methods 안에 만든 함수는 함수를 부를 때마다 안의 코드가 실행되지만,
   * computed 안에 만든 함수는 함수를 불러도 안의 코드가 실행이 안됨.
   * computed는 컴포넌트 로드시 한번 실행되고 그 값을 계속 저장해서 씁니다.
   * 
   * - computed는 return 안쓰면 안됨.
   * - computed 함수를 가져다가 쓸 때는 소괄호 없이 함수명만 쓰면 됨.
   */

  computed: {
    // name() {
    //   return this.$store.state.name; //원래 쓰는방식
    // },
    ...mapState(["name", "age", "likes"]), //store - state 값 가져오기
    // ...mapState({ myname: "name" }), 이름 지정해서도 사용가능
  },
};
</script>

<style>
@import "./assets/css/style.css";
</style>
