<template lang="html">
    <div class="headerPic">
      <div>
        <p class="imgTitle">{{recommendTitle}}</p>
        <a href="baidu.com">
          <img src="../assets/pic2.jpg" alt="-*^*-!" class="headerImg">
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "IndexHeaderPic"
    }
</script>

<style lang="css" scoped>
  .headerImg{
    height: 300px;
    width: 100%;
  }
  .imgTitle{
    z-index: 2;
    padding-left: 45%;
    padding-top: 230px;
    position: absolute;
    color: #fff;
    font-size: 20px;
  }
</style>
