<template>
    <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
        <van-row v-for="item in state.list" :key="item.id" style="border: 1px solid #f7f8f9;" @click="houseDetail(item.id)"
            class="van-haptics-feedback">
            <van-col span="8">
                <div style="margin: 5px; border-radius: 4px; overflow: hidden; ">
                    <van-image width="130" height="100" fit="fill" :src="item.imgSrc" />
                </div>
            </van-col>
            <van-col span="16">
                <van-tag plain type="warning" v-if="item.releaseState == 1">房屋出售</van-tag>
                <van-tag plain type="primary" v-else-if="item.releaseState == 2">房屋出租</van-tag>
                <van-tag plain type="warning" v-else-if="item.releaseState == 3">房屋求购</van-tag>
                <van-tag plain type="primary" v-else>房屋求租</van-tag>
                <span class="van-ellipsis" style="font-size: 15px;">{{ item.title }}</span>
                <p style="font-size: 14px;">{{ item.area }}㎡ | {{ item.houseType }}
                    <span class="orange-text"
                        style="font-size: 14px; float: right; color: orangered; margin-right: 10px">面议</span>
                </p>
            </van-col>
        </van-row>
    </van-list>
</template>

<script setup>
import { reactive } from 'vue';
import { getData } from "@/api/house";
import { useRouter } from 'vue-router';
const props = defineProps({
    channel: {
        type: Object,
        required: true,
    },

    releaseStateArr: {
        type: Object,
        required: true,
    },
});

const state = reactive({
    list: [],
    loading: false,
    finished: false,
    pageNumber: 1,
    pageSize: 5,

});
//注册跳转组件
const router = useRouter();

const onLoad = async () => {
    const params = {
        houseState: props.channel.houseState,
        releaseState: props.releaseStateArr.releaseState,
        pageNum: state.pageNumber,
        pageSize: 5,

    };

    const { data } = await getData(params);

    const results = data.list;

    //2.
    state.list.push(...results);

    //3.
    state.loading = false;

    //4.
    if (results.length > 0) {
        state.pageNumber++;
    } else {
        state.finished = true;
    }

};

//跳转到详情页面
const houseDetail = (id) => {
    router.push('/house/detail/' + id);
}

</script>

<style>
.cell-list {
    min-height: 100px;
}
</style>