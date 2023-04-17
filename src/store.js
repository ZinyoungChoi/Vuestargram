//Vuex
//1. js파일하나에 모든 데이터 저장 가능 props 필요 없이 모든 컴포넌트가 데이터에 직접 접근 가능
//2. 파일과 데이터가 너무 많을시 사용

import { createStore } from "vuex";
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
      likes: likeList,
      pushLike: likedList,
      more: {},
      plus : 0,
      morelikes : 0,
    };
  },
  // mutations = state 수정방법 정의하는 곳(state수정은 반드시 여기서만)
  mutations: {
    //더보기 좋아요 이전 좋아요 유지시키기
    setMore(state, data){  //파라미터의 state는 위의 state가지고 오는 것. data는 컴포넌트에서 받아온 데이터.
        state.more = data;
        state.plus++;
        state.likes = [...state.likes, data.likes]
    },
    //더보기 좋아요 넣기
    pushLike(state, data) {
      const moreLikes = data.likes;
      state.likes.push(moreLikes);
    },
    //업로드 좋아요 넣기
    unshiftLike(state, data) {
      const moreLikes = data.likes;
      state.likes.unshift(moreLikes);
    },
    //클릭시 좋아요 1증가 재 클릭시 좋아요 1감소
    Ilike(state, data) { //data에 InstarList의 index가 들어있음
      if (state.pushLike[data] === false) {
        state.likes[data]++;
        state.pushLike[data] = true;
      } else {
        state.likes[data]--;
        state.pushLike[data] = false;
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
        context.commit('setMore', a.data) //mutations - setMore()에 데이터 보내주며 실행
      });
    },
  },
});

export default store;
