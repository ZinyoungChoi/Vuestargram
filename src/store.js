//Vuex
//1. js파일하나에 모든 데이터 저장 가능 props 필요 없이 모든 컴포넌트가 데이터에 직접 접근 가능
//2. 파일과 데이터가 너무 많을시 사용

import { createStore } from "vuex"; //Vuex store 기본세팅
import axios from "axios";
import InstarList from "./assets/data/InstarList";

const likeList = InstarList.map((like) => like.likes);
const likedList = InstarList.map((like) => like.liked);
const store = createStore({
  state() {
    //return 안에 state 기본값 저장
    return {
      name: "진영",
      age: 20,
      InstarList : InstarList,
      likes: likeList, //post에서 likes는 state에 있는값 사용중(store 사용법 알기 위함)
      plus : 0,
      morelikes : 0,
    };
  },
  // mutations = state 수정방법 정의하는 곳(state수정은 반드시 여기서만)
  mutations: {
    //더보기 좋아요 넣기
    setMore(state, data){  //파라미터의 state는 위의 state가지고 오는 것. data는 getData에서 받아온 데이터.
        state.plus++;
        state.likes = [...state.likes, data.likes] //기존 likes와 data에 있는 likes 같이 묶어줌.
    },
    //업로드 좋아요 넣기 - App.vue > methods : {} > publish() 에서 사용
    unshiftLike(state, data) {
      const moreLikes = data.likes;
      state.likes.unshift(moreLikes); //업로드 좋아요는 배열의 맨 앞에 넣어야 하기 때문에 unshift 사용.
    },
    //클릭시 좋아요 1증가 재 클릭시 좋아요 1감소
    Ilike(state, data) { //data에 InstarList의 index가 들어있음
      if (state.InstarList[data].liked === false) { //기본값 liked : false,
        state.likes[data] += 1; //state에 따로 빼놓은 likes중 클릭한 것만 +1
        state.InstarList[data].liked = true; //liked를 true로 바꿔줌
      } else { //liked : true인 상태
        state.likes[data] -= 1; //likes 1감소
        state.InstarList[data].liked = false; //liked 다시 false로 바꿔줌
      }
    },
  },
  // actions = ajax 요청, 또는 오래걸리는 작업들에 사용
  // 더보기 axios요청
  actions: {
    getData(context) { //context : store에 있는 데이터, mutations 등이 들어있음
      axios.get(`https://codingapple1.github.io/vue/more${context.state.plus}.json`).then((a) => {
        console.log(a.data);
        context.state.InstarList.push(a.data)
        context.commit('setMore', a.data) //mutations - setMore()에 데이터 보내주기
      });
    },
  },
});

export default store;
