<template>
    <van-nav-bar title="选择顶置套餐" left-arrow @click-left="onClickLeft" />
    <div class="van-hairline--bottom" style="margin-left: 10px;">
        <h1 style="color: #ff4314; margin-top: 0;">信息顶置</h1>
        <p style="color: #7f7f7f;">系统自动把推广信息置顶到高曝光位置，按展示天数付费，审核成功后立即生效!</p>
        <h3>选置顶</h3>
    </div>

    <van-radio-group v-model="checked">
        <van-cell-group inset>
            <van-cell title="1天" clickable @click="checked = '1'">
                <template #right-icon>
                    <van-radio name="1" />
                </template>
            </van-cell>
            <van-cell title="3天" clickable @click="checked = '2'">
                <template #right-icon>
                    <van-radio name="2" />
                </template>
            </van-cell>
            <van-cell title="7天" clickable @click="checked = '3'">
                <template #right-icon>
                    <van-radio name="3" />
                </template>
            </van-cell>
            <van-cell title="15天" clickable @click="checked = '4'">
                <template #right-icon>
                    <van-radio name="4" />
                </template>
            </van-cell>
            <van-cell title="30天" clickable @click="checked = '5'">
                <template #right-icon>
                    <van-radio name="5" />
                </template>
            </van-cell>
            <van-cell title="60天" clickable @click="checked = '6'">
                <template #right-icon>
                    <van-radio name="6" />
                </template>
            </van-cell>
        </van-cell-group>
    </van-radio-group>
    <div style="font-size: 15px; text-align: center;">
        <span>需要支付: </span>
        <span style="color: #ff3a08;">¥ {{ price }}</span>
    </div>
    <div style="margin: 10px;">
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" size="large">立即支付</van-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const onClickLeft = () => history.back();

const checked = ref('1');
const price = ref(99999999999);
</script>

<style scoped></style>