<template>
  <view class="article-item-container">
    <touchable-opacity class="article-item" :on-press="handleBtnPress">
      <view>
        <image class="thumbnail" :style="{width: 85, height: 85}" :source="{uri: `${thumbnail}`}" />
      </view>
      <view class="article-meta">
        <text class="headline">{{headline}}</text>
        <text class="outlet">{{outlet}}</text>
        <text class="timestamp">Published: {{timestamp}}</text>
      </view>
    </touchable-opacity>
  </view>
</template>

<script>
export default {
  name: "ArticleItem",
  props: ["outlet", "thumbnail", "headline", "timestamp", "url"],
  methods: {
    handleBtnPress: function(e) {
      this.$emit("clickedArticle", this.url);
    }
  }
};
</script>

<style scoped>
.article-item-container {
  margin-bottom: 20px;
}
.article-item {
  display: flex;
  flex-direction: row;
}

.article-meta {
  flex: 1;
  padding-left: 15px;
}

.headline {
  font-weight: bold;
  font-size: 15px;
}

.outlet {
  color: #2c426c;
  font-weight: bold;
  font-size: 12px;
}

.timestamp {
  font-style: italic;
  font-size: 10px;
}
</style>