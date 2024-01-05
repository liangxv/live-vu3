<template>
    <van-nav-bar title="发布" left-arrow @click-left="onClickLeft" />
    <div class="flex-container van-hairline--bottom">
        <img src="@/assets/avg/confirm.svg">
        <span style="color: #b3b3b3; margin-left: 5px;">信息已提交成功,请完成最后一步!</span>
    </div>
    <div>
        <div style="text-align: center; margin-top: 50px; margin-bottom: 70px;">
            <span>需支付: </span>
            <span style="color: #ff3300; font-size: 20px;">¥ {{ price }}</span>
            <p style="color: #b3b3b3; margin-left: 5px;">发布后，用户浏览您的信息时，可免费联系您!</p>
        </div>
    </div>
    <div style="margin: 10px;">
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" size="large">立即发布</van-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const onClickLeft = () => history.back();
const price = ref(99999999);
</script>

<style scoped>
img {
    height: 28px;
}

.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;

}
</style>