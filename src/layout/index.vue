<template>
  <el-container class="app-cont">
    <!-- header -->
    <GlobelHeader></GlobelHeader>
    <!-- main-body -->
    <el-container class="app-bd">
      <router-view />
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import GlobelHeader from '@/layout/GlobleHeader.vue'
// import GlobelFooter from '@/layout/GlobleFooter.vue'
// import GlobelAside from '@/layout/GlobleAside.vue'
</script>
<style lang="scss" scoped>
.app-cont {
  height: 100%;
}
.app-bd {
  flex: 1;
}
</style>
