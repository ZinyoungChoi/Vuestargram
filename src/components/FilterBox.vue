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

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
