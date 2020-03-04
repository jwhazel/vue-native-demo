<template>
  <view class="container">
    <Header
      :enableBackButton="externalViewEnabled"
      :enableActivityIndicator="externalPageLoading"
      @closeExternalView="()=>{externalViewEnabled=false; externalPageLoading=false;}"
    />
    <ArticleList :articles="articles" @clickedArticle="clickedArticle" @loadMore="getArticles" />
    <ExternalView
      class="externalview"
      v-if="externalViewEnabled"
      :externalUrl="externalUrl"
      @pageLoaded="pageLoaded"
    />
  </view>
</template>

<script>
import Header from "./src/components/Header";
import ArticleList from "./src/components/ArticleList";
import ExternalView from "./src/components/ExternalView";

import api from "./src/lib/api.js";
import getTime from "./src/lib/timestamp.js";

export default {
  components: { Header, ArticleList, ExternalView },
  data: function() {
    return {
      articles: [],
      externalPageLoading: false,
      externalViewEnabled: false,
      externalUrl: null,
      articleStart: 1
    };
  },
  methods: {
    clickedArticle(url) {
      this.externalUrl = url;
      this.externalPageLoading = true;
      this.externalViewEnabled = true;
    },
    pageLoaded() {
      this.externalPageLoading = false;
    },
    getArticles(direction = "append") {
      api(getTime(), this.articleStart).then(data => {
        if (direction === "append") {
          this.articles = this.articles.concat(data);
        } else if (direction === "prepend") {
          this.articles = data.concat(this.articles);
        }
        this.articleStart = this.articleStart + data.length;
      });
    }
  },
  created() {
    this.getArticles();
  }
};
</script>

<style>
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  width: 100%;
}

.externalview {
  position: absolute;
  top: 88px;
  left: 0;
  height: 100%;
  z-index: 9999;
  flex-grow: 0;
}
</style>
