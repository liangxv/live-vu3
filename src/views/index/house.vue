<template>
    <van-sticky>
        <van-nav-bar left-text="E网房屋租售" left-arrow @click-left="onClickLeft">
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
    </van-sticky>

    <van-tabs class="channels-tabs" v-model:active="active" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
        <van-tab v-for="item in releaseStateList" :title="item.label" :key="item.releaseState">
            <van-tabs v-model:active="type" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
                <van-tab v-for="itme2 in houseStateList" :title="itme2.label" :key="itme2.houseState">
                    <template v-if="item.releaseState === 0">
                        <article-list :channel="itme2" :releaseStateArr="item"></article-list>
                    </template>

                    <template v-else>
                        <house-list :channel="itme2" :releaseStateArr="item"></house-list>

                    </template>

                    <!--                    二级-->
                </van-tab>
            </van-tabs>
        </van-tab>

    </van-tabs>

    <!--            一级标签-->

    <van-floating-bubble icon="add" @click="onClick" />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import ArticleList from "./components/article-list.vue";
import HouseList from "./components/house-list.vue"
const router = useRouter();
const active = ref(0);
const type = ref(0);
const onClickLeft = () => history.back();

const houseStateList = reactive(
    [
        {
            houseState: 1,
            label: '新房'
        },
        {
            houseState: 2,
            label: '二手房'
        },
        {
            houseState: 3,
            label: '租房'
        },
    ]);

const releaseStateList = reactive(
    [
        {
            releaseState: 0,
            label: "出租出售"
        },

        {
            releaseState: 1,
            label: "买房租房"
        }
    ]);
const onClick = () => {
    router.push('/publish/housepublish');
}
</script>

<style scoped></style>