<script setup>
import { ref } from 'vue'
const active = ref(0)
const icon = {
    active: 'src/assets/avg/add1.svg',
    inactive:'src/assets/avg/add.svg',
};
</script>
<template >
    <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search">管家</van-tabbar-item>
        <van-tabbar-item to="/publish">
            <span>发布</span>
            <template #icon="props">
                <img :src="props.active ? icon.active : icon.inactive" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item icon="location-o" to="/Map">附近</van-tabbar-item>
        <van-tabbar-item icon="contact-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>
<style scoped></style>