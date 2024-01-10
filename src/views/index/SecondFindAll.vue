<template>
    <div>
        <van-sticky>
            <van-nav-bar title="二手买卖" left-text="返回" left-arrow @click-left="onclickLeft">
                <template #right>
                    <van-icon name="search" size="18" />
                </template>
            </van-nav-bar>
        </van-sticky>

        <van-tabs v-model:active="active" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
            <van-tab
                    v-for="item in categoryList"
                    :title="item.label"
                    :key="item.category"
            >
                <van-swipe :autoplay="3000" lazy-render>
                    <van-swipe-item v-for="image in images" :key="image">
                        <img :src="image" class="my-image" />
                    </van-swipe-item>
                </van-swipe>
<!--                <van-floating-bubble axis="xy" icon="add" magnetic="x" @offset-change="onOffsetChange" @click="onClick" />-->
                <van-tabs v-model:active="type" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
                    <van-tab
                            v-for="item2 in classificationList"
                            :title="item2.label"
                            :key="item2.classification">
                        <template v-if="item.category === 1">
                            <second-list :classification="item2.classification" :category="item.category"></second-list>
                        </template>

                        <template v-else>
                            <want-buy-list :classification="item2.classification" :category="item.category"></want-buy-list>
                        </template>

                    </van-tab>
                </van-tabs>
            </van-tab>
        </van-tabs>
    </div>
    <!-- 一级标签-->
    <van-floating-bubble axis="xy" icon="add" magnetic="x" @offset-change="onOffsetChange" @click="onClick" />
</template>

<script setup>



    import { ref, reactive } from 'vue';
    import { getData } from '@/api/secondHand.js';
    import SecondList from "./components/second-list.vue"
    import WantBuyList from "./components/WantBuy-list.vue"

    const active = ref(0);
    const type = ref(0);
    const onClickLeft = () => history.back();
    const houseBuy=ref(1);
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const total = ref(0);

    const classificationList = reactive(
        [
            {
                classification: 0,
                label: '推荐'
            },
            {
                classification: 1,
                label: '数码'
            },
            {
                classification: 2,
                label: '家具'
            },
            {
                classification: 3,
                label: '家电'
            },
            {
                classification: 4,
                label: '办公'
            },
        ]);
    const  categoryList = reactive(
        [
            {
                category: 1,
                label: "出售"
            },
            {
                category: 2,
                label: "求购"
            },
        ]);

    const param = ref({
        pageNum: 1,
        pageSize: 5,
        category: 0,
    });

    const onLoad = async () => {
        let data = await getData({...param.value})
        list.value = list.value.concat(data.data.list)
        total.value = data.data.total

        //加载状态结束
        loading.value = false;
        param.value.pageNum++;
        //数据加载完成
        if (list.value.length >= total.value){
            finished.value = true;
        }

    }

    const onOffsetChange = (offset) => {
        showToast(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`);
    };
    const images = [
        'https://img2.baidu.com/it/u=3179092281,422349459&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        'https://pic.izihun.com/pic/art_font/2019/01/16/10/1548674753_8425.jpg?imageMogr2/auto-orient/thumbnail/820x/format/jpeg',
    ];
    // 页面跳转
    import { useRouter } from 'vue-router';
    const router = useRouter();
    //跳转到详情页
    const secondDetail = (id) => {
        router.push('/Second/findTitle/' + id);
    }
    const onClick = () => {
        router.push('/publish/SecondHandMarket')
    }



</script>

<style scoped>
    .my-image {
        width: 100%;
        height: 200px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
    }

    .channels-tabs .hamburger-btn {
        /*固定定位*/
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 32px;
        background-color: #ffffff;
        /*设置透明度*/
        opacity: 0.902;
        font-size: 30px;
    }

    .highlighted-price {
        font-size: 30px;
        color: red;
        font-weight: bold;
    }
</style>
