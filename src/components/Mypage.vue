<!-- composition API 사용 
Vue 3부터 사용 가능한 코딩스타일
computed, methods, watch, data() 이런걸로 파일을 쪼갤 필요 없이
관련 기능을 한 곳에서 코드 짤 수 있음.
but, 문법이 약간 귀찮을 수 있음
-->

<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input @input="search" placeholder="🔍" class="search" />
    <!--반복문으로 follower data수 만큼 만들어줌-->
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
    
  },
  //기본적으로 setup()이라는 hook 같은 걸 만들고 항상 이 안에 코드 짜면 됨.
  //Props도 받아올 수 있음.
  setup(props) {

    //기본값 설정
    // ref()함수 import 해와서
    // var 데이터 이름 = ref(데이터)로 항상 데이터 저장해줘야함.
    // 이렇게 안하면 데이터 변경시 실시간 재렌더링 안됨.

    let follower = ref([]);
    let followerCopy = ref([]);

    onMounted(() => { //mount 후에 axios로 데이터 받아오기
      axios.get("/follower.json").then((a) => { 
        follower.value = a.data; //데이터 저장할 때 .value 필수(문법임)
        followerCopy.value = a.data; //검색기능 비교용도로 하나 더 넣어줌
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
      //followerCopy에서 변경된 값을 follower에 넣어주기.
      //데이터자체를 건들여서 검색기능만든 것임.
      //followerCopy에서 값을 변경하면 기존값도 유지할 수 있기 때문에
      //글자를 지워도 그거에 맞게 검색이 다시 돌아감
    }

    //Component API에서 꺼내서 쓰려면 꼭 return 해줘야 쓸 수 있음
    return { follower, search };
  },
};
</script>

<style></style>
