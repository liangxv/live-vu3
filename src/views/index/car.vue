<template>
    <van-sticky>
        <van-nav-bar :left-text="leftText" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
    </van-sticky>

    <van-grid :column-num="4" :border="false" :center=true border="true">
        <van-grid-item v-for="item in requireTypeList"
                       :key="item.typeId"
                       :text="item.label"
                       @click="changeType(item.typeId)">
            <template #icon>
                <img :src="item.img">
            </template>
        </van-grid-item>
    </van-grid>

    <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
        <van-cell v-for="item in list"
                 :key="item.id"
                 @click="requireDetail(item.id)"
                  style="border-bottom: 10px solid #f3f3f3"
        >
            <!-- 第一行：头像，昵称，推广标识，需求类型 -->
            <div class="user-info">
                <van-image
                        round
                        width="3rem"
                        height="3rem"
                        :src="item.avatar"
                        class="avatar"
                />
                <span class="nickname">{{item.nickname}}</span>
                <span v-if="item.state==1 ? true : false" class="state">推广</span>

                <p v-if="item.requireTypeId == 1">
                    <span class="requireType" style="color: coral">人找车</span>
                    <van-tag size="small" class="tag1">拼车</van-tag>
                </p>
                <p v-else-if="item.requireTypeId == 2">
                    <span class="requireType" style="color: #59b7fe">车找人</span>
                    <van-tag size="small" class="tag1">准时</van-tag>
                    <van-tag size="small" class="tag2">价格可谈</van-tag>
                </p>
                <p v-else-if="item.requireTypeId == 3">
                    <span class="requireType" >车找货</span>
                    <van-tag size="small" class="tag1">准时</van-tag>
                    <van-tag size="small" class="tag2">价格可谈</van-tag>
                </p>
                <p v-else-if="item.requireTypeId == 4">
                    <span class="requireType">货找车</span>
                    <van-tag size="small" class="tag1">包车</van-tag>
                </p>
            </div>
            <!-- 第二行：出发地，目的地 -->
            <div class="place-info">
                <span class="departure">{{item.departure}}</span>
                <svg t="1704446307319" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="1413"
                     width="30" height="30">
                    <path d="M841.813333 623.957333H169.216a24.234667 24.234667 0 0 1 0-48.384h672.597333a24.234667 24.234667 0 1 1 0 48.384z"
                          p-id="1414"></path>
                    <path d="M854.784 623.957333a24.490667 24.490667 0 0 1-17.066667-6.570666L651.861333 441.856a24.234667 24.234667 0 1 1 33.194667-35.242667l186.282667 175.530667a24.234667 24.234667 0 0 1-16.554667 41.813333z"
                          p-id="1415"></path>
                </svg>
                <span class="destination">{{item.destination}}</span>
            </div>
            <!-- 第三行：乘客显示乘坐人数及出发时间，车辆显示车型及出发时间 -->
            <div class="other-info">
                <p v-show="item.requireTypeId == 1">
                    <span class="nums">{{item.passengerNums}}人</span>&nbsp;&nbsp;
                    <span class="date">{{ dayjs(item.departureTime).format('M月D日 HH:mm ') }}
                        &nbsp;&nbsp;出发</span>
                </p>
                <p v-show="item.requireTypeId == 2 || item.requireTypeId == 3">
                    <span class="carType" v-if="item.carType == 1">
                        小型货车</span>&nbsp;&nbsp;
                    <span class="carType" v-else-if="item.carType == 2">
                        大型货车</span>&nbsp;&nbsp;
                    <span class="carType" v-else-if="item.carType == 3">
                        五座轿车</span>&nbsp;&nbsp;
                    <span class="carType" v-else-if="item.carType == 4">
                        七座轿车</span>&nbsp;&nbsp;
                    <span class="date">{{ dayjs(item.departureTime).format('M月D日 HH:mm ') }}
                        &nbsp;&nbsp;出发</span>
                </p>
                <p v-show="item.requireTypeId == 4">
                    <span style="color: #59b7fe; font-weight: bold">
                        需要大货车</span>&nbsp;&nbsp;
                    <span class="date">{{ dayjs(item.departureTime).format('M月D日 HH:mm ') }}
                        &nbsp;&nbsp;出发</span>
                </p>
            </div>
            <!-- 第四行：乘客显示备注，车辆显示车主说明 -->
            <div class="tips">
                <p class="remarks">备注:{{item.requireRemarks}}</p>
            </div>
        </van-cell>
    </van-list>

</template>

<script setup>
    import {onMounted, ref, reactive} from 'vue';
    import {getData} from '@/api/car.js';
    import router from "../../router";
    import dayjs from 'dayjs'

    const onClickLeft = () => history.back();

    const leftText = ref("人找车");
    const requireTypeList = reactive([
        {
            typeId: 1,
            label: '人找车',
            img: '../../src/assets/car-1.png'
        }, {
            typeId: 2,
            label: '车找人',
            img: '../../src/assets/car-2.png'
        }, {
            typeId: 3,
            label: '车找货',
            img: '../../src/assets/car-3.png'

        }, {
            typeId: 4,
            label: '货找车',
            img: '../../src/assets/car-4.png'
        }
    ]);

    // 跳转到详情页面
    const requireDetail = (id) => {
        router.push('/car/detail/' + id);
    }

    const changeType = (typeId) => {
        if (typeId == 1){
            leftText.value = "人找车";
        } else if (typeId == 2){
            leftText.value = "车找人";
        } else if (typeId == 3){
            leftText.value = "车找货";
        } else if (typeId == 4){
            leftText.value = "货找车";
        }
    };

    const param = ref({
        pageNum: 1,
        pageSize: 5,
    });

    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const total = ref(0);

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
    img {
        height: 25px;
    }

    .user-info {
        height: 50px;
    }

    .place-info {
        height: 20px;
        text-align: center;
    }

    .other-info{
        height: 20px;
        text-align: center;
    }

    .tips{
        height: 20px;
        text-align: center;
    }

    .avatar {
        margin: 5px;
        padding: 5px;
        position: absolute;
        left: 1px;
        top: -2px;
    }

    .nickname {
        position: absolute;
        top: 9px;
        left: 65px;
        font-weight: bold;
        font-size: 14px;
        line-height: 15px;
        height: 15px;
        padding: 1px 2px;
        color: #222222;
    }

    .state {
        border: 1px #59b7fe solid;
        color: #59b7fe;
        position: absolute;
        top: 10px;
        left: 93px;
        font-size: 11px;
        padding: 1px 3px;
        height: 13px;
        border-radius: 2px;
        line-height: 13px;
    }

    .tag1{
        position: absolute;
        top: 33px;
        left: 66px;
        color: gray;
        background-color: #f1f2f8;
    }

    .tag2{
        position: absolute;
        top: 33px;
        left: 103px;
        color: gray;
        background-color: #f1f2f8;
    }

    .requireType {
        font-weight: bold;
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
    }

    svg {
        fill: #59b7fe;
        vertical-align: center;
        margin: -10px 37px 0px;
        text-align: center;
    }

    .departure{
        font-weight: bold;
        font-size: 20px;
        color: #222222;
    }
    .destination{
        font-weight: bold;
        font-size: 20px;
        color: #222222;
    }
    .nums{
        font-weight: bold;
    }

    .carType{
        font-weight: bold;
        color: coral;
    }

    .remarks{
        font-weight: bold;
        color: #3a3534;
    }
    .date{

    }
</style>