<template>
  <div class="banner">
    <van-row>
      <h4>我们只为用户提供更好的融资服务</h4>
    </van-row>
    <van-row>
      <h1>3,000,000</h1>
    </van-row>
    <van-row style="margin-bottom: 20px">
      <h4>最高可借额度（元）</h4>
    </van-row>
    <van-row class="tit-li">
      <van-col span="8" align="left"><van-icon name="certificate" size="18" />在线秒批</van-col>
      <van-col span="8" align="left"><van-icon name="certificate" size="18" />极速到账</van-col>
      <van-col span="8" align="left"><van-icon name="certificate" size="18" />循环额度</van-col>
    </van-row>
  </div>
  <div class="cont">
    <van-row>
      <p style="text-align: center; padding: 10px 0">扫二维码申请融资</p>
    </van-row>
    <van-row style="margin-bottom: 20px">
      <div class="code-wrap">
        <img src="@/assets/images/2d_code.jpg" alt="" />
      </div>
    </van-row>
    <van-row>
      <h5>温馨提示</h5>
      <p class="tips">
        1、营业执照原件或照片<br />
        2、法人身份证原件或正反面照片<br />
        3、手机号+邮箱+验证码<br />
        4、店铺收款账户信息<br />
        5、客服微信：<b>{{ wxNumber }}</b
        ><span @click="copyHandle" style="margin-left: 20px">复制</span><br />
        6、<span @click="showAgreeDialog">申请融资操作指引手册</span>
      </p>
    </van-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showDialog, showNotify } from 'vant'
const showAgreeDialog = () => {
  window.open('http://8.147.235.48:8080/jeecg-boot/sys/common/static/FinancingCustomerOperationManual.pdf')
}

const wxNumber = ref('kefuweixin')
const copyHandle = () => {
  try {
    navigator.clipboard.writeText(wxNumber.value)
    showNotify({ message: '文本已复制', type: 'success' })
  } catch (err) {
    showNotify({ message: '复制失败', type: 'danger' })
  }
}
</script>

<style lang="scss" scoped>
.banner {
  background-color: #3965fa;
  color: #fff;
  padding: 30px 20px;
  h1,
  h4 {
    width: 100%;
    text-align: left;
  }
  h1 {
    font-size: 48px;
    padding: 15px 0;
  }
  h4 {
    font-size: 14px;
    font-weight: normal;
  }
  .tit-li {
    .van-icon {
      margin-right: 5px;
    }
  }
}
.cont {
  padding: 0 15px;
  p {
    font-size: 14px;
    width: 100%;
    span {
      color: #3965fa;
    }
  }
  .code-wrap {
    width: 100%;
    text-align: center;
    img {
      width: 70%;
    }
  }
  .tips {
    color: #7f7f7f;
    line-height: 20px;
  }
}
</style>
