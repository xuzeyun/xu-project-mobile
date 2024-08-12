<template>
  <el-row><p v-html="text"></p></el-row>
  <p>
    <img src="@/assets/images/emo-ji/image 2.png" alt="" />
  </p>
  <el-row style="gap: 10px">
    <el-col><el-input type="textarea" v-model="textVal" show-word-limit maxlength="200" rows="10"></el-input></el-col>
    <el-col align="right">
      <el-button ref="buttonIconRef" type="warning" link><font-awesome-icon icon="face-smile" size="2x"></font-awesome-icon></el-button>
      <el-popover ref="popoverRef" :virtual-ref="buttonIconRef" trigger="click" title="选择表情" virtual-triggering>
        <div class="emo-select">
          <template v-for="(item, key, index) in emoList" :key="index"> <img :src="item" alt="" @click="addEmo(key)" /></template>
        </div>
      </el-popover>
      <el-button @click="submit" type="primary">提交评论</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const textVal = ref('')
const text = ref('')

const buttonIconRef = ref(null)
const popoverRef = ref(null)

const emoList = {
  '[image 2]': '/emoji/image 2.png',
  '[image 3]': '/emoji/image 3.png',
  '[image 4]': '/emoji/image 4.png'
}

const addEmo = (emoName: any) => {
  textVal.value += emoName
}

const submit = () => {
  text.value = textVal.value
  for (const key in emoList) {
    text.value = text.value.replace(key, `<img src="${emoList[key]}">`)
    all(key)
  }
  textVal.value = ''
}

const all = key => {
  if (text.value.indexOf(key) != -1) {
    text.value = text.value.replace(key, `<img src="${emoList[key]}">`)
    all(key)
  } else {
    return
  }
}
</script>

<style>
.emo-select img {
  cursor: pointer;
  width: 30px;
  height: 30px;
}
p {
  line-height: 30px;
}
p img {
  vertical-align: middle;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 0 2px;
}
</style>
