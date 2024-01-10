<template>
    <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="showShare = true">
        <template #title>
            <p>{{ title }}详情</p>
        </template>
        <template #right>
            <svg t="1704765936468" class="share-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9041" width="200" height="200"><path d="M 298.667 512 m -64 0 a 64 64 0 1 0 128 0 a 64 64 0 1 0 -128 0 Z" p-id="9042"></path><path d="M 725.333 512 m -64 0 a 64 64 0 1 0 128 0 a 64 64 0 1 0 -128 0 Z" p-id="9043"></path><path d="M 512 512 m -64 0 a 64 64 0 1 0 128 0 a 64 64 0 1 0 -128 0 Z" p-id="9044"></path></svg>
        </template>
    </van-nav-bar>

    <van-cell>
        <template #title>
            <div class="container">
                <p class="detail-title">{{ carDetail.departure }}到{{ carDetail.destination }}{{ title }}</p>
                <p v-if="carDetail.state==1 ? true : false" class="state">推广</p>
                <p class="contain-type">
                    <van-tag plain type="warning" size="medium"
                             v-if="carDetail.requireTypeId == 1"
                             class="tag">人找车</van-tag>
                    <van-tag plain type="primary" size="medium"
                             v-else-if="carDetail.requireTypeId == 2"
                             class="tag">车找人</van-tag>
                    <van-tag plain type="warning" size="medium"
                             v-else-if="carDetail.requireTypeId == 3"
                             class="tag">车找货</van-tag>
                    <van-tag plain type="warning" size="medium"
                             v-else-if="carDetail.requireTypeId == 4"
                             class="tag">货找车</van-tag>
                </p>
            </div>
        </template>
        <template #label>
            <p v-if="carDetail.requireTypeId == 1">
                <van-tag size="medium" text-color="grey" color="#f1f2f8">拼车</van-tag>
            </p>
            <p v-else-if="carDetail.requireTypeId == 2 || carDetail.requireTypeId == 3">
                <van-tag size="medium" text-color="grey" color="#f1f2f8">准时</van-tag>&nbsp;
                <van-tag size="medium" text-color="grey" color="#f1f2f8">价格可谈</van-tag>
            </p>
            <p v-else-if="carDetail.requireTypeId == 4">
                <van-tag size="medium" text-color="grey" color="#f1f2f8"></van-tag>&nbsp;
                <van-tag size="medium" text-color="grey" color="#f1f2f8">包车</van-tag>
            </p>
        </template>
    </van-cell>
    <van-cell is-link>
        <template #title>
            <van-row>
                <van-col>
                    <van-image :src="user.avatar" width="50px" height="50px" round></van-image>
                </van-col>
                <van-col>
                    <van-icon name="diamond-o" v-if="user.membershipLevel == 9" color="#face75" />
                    <span style="margin-left: 2px; font-size: 20px;">{{ user.nickname }}</span>
<!--                    <p>{{ dayjs(carDetail.departureTime).format('M月D日 HH:mm ') }}发布</p>-->
<!--                    <p>{{ dayjs(carDetail.departureTime).fromNow() }}发布</p>-->
                </van-col>
            </van-row>
        </template>
    </van-cell>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import { showToast } from 'vant';
    import { getDetail } from '@/api/car.js';
    import { getUser } from '@/api/user.js';
    import { ref, onMounted } from "vue";
    import dayjs from 'dayjs'
    import { relativeTime } from 'dayjs/plugin/relativeTime'

    // dayjs.extend(relativeTime);

    const route = useRoute();
    const id = ref(0);
    const onClickLeft = () => history.back();
    const showShare = ref(false);
    const title = ref("");

    // 获取车辆需求信息
    const carDetail = ref({});

    const details = async () => {
        let data = (await getDetail(id.value)).data;
        carDetail.value = data;

        // 获取标题
        if (carDetail.value.requireTypeId == 1){
            title.value = "人找车";
        } else if (carDetail.value.requireTypeId == 2){
            title.value = "车找人";
        } else if (carDetail.value.requireTypeId == 3){
            title.value = "车找货";
        } else if (carDetail.value.requireTypeId == 4){
            title.value = "货找车";
        }
        console.log(carDetail.value);
    };

    //获取用户信息
    const user = ref({});
    const getUserInfo = async () => {
        let data = (await getUser(carDetail.value.userId)).data;
        user.value = data;
    }

    //获取联系方式
    const onContact = () => {
        show.value = true
        actions.value = [
            { name: '选项一' },
            { name: '选项二' },
            { name: '拨打电话', subname: carDetail.value.contact },
        ]
        console.log(carDetail.value.contact)
    };

    const onSelectContact = (action,index) => {
        console.log(action)
        console.log(index)
    };

    async function fetchData() {
        try {
            await details();
            // details() 完成后才会执行下面的代码
            await getUserInfo();
            // getUserInfo() 完成后才会执行下面的代码
        } catch (error) {
            // 处理错误
            console.error(error);
        }
    }

    onMounted(() => {
        // 从路由参数中获取动态参数
        id.value = route.params.id;
        fetchData();
    })

    const options = [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
    ];

    const show = ref(false);
    const actions = ref([]);

    const onSelect = (option) => {
        showToast(option.name);
        showShare.value = false;
    };

</script>

<style scoped>
    .share-icon {
        width: 25px;
        height: 25px;
    }

    .container{
        display: flex;
        align-items: center;
    }

    .detail-title {
        font-size: 23px;
        font-weight: bold;
        width: 210px;
        height: 23px;
    }

    .state {
        border: 1px #59b7fe solid;
        color: #59b7fe;
        font-size: 11px;
        padding: 1px 1px;
        border-radius: 2px;
        width: 26px;
        height: 18px;
        line-height: 20px;
        text-align: center;
    }

    .tag{
        height: 20px;
        width: 37px;
        margin-left: 80px;
    }

</style>