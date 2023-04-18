<template>
  <div
    :class="`filter-item ${filterList}`"
    :style="`
      background-image: url(${uploadImg})`"
    @click="fire"
  >
    <slot :msg="msg"></slot>
  </div>
</template>

<script>
export default {
  name: "filterbox",
  data() {
    return {
      msg: "hello",
    };
  },
  /*선택한 필터 App.vue로 보내기
  mitt라는 외부 라이브러리 사용함
  mitt - 먼곳에 떨어진 컴포넌트에 데이터를 전송하고 싶을 때 사용
  main.js에 세팅 필요함.
  */
  methods: {
    fire() {
      this.emitter.emit("mitt", this.filterList);
    },
  },
  props: {
    uploadImg: String,
    filterList: Array,
  },
};
</script>

