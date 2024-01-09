<template>
    <div>
        <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
            <van-row v-for="item in state.list" :key="item.id" style="border: 1px solid #f7f8f9;"
                @click="houseDetail(item.id)" class="van-haptics-feedback">
                <van-col span="16">
                    <van-tag plain type="warning" v-if="item.releaseState == 1">房屋出售</van-tag>
                    <van-tag plain type="primary" v-else-if="item.releaseState == 2">房屋出租</van-tag>
                    <van-tag plain type="warning" v-else-if="item.releaseState == 3">房屋求购</van-tag>
                    <van-tag plain type="primary" v-else>房屋求租</van-tag>
                    <span class="van-ellipsis" style="font-size: 15px;">{{ item.title }}</span>
                </van-col>
                <span class="van-multi-ellipsis--l3" style="font-size: 15px;">{{ item.houseDescribe }}</span>
                <van-col span="8">
                    <p style="font-size: 15px; text-align: left;">用户:123456</p>
                </van-col>
                <van-col span="8">
                    <p style="font-size: 15px; text-align: center;">{{ item.createTime }}</p>
                </van-col>
                <van-col span="8">                   
                    <p style="font-size: 15px; text-align: right;"><img src="@/assets/avg/views.svg">{{ item.views }}</p>
                </van-col>
                <van-col></van-col>
            </van-row>
        </van-list>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { getData } from "@/api/house";
import { useRouter } from 'vue-router'


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




//注册跳转组件
const router = useRouter();

const state = reactive({
    list: [],
    loading: false,
    finished: false,
    pageNumber: 1,
    pageSize: 5,

});


const onLoad = async () => {
    console.log("load");
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
const onClick = () => {
    router.push('/publish/housepublish');
}


</script>

<style scoped>
.cell-list {
    min-height: 100px;
}

img {
    width: 28px;
}
</style>