<template>
    <van-sticky>
        <van-nav-bar left-text="E网房屋租售" left-arrow @click-left="onClickLeft" >
            <template #right>
                <van-icon name="search" size="18"/>
            </template>
        </van-nav-bar>
    </van-sticky>

    <van-tabs class="channels-tabs" v-model:active="active" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
        <van-tab
                v-for="item in releaseStateList"
                :title="item.label"
                :key="item.releaseState"
        >
            <van-tabs v-model:active="type" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
                <van-tab
                        v-for="itme2 in houseStateList"
                        :title="itme2.label"
                        :key="itme2.houseState"
                >
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
    <!-- 一级标签-->
    <van-floating-bubble icon="add" @click="onClick"/>

</template>

<script setup>
    import {ref, reactive} from 'vue';
    import {getData} from '@/api/house.js';
    import ArticleList from "./components/article-list.vue"
    // import houseArticleList from "./components/house-buy.vue";
    import HouseList from "./components/house-list.vue";

    const active = ref(0);
    const type = ref(0);
    const onClickLeft = () => history.back();
    const houseBuy=ref(1);
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const total = ref(0);

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

    const param = ref({
        pageNum: 1,
        pageSize: 5,
        releaseState: 0,
    });

    const onLoad = async () => {

        let data = await getData({...param.value})
        list.value = list.value.concat(data.data.list)
        total.value = data.data.total


        // 加载状态结束
        loading.value = false;

        param.value.pageNum++;

        // 数据全部加载完成
        if (list.value.length >= total.value) {
            finished.value = true;
        }


    };







</script>

<style scoped>

    /*.channels-tabs .van-tabs_wrap{*/
    /*    position: fixed;*/
    /*    top: 46px;*/
    /*    left: 0;*/
    /*    right: 0;*/
    /*    z-index: 1;*/
    /*}*/

</style>