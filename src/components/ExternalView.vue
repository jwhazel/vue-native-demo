<template>
  <view class="external-view">
    <web-view :source="{uri:externalUrl}" :onLoad="pageLoaded" />
  </view>
</template>

<script>
import { WebView } from "react-native-webview";

export default {
  name: "ExternalView",
  props: ["externalUrl"],
  components: {
    "web-view": WebView
  },
  methods: {
    pageLoaded() {
      this.$emit("pageLoaded", true);
    }
  }
};
</script>

<style scoped>
.external-view {
  background-color: #fff;
  flex: 1;
  width: 100%;
}

.page-loading-indicator {
  position: absolute;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>