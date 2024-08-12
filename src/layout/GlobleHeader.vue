<template>
  <van-nav-bar :title:any="route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft" />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

onMounted(() => {
  console.log()
})

const onClickLeft = () => {
  // 返回上一个页面
  // history.back()
  router.push('/')
}
</script>

<style lang="scss" scoped>
// @import "@/styles/variables.scss";
</style>
