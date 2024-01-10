<template>
  <van-nav-bar title="支付" left-arrow @click-left="onClickLeft" />
  <div style="text-align: center; margin-top: 50px;">
    <span>待支付: </span>
    <span style="color: #ff3300; font-size: 20px;">¥ {{ price }}</span>
  </div>
  <van-cell :title="'可用E币: ' + balance" size="large" center clickable @click="recharge()">
    <template #value>
      <p style="color:#2f9bff;">充值</p>
    </template>
  </van-cell>

  <van-radio-group v-model="checked">
    <van-cell-group inset>
      <van-cell title="微信支付" clickable @click="checked = '1'" center="">
        <template #icon>
          <img src="@/assets/avg/wechat.svg">
        </template>
        <template #right-icon>
          <van-radio name="1" />
        </template>
      </van-cell>
      <van-cell title="E币支付" clickable @click="checked = '2'">
        <template #icon>
          <img src="@/assets/avg/rmb.svg">
        </template>
        <template #right-icon>
          <van-radio name="2" />
        </template>
      </van-cell>
    </van-cell-group>
  </van-radio-group>
  <div style="margin: 10px;">
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" size="large" @click="onClick()">立即支付</van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { rechargeAndPay } from '@/api/user.js'
const onClickLeft = () => history.back();
const price = ref(1.5);
const balance = ref(99);
const checked = ref('1');

const route = useRoute();
const router = useRouter();
const pay = ref({});
pay.value.messageId = route.params.id;
pay.value.typeId = route.params.typeId;
pay.value.price = price.value;

const onClick =async () => {

  let data= await rechargeAndPay(pay.value);
  if (data.code == 200){
    router.push({
    name: 'releasesuccess',
    params: {
      id: pay.value.messageId,
      typeId: pay.value.typeId
    }
  })
  }
  
}

const recharge = () => {
  console.log('充值');
}
</script>

<style scoped>
img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>