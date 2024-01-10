<template>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-row v-for="item in list" :key="item.id" @click="onItemClick(item.id, item.typeId)" class="van-hairline--top-bottom">

            <van-col span="24">
                <div class="van-ellipsis" style="padding: 5px">
                    <van-tag plain type="warning" style="margin-right: 5px" v-if="item.typeId == 1">房屋租售</van-tag>
                    <van-tag plain type="warning" style="margin-right: 5px" v-else-if="item.typeId == 2">二手市场</van-tag>
                    <van-tag plain type="warning" style="margin-right: 5px" v-else>拼车租车</van-tag>
                    <b>{{ item.title }}</b>
                </div>
            </van-col>
            <van-row>
                <van-col span="16">

                </van-col>
                <van-col span="8">
                    <p style="font-size: 15px; display: flex; align-items: center; justify-content: flex-end;">
                        <img src="@/assets/avg/views.svg" style="margin-right: 5px;">
                        {{ item.views  }}
                    </p>
                    
                </van-col>
            </van-row>
        </van-row>

    </van-list>
</template>

<script setup>
import { ref } from 'vue';
import { getData } from '@/api/audit.js';
// 路由
import { useRouter } from 'vue-router';
const router = useRouter();
// const props = defineProps({


// })

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const params = ref({
    pageNum: 1,
    pageSize: 10
})

const onLoad = async () => {
    const { data } = await getData(params.value)
    setTimeout(() => {
        list.value = list.value.concat(data.list)
        params.value.pageNum++
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= data.total) {
            finished.value = true;
        }
    }, 100);
};

const onItemClick = (id, typeId) => {
    if (typeId == 1) {
        router.push('/house/detail/' + id)
    } else if (typeId == 2) {
        router.push('/Second/findTitle/' + id)
    }
}
</script>

<style scoped>
img {
    height: 15px;

}
</style>