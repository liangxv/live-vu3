<template>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.id" :title="item.orderNum">
            <span plain type="primary">{{ item.price }} </span>
            <span plain type="primary"> | {{ item.createTime }}</span>
        </van-cell>
    </van-list>
</template>

<script setup>
import { ref } from 'vue';
import { findByUserId } from '@/api/order';

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const pageSize = ref(5);
const pageNum = ref(1);

const props = defineProps({
    typeId: ''
});

const onLoad = async () => {

    setTimeout(async () => {

        const data = await findByUserId({
            pageSize: pageSize.value,
            pageNum: pageNum.value,
            id: 1,
            typeId: props.typeId
        });
        const results = data.data.records;
        pageNum.value++;
        list.value.push(...results);


        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= data.data.total) {
            finished.value = true;
        }
    }, 100);

};

</script>

<style scoped></style>