<template>
  <div class="banner">
    <van-row>
      <h4>最高额度</h4>
    </van-row>
    <van-row>
      <h1><span>300</span>万</h1>
    </van-row>
    <van-row class="tit-li">
      <van-col span="8" align="center"><van-icon name="certificate" size="20" />在线秒批</van-col>
      <van-col span="8" align="center"><van-icon name="certificate" size="20" />极速到账</van-col>
      <van-col span="8" align="center"><van-icon name="certificate" size="20" />循环额度</van-col>
    </van-row>
  </div>
  <div class="cont">
    <ul>
      <li class="card-li" v-for="(item, index) in bankList" :key="index">
        <van-row>
          <h5><img src="@/assets/images/brand_01.jpg" alt="" />{{ item.bankName }}</h5>
        </van-row>
        <van-row style="padding: 6px 0 8px">
          <van-col span="8" align="center">
            <b>融资利率(%)</b><br />
            <span class="number">{{ item.rzll }}</span>
          </van-col>
          <van-col span="8" align="center">
            <b>最高可融资(元)</b><br />
            <span class="number">{{ item.zgkrz }}</span>
          </van-col>
          <van-col span="8" align="center">
            <b>融资期限(天)</b><br />
            <span class="number">{{ item.rzqx }}</span>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="6" align="center">
            <b>无需抵押</b>
          </van-col>
          <van-col span="6" align="center">
            <b>融资利率低</b>
          </van-col>
          <van-col span="6" align="center">
            <b>极速放款</b>
          </van-col>
          <van-col span="6" align="center" class="col-btn">
            <van-button round type="primary" size="mini" @click="sqHandle(item)">立即申请</van-button>
          </van-col>
        </van-row>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const { $Api } = getCurrentInstance().appContext.config.globalProperties

const router = useRouter()
const userStore = useUserStore()
onMounted(() => {})

// 银行列表
const bankList = ref([
  {
    bankName: '满链融电商贷',
    bankLogo: '',
    rzll: '18',
    zgkrz: '300万',
    rzqx: '3-36'
  }
])

// 申请
const sqHandle = row => {
  // console.log(userStore.id, userStore.phone, userStore.username)
  $Api
    .post('/api/jeecg-boot/userCompany/init', {
      id: userStore.id,
      phone: userStore.phone,
      username: userStore.username
    })
    .then(res => {
      // 未登录系统直接跳转到登录页面
      if (res.result.sysDepart && res.result.sysDepart.departName) {
        // 已登录已认证
        router.push('/service/go')
      } else {
        // 已登录未认证
        router.push('/service/auth')
      }
    })
}
</script>

<style lang="scss" scoped>
.banner {
  background-color: #3965fa;
  color: #fff;
  padding: 40px 20px 120px;
  h1,
  h4 {
    width: 100%;
    text-align: center;
  }
  h1 {
    font-size: 72px;
    padding: 15px 0;
  }
  h4 {
    font-size: 18px;
    font-weight: normal;
  }
  .tit-li {
    .van-icon {
      margin-right: 5px;
      font-size: 18px;
      // display: flex;
      // align-items: center;
    }
  }
}
.cont {
  margin-top: -80px;
  padding: 0 15px;
  ul {
    li {
      background: #fff;
      border-radius: 6px;
      padding: 10px;
      margin-bottom: 15px;
      h5 {
        padding: 0 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        img {
          height: 26px;
        }
      }
      b,
      span {
        font-weight: normal;
        font-size: 12px;
        line-height: 26px;
      }
      b {
        color: #7f7f7f;
      }
      span.number {
        color: #5b87f9;
        font-size: 16px;
        font-weight: bold;
      }
      .van-button {
        padding-left: 10px;
        padding-right: 10px;
      }
      .col-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        .van-button {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
