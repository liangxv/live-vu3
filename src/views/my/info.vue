<template>
    <div class="flex-container">
        <van-nav-bar title="我的信息" left-arrow @click-left="onClickLeft" />

        <van-search v-model="value" show-action placeholder="搜索信息" @search="onSearch">
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>

        <van-cell title="单元格">
            <template #title>
                <van-highlight :keywords="keywords" :source-string="text" />
            </template>
            <template #extra>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="value1" :options="option1" />
                </van-dropdown-menu>
            </template>
        </van-cell>
        <van-tabs v-model:active="active" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
            <van-tab title="全部">内容 1</van-tab>
            <van-tab title="顶置">内容 2</van-tab>
            <van-tab title="推广">内容 3</van-tab>
            <van-tab title="已下架">内容 4</van-tab>
        </van-tabs>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
const onClickLeft = () => history.back();
const value = ref('');
const onSearch = (val) => showToast(val);
const text = '数量 128';
const keywords = '128';
const value1 = ref(0);
const option1 = [
    { text: '全部', value: 0 },
    { text: '房屋租售', value: 1 },
    { text: '活动商品', value: 2 },
];
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
    