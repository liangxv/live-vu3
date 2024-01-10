<template>
<div>
    <van-nav-bar title="二手买卖" left-text="返回" left-arrow>
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
        <van-tab title="出售">
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in images" :key="image">
                    <img :src="image" class="my-image" />
                </van-swipe-item>
            </van-swipe>
            <van-tabs v-model:active="actives" swipeable>
                <van-tab title="推荐">
                    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <van-row v-for="item in list" :key="item.id" style="border: 1px solid #f7f8f9;"
                                 @click="secondDetail(item.id)" class="van-haptics-feedback">
                            <van-col span="8">
                                <div style="margin: 5px; border-radius: 4px; overflow: hidden; ">
                                    <van-image width="130" height="100" fit="fill" :src="item.imagesrc"/>
                                </div>
                            </van-col>
                            <van-col span="16">
                                <van-tag plain type="warning" v-if="item.category == 0">出售&nbsp;</van-tag>
                                <van-tag plain type="primary" v-else-if="item.category == 1">求购&nbsp;</van-tag>
                                <van-tag plain type="primary" v-else>求租</van-tag>
                                <span style="font-size: 15px;">&nbsp;&nbsp;{{ item.title }}</span>
                                <p><span  class="highlighted-price" style="font-size: 14px;">￥{{ item.price }}</span><span>| {{ item.contacts }}</span></p>
                            </van-col>
                        </van-row>
                    </van-list>
                </van-tab>
                <van-tab title="数码">nei2</van-tab>
                <van-tab title="家具">nei3</van-tab>
                <van-tab title="家电">nei4</van-tab>
                <template #nav-right>
                    <van-icon name="wap-nav" class="channels-tabs"></van-icon>
                </template>
            </van-tabs>
            <van-floating-bubble axis="xy" icon="add" magnetic="x" @offset-change="onOffsetChange" @click="onClick" />
        </van-tab>
        <van-tab title="求购">
            内容2
        </van-tab>
    </van-tabs>
</div>
</template>

<script setup>
import { getData } from '@/api/secondHand.js';
import { ref, onMounted } from 'vue';
const list = ref([]);
const total = ref(0);
const loading = ref(false);
const finished = ref(false);
const param = ref({
     pageNum: 1,
     pageSize: 5,
});


    const onLoad = async () => {
        if (loading.value || finished.value) return;

        loading.value = true; // 设置为加载中状态

        try {
            const data = await getData({ ...param.value });
            list.value = list.value.concat(data.data.list);
            total.value = data.data.total;

            param.value.pageNum++;

            // 数据加载全部完成
            if (list.value.length >= total.value) {
                finished.value = true;
            }
        } catch (error) {
            console.error('数据加载失败:', error);
        } finally {
            loading.value = false; // 加载结束，设置为非加载中状态
        }
    };

    const active = ref(0);
    const actives = ref(0);
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
const secondDetail = (id) =>{
    router.push('/Second/findTitle/'+id);
}
const onClick = () => {
    router.push('/publish/SecondHandMarket')
}

     onMounted(onLoad); // 组件挂载时加载数据
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