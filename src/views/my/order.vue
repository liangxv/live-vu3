<template>
    <div class="flex-container">
        <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />

        <van-search v-model="value" show-action placeholder="搜索信息" @search="onSearch">
            <template #action>
                <div @click="onSearch">搜索订单</div>
            </template>
        </van-search>

        <van-tabs v-model:active="active" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
            <van-tab
                    v-for="item in typeList"
                    :title="item.label"
                    :key="item.state">
                <OrderList :typeId="item.state"></OrderList>
            </van-tab>

        </van-tabs>
        <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
    </div>
</template>
<script setup>
    import {ref, reactive} from 'vue';
    import { showToast } from 'vant';
    import OrderList from "./orderList.vue";

    const typeList = reactive(
        [
            {state: null, label: "全部订单"},
            {state: 1, label: "待付款"},
            {state: 2, label: "已完成"},
            {state: 3, label: "退款/售后"}
        ]);

    const onSubmit = () => showToast('点击按钮');

    const onClickLeft = () => history.back();
    const value = ref('');
    const onSearch = (val) => showToast(val);
    const value1 = ref(0);

</script>
<style scoped>
    .flex-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        /* 100% 视窗高度 */
        background: #f1f2f8;
    }
</style>
