import type { spawn } from 'child_process';
<template>
  <div class="g-wrap">
    <van-row style="padding: 30px 0 0px">
      <van-form @submit="onSubmit" style="width: 100%">
        <van-cell-group inset style="margin-bottom: 20px">
          <h3>申请人信息</h3>
          <van-field
            v-model="formData.realName"
            name="realName"
            label="真实姓名"
            placeholder="请输入真实姓名"
            clearable
            :rules="[
              { required: true, message: '请输入真实姓名' },
              { pattern: /^[\u4e00-\u9fa5]{2,10}$/, message: '请输入2~10个汉字的真实姓名' }
            ]"
          />
          <van-field
            v-model="formData.idNo"
            name="idNo"
            label="身份证号"
            placeholder="请输入身份证号"
            clearable
            :rules="[
              { required: true, message: '请输入身份证号' },
              { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' }
            ]"
          />
          <van-field
            v-model="formData.moble"
            name="moble"
            label="联系电话"
            placeholder="请输入联系电话"
            clearable
            :disabled="true"
            :rules="[
              { required: true, message: '请输入联系电话' },
              { pattern: /^1[3-9]\d{9}$|^0\d{2,3}-\d{7,8}$/, message: '请输入正确的联系电话' }
            ]"
          />
        </van-cell-group>

        <van-cell-group inset>
          <h3>企业信息</h3>
          <van-field
            v-model="formData.departName"
            name="departName"
            label="公司名称"
            placeholder="请输入公司名称"
            clearable
            :rules="[
              { required: true, message: '请输入公司名称' },
              { pattern: /^.{1,50}$/, message: '请输入长度不能大于50个字符' }
            ]"
          />
          <van-field
            v-model="formData.departCode"
            name="departCode"
            label="证件号码"
            placeholder="请输入企业统一信用代码"
            clearable
            :rules="[
              { required: true, message: '请输入企业统一信用代码' },
              { pattern: /^[a-zA-Z0-9]{18}$/, message: '请输入正确的企业统一信用代码' }
            ]"
          />
          <van-field
            v-model="formData.legalPerson"
            name="legalPerson"
            label="法人姓名"
            placeholder="请输入法人姓名"
            clearable
            :rules="[
              { required: true, message: '请输入法人姓名' },
              { pattern: /^[\u4e00-\u9fa5]{2,10}$/, message: '请输入2~10个汉字的真实姓名' }
            ]"
          />
        </van-cell-group>

        <div class="agree-box"><van-checkbox v-model="checked" shape="square"></van-checkbox><span @click="showAgreeDialog">我已阅读并同意《企业平台认证协议》</span></div>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-row>
  </div>
  <van-dialog v-model:show="show" title="电商平台融资操作手册" theme="round-button" @confirm="confirmHandle">
    <div class="txt-box">
      <PDF :src="pdfUrl"></PDF>
    </div>
  </van-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { showDialog, showNotify } from 'vant'
const { $Api } = getCurrentInstance().appContext.config.globalProperties
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import PDF from '@/components/Pdf.vue'
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  // GetCode()
  formData.moble = userStore.phone
})
const pdfUrl = ref('/files/czsc.pdf')

const formData = reactive({
  realName: '',
  idNo: '',
  moble: '',
  departName: '',
  departCode: '',
  legalPerson: ''
})

const checked = ref(false)

const onSubmit = values => {
  if (!checked.value) {
    return showNotify({ message: '请阅读并同意 《企业平台认证协议》', type: 'warning' })
  }
  $Api
    .post('/api/jeecg-boot/userCompany/saveInfo', {
      userId: userStore.id,
      ...values
    })
    .then(res => {
      if (res.success) {
        showNotify({ message: res.message, type: 'success' })
        // 跳转到go页面
        router.push('/service/go')
      } else {
        showNotify({ message: res.message, type: 'danger' })
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
</script>

<style lang="scss" scoped>
h3 {
  color: #5b87f9;
  font-size: 14px;
  text-align: center;
  font-weight: normal;
  line-height: 40px;
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
.txt-box {
  height: 65vh;
  overflow-y: auto;
  font-size: 14px;
  padding: 0 15px;
}
</style>
