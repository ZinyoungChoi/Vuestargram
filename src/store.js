import { createStore } from "vuex";
import axios from "axios";
import InstarList from "./assets/data/InstarList";

const likeList = InstarList.map((like) => like.likes);
const store = createStore({
  state() {
    return {
      name: "kim",
      age: 20,
      InstarList : InstarList,
      likes: likeList,
      pushLike: [false, false, false],
      more: {},
      plus : 0,
      morelikes : 0,
    };
  },
  // mutations = state 수정방법 정의하는 곳(state수정은 반드시 여기서만)
  mutations: {
    setMore(state, data){
        state.more = data;
        state.plus++;
        state.likes = [...state.likes, data.likes]
    },
    changename(state) {
      state.name = "choi";
    },
    plusAge(state, data) {
      state.age += data;
    },
    pushLike(state, data) {
      const moreLikes = data.likes;
      state.likes.push(moreLikes);
      state.pushLike.push(false);
    },
    unshiftLike(state, data) {
      const moreLikes = data.likes;
      state.likes.unshift(moreLikes);
      state.pushLike.unshift(false);
    },
    Ilike(state, data) {
      if (state.pushLike[data] == false) {
        state.likes[data]++;
        state.pushLike[data] = true;
      } else {
        state.likes[data]--;
        state.pushLike[data] = false;
      }
    },
  },
  // actions = ajax 요청, 또는 오래걸리는 작업들에 사용
  actions: {
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more${context.state.plus}.json`).then((a) => {
        console.log(a.data);
        context.state.InstarList.push(a.data)
        context.commit('setMore', a.data)
      });
    },
  },
});

export default store;
