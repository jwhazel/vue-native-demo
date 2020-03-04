<template>
  <view class="header-container">
    <touchable-opacity class="back-button-container" :on-press="closeExternalView">
      <text v-if="enableBackButton" class="back-button">←</text>
    </touchable-opacity>
    <text class="header">Spring Hill News</text>
    <view class="activity-indicator-container">
      <activity-indicator v-if="enableActivityIndicator" size="small" color="#ffffff" />
    </view>
  </view>
</template>

<script>
export default {
  name: "Header",
  props: ["enableBackButton", "enableActivityIndicator"],
  methods: {
    closeExternalView: function() {
      this.$emit("closeExternalView");
    }
  }
};
</script>

<style scoped>
.header-container {
  background-color: #2c426c;
  display: flex;
  padding-top: 45px; /* HACK: iphone notch, is there a proper way to do this??*/
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.back-button-container{
  flex:0;
}

.activity-button-container{
  flex:0;
}

.back-button {
  color: #fff;
  font-size: 24px;
}

.header {
  font-size: 24;
  color: white;
  text-align: center;
  flex: 1;
}
</style>