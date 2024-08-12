<template>
  <div class="g-wrap">
    <van-row class="login-title">
      <h2>登录</h2>
    </van-row>
    <van-row style="padding: 30px 0 0px">
      <van-form @submit="onSubmit" style="width: 100%">
        <van-cell-group inset>
          <van-field
            v-model="mobile"
            clearable
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
            ]"
          />
          <van-field
            v-model="code"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
            :rules="[
              { required: true, message: '请输入短信验证码' },
              { pattern: /^\d{6}$/, message: '请输入6位数验证码' }
            ]"
          >
            <template #button>
              <template v-if="isGetCode"> <van-count-down :time="time" format="ss" @finish="finishHandle" /><span>s</span> </template>
              <van-button v-if="!isGetCode" size="small" type="primary" @click="getCode"> 发送验证码 </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="agree-box"><van-checkbox v-model="checked" shape="square"></van-checkbox><span @click="showAgreeDialog">我已阅读并同意 《注册及服务协议》</span></div>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </van-row>
  </div>
  <van-dialog v-model:show="show" title="中金云创平台用户服务协议" theme="round-button" @confirm="confirmHandle">
    <div class="txt-box">
      <PDF :src="pdfUrl"></PDF>
    </div>
  </van-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { showDialog, showNotify } from 'vant'
import { useUserStore } from '@/stores/user'
import { setToken } from '@/utils/auth'
import { useRouter } from 'vue-router'
import PDF from '@/components/Pdf.vue'
const router = useRouter()

const { $Api } = getCurrentInstance().appContext.config.globalProperties

onMounted(() => {})

const pdfUrl = ref('/files/ptfwxy.pdf')

const userStore = useUserStore()

const mobile = ref('')
const code = ref('')
const checked = ref(false)

const time = ref(1 * 60 * 1000)

const isGetCode = ref(false)
const finishHandle = () => {
  isGetCode.value = false
}

const onSubmit = values => {
  if (!checked.value) {
    return showNotify({ message: '请阅读并同意 《注册及服务协议》', type: 'warning' })
  }

  $Api
    .post('/api/jeecg-boot/sys/phoneLogin', {
      mobile: mobile.value,
      captcha: code.value
    })
    .then(res => {
      if (res.code === 200) {
        showNotify({ message: res.message, type: 'success' })
        userStore.login({
          token: res.result.token,
          id: res.result.userInfo.id,
          phone: res.result.userInfo.phone,
          username: res.result.userInfo.username,
          multi_depart: res.result.multi_depart
        })
        setToken(res.result.token)
        if (res.result.multi_depart === 0) {
          router.push('/service/auth')
        } else {
          router.push('/service/go')
        }
      } else {
        showNotify({ message: res.message, type: 'danger' })
      }
    })
}

// 获取验证码
const getCode = () => {
  if (!mobile.value) {
    return showNotify({ message: '请输入手机号', type: 'warning' })
  }
  time.value = 1 * 60 * 1000
  isGetCode.value = true
  // if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
  //   return showNotify({ message: '请输入正确的手机号', type: 'warning' })
  // }

  $Api
    .post('/api/jeecg-boot/sys/sms', {
      mobile: mobile.value,
      smsmode: '0'
    })
    .then(res => {
      if (res.code === 0) {
        showNotify({ message: res.message, type: 'success' })
      } else {
        showNotify({ message: res.message, type: 'error' })
      }
    })
}

const show = ref(false)

const showAgreeDialog = () => {
  show.value = true
}
const confirmHandle = () => {
  checked.value = true
}

const txt = ref(``)
</script>

<style lang="scss" scoped>
.login-title {
  justify-content: center;
  padding: 90px 0 40px;
  h2 {
    height: 80px;
    width: 80px;
    border: #5b87f9 3px solid;
    border-radius: 50%;
    line-height: 80px;
    text-align: center;
    color: #5b87f9;
    font-weight: normal;
  }
}
.van-checkbox {
  display: inline-flex;
  margin-right: 10px;
}
.agree-box {
  padding: 20px 20px;
  margin-bottom: 40px;
  span {
    font-size: 14px;
    color: #5b87f9;
    text-decoration: underline;
  }
}
::v-deep(.van-count-down) {
  display: inline;
}
.txt-box {
  height: 60vh;
  overflow-y: auto;
  font-size: 14px;
  padding: 15px;
}
</style>
