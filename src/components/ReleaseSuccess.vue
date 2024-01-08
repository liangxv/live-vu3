<template>
    <van-nav-bar title="发布成功" left-arrow @click-left="onClickLeft" />
    <div class="flex-container">
        <img src="@/assets/avg/releasesuccess.svg">
        <h4>信息发布成功!</h4>
        <h4 style="color: #48a7ff;">您可以进入列表，置顶或推广您的信息!</h4>

    </div>
    <van-action-bar>
        <van-action-bar-button color="#be99ff" type="warning" text="查询信息" @click="queryinformation()" />
        <van-action-bar-button color="#7232dd" type="danger" text="信息列表" @click="infolist()" />
    </van-action-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter,useRoute  } from 'vue-router';
const onClickLeft = () => history.back();

// 详细信息路由
const detail = ref('');

// 列表路由
const list = ref('');

const router = useRouter();
const route = useRoute();

const queryinformation = () => {
    router.push(detail.value);
}

const infolist = () => {
    router.push(list.value);
}

onMounted(() => {
    detail.value = route.params.detail || '';
    console.log(detail.value);
    list.value = route.params.list || '';

});
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