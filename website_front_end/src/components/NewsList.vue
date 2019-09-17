<template lang="html">
    <li class="goods-list">
      <div class="newsList">
        <router-link :to="www.enochzhao.com" class="goods-list-link">假设为新闻-以诺君的方舟</router-link>
      </div>
    </li>
</template>

<script>
    export default {
        name: "NewsList"
    }
</script>

<style lang="css" scoped>
  .newsList{
    padding: 5px;
    font-size: 10px;
    border-bottom: 1px dashed #ababab;
  }
</style>
