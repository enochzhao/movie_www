<template>
  <div>
    <div class="header">
      <movie-index-header></movie-index-header>
    </div>
    <div class="news-list">
      <news-list></news-list>
    </div>
    <div class="movies-list">
      <movies-list></movies-list>
    </div>
    <div class="index-pic">
      <index-header-pic></index-header-pic>
    </div>
    <div class="user-message">
      <user-message></user-message>
    </div>
    <div class="footer">
      <common-footer></common-footer>
    </div>
    <div class="test">
      <p>
        这是测试页面
      </p>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/CommonFooter";
import NewsList from "../components/NewsList";
import MoviesList from "../components/MoviesList";
import IndexHeaderPic from "../components/IndexHeaderPic";
import UserMessage from "../components/UserMessage";

export default {
    name: "test",
    data () {
        return {}
    },
    components: {
        //MovieIndexHeader,
        CommonFooter,
        //NewsList,
        //MoviesList,
        //IndexHeaderPic,
        //UserMessage
    }
}
</script>

<style scoped>

</style>
