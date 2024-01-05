<template>
    <van-nav-bar title="发布成功" left-arrow @click-left="onClickLeft" />
    <div class="flex-container">
        <img src="@/assets/avg/releasesuccess.svg">
        <h4>信息发布成功!</h4>
        <h4 style="color: #48a7ff;">您可以进入列表，置顶或推广您的信息!</h4>

    </div>
    <van-action-bar>
        <van-action-bar-button color="#be99ff" type="warning" text="查询信息" />
        <van-action-bar-button color="#7232dd" type="danger" text="信息列表" />
    </van-action-bar>
</template>

<script setup>
import { ref } from 'vue';
const onClickLeft = () => history.back();
</script>

<style scoped>
    .flex-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 70vh;
    }
    h4 {
        margin: 3px;
    }
</style>