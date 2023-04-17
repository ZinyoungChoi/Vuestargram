<template>
  <div>
    <!--기본 페이지(부모에서 반복문 설정해주기)-->
    <div v-if="step == 0">
      <Post
        :InstarList="InstarList[i]"
        v-for="(Lists, i) in InstarList"
        :key="i"
        :i="i"
      />
    </div>

    <!--사진 필터선택 페이지-->
    <div v-else-if="step == 1">
      <!--class, style에 데이터 바인딩-->
      <div
        :class="`upload-image ${selectFilter}`"
        :style="{
          backgroundImage: `url(${uploadImg})`,
          backgroundPosition: `center`,
        }"
      ></div>
      <div class="filters">
        <!--solt 사용하여 보내주기

        1. 자식은 <slot></slot>이라는 HTML 태그를 이용해서 데이터가 꽂힐 곳을 정해놓음

        2. 부모는 <자식컴포넌트>데이터</자식컴포넌트> 이렇게 자식컴포넌트 사이에 데이터를 작성해서 보냄 

        그럼 부모가 가진 데이터가 자식의 <slot> 자리에 자동으로 꽂힘. -->
        <FilterBox
          v-for="filters in filterList"
          :key="filters"
          :filterList="filters"
          :uploadImg="uploadImg"
          >{{ filters }}</FilterBox
        >
      </div>
    </div>

    <!-- 글 작성 페이지 -->
    <div v-else-if="step == 2">
      <div
        :class="`upload-image ${selectFilter}`"
        :style="{
          backgroundImage: `url(${uploadImg})`,
          backgroundPosition: `center`,
        }"
      ></div>
      <div class="write">
        <textarea
          @input="textchange"
          class="write-box"
          placeholder="등록할 글을 써주세요"
        ></textarea>
      </div>
    </div>

    <!--팔로워 검색 페이지-->
    <div v-else-if="step == 3">
      <Mypage :one="1" />
    </div>
  </div>
</template>

<script>
import FilterBox from "./FilterBox.vue";
import Mypage from "./Mypage.vue";
import Post from "./Post.vue";

export default {
  name: "App",
  components: {
    Post,
    FilterBox,
    Mypage,
  },
  //받은 프롭스 저장(타입 지정)
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
      //$emit으로 상위컴포넌트에 전달
      this.$emit("text", texts);
    },
  },
};
</script>
