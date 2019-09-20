<template lang="html">
  <div class="container">
    <div>
      <!-- header组件 -->
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <div>
        <div class="contentLeft">
          <ul class="cont-ul">
            <!-- 电影列表 -->
            <movies-list></movies-list>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <!-- footer组件 -->
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from "../components/MovieIndexHeader"
import MoviesList from "../components/MoviesList"
import CommonFooter from "../components/CommonFooter"

export default {
    name: "moviesList",
    components: {
        MovieIndexHeader,
        CommonFooter,
        MoviesList
    }
}
</script>

<style lang="css" scoped>
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .contentMain{
    padding-top: 150px;
  }
  .contentText{
    font-size: 15px;
    padding-top: 20px;
  }
</style>
