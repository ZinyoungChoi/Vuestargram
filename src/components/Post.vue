<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{backgroundImage : `url(${InstarList.userImage})`}"></div>
      <span class="profile-name">{{ InstarList.name }}</span>
    </div>
    <div @click="$store.commit('Ilike',i)" :class="`post-body ${InstarList.filter}`" :style="{ backgroundImage : `url(${InstarList.postImage})` }"></div>
    <div class="post-content">
      <!--store 기본 사용법 likes 따로 store에 저장되어있음.-->
      <p>{{$store.state.likes[i]}} Likes</p>
      <p><strong>{{ InstarList.name }}</strong> {{InstarList.content}}</p>
      <p class="date">{{InstarList.date}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name : "Post",
  props : {
    InstarList : String, 
    i : Number, //InstarList의 Index
  }
};
</script>

