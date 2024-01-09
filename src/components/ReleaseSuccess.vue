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
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const onClickLeft = () => history.back();

const id = ref('')
const typeId = ref('')
const useroute = useRoute();
const userouter = useRouter();
id.value = useroute.params.id;
typeId.value = useroute.params.typeId;

const queryinformation = () => {
    userouter.push(detail.value);
}

const infolist = () => {
    userouter.push("/my/info");
}

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