<template>
    <van-sticky>
        <van-nav-bar left-text="E网房屋租售" left-arrow @click-left="onClickLeft">
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
    </van-sticky>

    <van-tabs v-model:active="active" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
        <van-tab title="出租出售">
            <van-tabs v-model:active="type" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
                <van-tab title="推荐">
                    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <van-row v-for="item in list" :key="item.id" style="border: 1px solid #f7f8f9;"
                            @click="houseDetail(item.id)" class="van-haptics-feedback">
                            <van-col span="8">
                                <div style="margin: 5px; border-radius: 4px; overflow: hidden; ">
                                    <van-image width="130" height="100" fit="fill" :src="item.imgSrc" />
                                </div>
                            </van-col>
                            <van-col span="16">
                                <van-tag plain type="warning" v-if="item.releaseState == 1">卖房</van-tag>
                                <van-tag plain type="primary" v-else-if="item.releaseState == 2">出租</van-tag>
                                <van-tag plain type="warning" v-else-if="item.releaseState == 3">求购</van-tag>
                                <van-tag plain type="primary" v-else>求租</van-tag>
                                <span style="font-size: 15px;">{{ item.title }}</span>
                                <p style="font-size: 14px;">{{ item.area }}㎡ | {{ item.houseType }}</p>
                            </van-col>
                        </van-row>
                    </van-list>
                </van-tab>
                <van-tab title="新房">内容 1</van-tab>
                <van-tab title="二手房">内容 1</van-tab>
                <van-tab title="租房">内容 1</van-tab>
            </van-tabs>
        </van-tab>
        <van-tab title="买房租房">内容 2</van-tab>
    </van-tabs>
    <van-floating-bubble icon="add" @click="onClick" />
</template>

<script setup>
import { ref } from 'vue';
import { getData } from '@/api/house.js';
const active = ref(0);
const type = ref(0);
const onClickLeft = () => history.back();
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const total = ref(0);

const param = ref({
    pageNum: 1,
    pageSize: 5,
});

const onLoad = async () => {

    let data = await getData({ ...param.value })
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

// 页面跳转
import { useRouter } from 'vue-router';
const router = useRouter();

//跳转到详情页面
const houseDetail = (id) => {
    router.push('/house/detail/' + id);
}

const onClick = () => {
    router.push('/publish/housepublish');
}
</script>

<style scoped></style>