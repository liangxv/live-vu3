<template>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <p v-for="item in list" :key="item.id">1</p>
    </van-list>
</template>

<script setup>
import { ref } from 'vue';
import { getData } from '@/api/audit.js';
// const props = defineProps({


// })

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const params = ref({
    pageNum:1,
    pageSize:5
})

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        const { data } = getData(params.value)
        list.value = data.list

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
};
</script>

<style scoped></style>