<template>
    <van-nav-bar title="房屋详情" left-arrow @click-left="onClickLeft" @click-right="showShare = true">
        <template #right>
            <van-icon name="share-o" size="18" />
        </template>
    </van-nav-bar>
    <van-cell>
        <template #title>
            <h3 style="margin: 0;">{{ houseDetail.title }}</h3>
        </template>
        <template #label>
            <van-tag round plain type="warning" v-for="tag in resultArray" style="margin-right: 4px;">{{ tag }}</van-tag>
        </template>
        <template #value>
            <van-tag plain type="warning" size="medium" v-if="houseDetail.releaseState == 1">卖房</van-tag>
            <van-tag plain type="primary" size="medium" v-else-if="houseDetail.releaseState == 2">出租</van-tag>
            <van-tag plain type="warning" size="medium" v-else-if="houseDetail.releaseState == 3">求购</van-tag>
            <van-tag plain type="primary" size="medium" v-else>求租</van-tag>
            <h3 style="color: #ff6e59;">{{ price }}</h3>
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
                </van-col>
            </van-row>
        </template>
    </van-cell>
    <van-row class="van-hairline--bottom">
        <van-col span="8">
            <div class="house-detail-container">
                <div class="house-detail-item">
                    <p>房屋面积</p>
                    <h3>{{ houseDetail.area }}</h3>
                </div>
            </div>
        </van-col>
        <van-col span="8">
            <div class="house-detail-container">
                <div class="house-detail-item">
                    <p>户型</p>
                    <h3>{{ houseDetail.houseType }}</h3>
                </div>
            </div>
        </van-col>
        <van-col span="8">
            <div class="house-detail-container">
                <div class="house-detail-item">
                    <p>装修情况</p>
                    <h3>{{ houseDetail.houseType }}</h3>
                </div>
            </div>
        </van-col>
    </van-row>
    <div style="margin-left: 15px;">
        <h3>房屋介绍</h3>
        <p>{{ houseDetail.houseDescribe }}</p>
        <van-image :src="houseDetail.imgSrc"></van-image>
    </div>
    <van-action-bar>
        <van-action-bar-button type="primary" icon="phone" text="联系Ta" @click="onContact" />
    </van-action-bar>
    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" :description="'联系人: ' + houseDetail.person"
        close-on-click-action @select="onSelectContact()"/>
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import { getDetails } from '@/api/house.js';
import { getUser } from '@/api/user.js';
const id = ref(0);
const route = useRoute();
const onClickLeft = () => history.back();
const showShare = ref(false);

//获取房屋信息
const houseDetail = ref({});
const advantageArray = [",", " "];  // 分隔符是逗号和空格
const resultArray = ref([])
const price = ref(0);


const details = async () => {
    let data = (await getDetails(id.value)).data;
    houseDetail.value = data;
    // 在获取数据之后进行检查和处理
    if (typeof houseDetail.value.houseAdvantage === "string") {
        resultArray.value = houseDetail.value.houseAdvantage.split(new RegExp(advantageArray.join("|"), "g"));
    }
    if (houseDetail.value.price) {
        price.value = formatNumber(houseDetail.value.price);
    }
};

//获取用户信息
const user = ref({});
const getUserInfo = async () => {
    let data = (await getUser(houseDetail.value.userId)).data;
    user.value = data;
}

//获取联系方式
const onContact = () => {
    show.value = true
    actions.value = [
        { name: '选项一' },
        { name: '选项二' },
        { name: '拨打电话', subname: houseDetail.value.contact },
    ]
    console.log(houseDetail.value.contact)
};

const onSelectContact = (action,index) => {
    console.log(action)
    console.log(index)
};

//数字格式显示
const formatNumber = (num) => {
    if (num < 1000) {
        return num.toString();
    } else if (num < 10000) {
        const formattedNum = (num / 1000).toFixed(1);
        return formattedNum + '千';
    } else {
        const formattedNum = (num / 10000).toFixed(1);
        return formattedNum + '万';
    }
}

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
.house-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.house-detail-item {
    text-align: center;
    margin-bottom: 1px;
    font-size: 12px;
}

.house-detail-item p {
    color: #b9b9b9;
}
</style>