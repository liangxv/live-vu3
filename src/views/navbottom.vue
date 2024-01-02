<script setup>
import { ref } from 'vue'
const active = ref(0)
</script>
<template >
    <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to="/index">首页</van-tabbar-item>
        <van-tabbar-item icon="search">管家</van-tabbar-item>
        <van-tabbar-item icon="plus" to="/publish">发布</van-tabbar-item>
        <van-tabbar-item icon="location-o">附近</van-tabbar-item>
        <van-tabbar-item icon="contact-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>
<style scoped></style>