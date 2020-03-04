<template>
  <scroll-view class="scroll-view" :onScroll="watchScroll" :scrollEventThrottle="800">
    <ArticleItem
      v-for="(article,index) in articles"
      :key="index"
      :outlet="article.outlet"
      :url="article.url"
      :thumbnail="`https://springhillnews.net/${article.thumbnail}`"
      :headline="article.headline"
      :timestamp="article.timestamp"
      @clickedArticle="clickedArticle"
    />
  </scroll-view>
</template>

<script>
import ArticleItem from "./ArticleItem";

export default {
  name: "ArticleList",
  props: ["articles"],
  components: { ArticleItem },
  data() {
    return {
      endOfScrollDebounce: false
    };
  },
  methods: {
    clickedArticle(url) {
      this.$emit("clickedArticle", url);
    },
    watchScroll(e) {
      //This will watch the position of the scroll-view and fire an event when'
      //it reaches the bottom
      const paddingToBottom = 0;
      const end =
        e.nativeEvent.layoutMeasurement.height +
          e.nativeEvent.contentOffset.y >=
        e.nativeEvent.contentSize.height - paddingToBottom;

      //Debounce this event so that it's not firing multiple times in succession
      if (end === true) {
        if (this.endOfScrollDebounce === false) {
          this.endOfScrollDebounce = true;
          this.$emit("loadMore", 'append');
        }
      } else {
        this.endOfScrollDebounce = false;
      }
    }
  }
};
</script>

<style scoped>
.scroll-view {
  padding: 15px;
  flex-grow: 0;
}
</style>