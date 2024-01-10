<template>
    <van-nav-bar title="二手商品详情" left-arrow @click-left="onClickLeft" @click-right="showShare = true">
        <template #right>
            <van-icon name="share-o" size="18" />
        </template>
    </van-nav-bar>
    <van-cell>
        <template #title>
            <h3 style="margin: 0;">{{ secondDetail.title }}</h3>
        </template>
        <template #label>
            <van-tag round plain type="warning" v-for="tag in resultArray" style="margin-right: 4px;">{{ tag }}</van-tag>
        </template>
        <template #value>
            <van-tag plain type="warning" size="medium" v-if="secondDetail.category == 0">出售</van-tag>
            <van-tag plain type="primary" size="medium" v-else-if="secondDetail.category == 1">求购</van-tag>
            <van-tag plain type="primary" size="medium" v-else>二手出售</van-tag>
            <h3 style="color: #ff6e59;">￥{{ price }}</h3>
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
<!--  产品说明-->
    <div style="margin-left: 15px;">
        <h3>产品说明</h3>
        <p>{{ secondDetail.description }}</p>
        <van-image :src="secondDetail.imagesrc"></van-image>
    </div>
    <van-action-bar>
        <van-action-bar-button type="primary" icon="phone" text="联系Ta" @click="onContact" />
    </van-action-bar>
    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" :description="'联系人: ' + secondDetail.contacts"
      close-on-click-action @select="onSelectContact()"/>
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
</template>


<script setup>
import {ref,onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {showToast} from 'vant';
import {getSecondDetails} from "@/api/secondHand.js";
import {getUser} from "@/api/user.js";
const id = ref(0);
const route = useRoute();
const onClickLeft = () =>history.back();
const showShare = ref(false);

//获取二手商品的信息
const  secondDetail = ref({});
const  advantageArray = ref[","," "];
const  resultArray =ref([]);
const  price = ref(0);

const details = async () =>{
    let data = (await getSecondDetails(id.value)).data;
    secondDetail.value = data;

 //在获取数据之后进行检查和处理
    if (typeof secondDetail.value.Advantage === "string"){
        resultArray.value = secondDetail.value.Advantage.split(new RegExp(advantageArray.join("|"),"g"));
    }
    if (secondDetail.value.price){
        price.value = formatNumber(secondDetail.value.price);
    }
}
//获取用户信息
const user = ref({});
const getUserIndfo = async () =>{
    let data = (await getUser(secondDetail.value.userId)).data;
    user.value = data;
}
//获取联系方式
const onContact = () =>{
    show.value = true
    actions.value = [
        {name: '选项1'},
        {name: '选项2'},
        {name: '拨打电话',subname: secondDetail.value.contactinformation},
    ]
    console.log(secondDetail.value.contactinformation)
};
const onSelectContact = (action,index) => {
    console.log(action)
    console.log(index)
};
 //价格的显示
const formatNumber = (num) =>{
    if (num<1000){
        return num.toString();
    }else if (num < 10000){
        const formattedNm = (num / 1000).toFixed(1);
        return formattedNm + '千';
    }else {
        const formattedNm = (num / 10000).toFixed(1);
        return formattedNm +'万';
    }
}
async function fetchData() {
    try {
        await details();
        //只有details执行完才会执行下面的代码
        await getUserIndfo();
        //getUserInfo() 完成后才会执行下面的代码
    } catch (error) {
        //打印错误信息
        console.log(error);
    }
}
onMounted(() => {
    //从路由参数中获取动态参数
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

const onSelect = (option) =>{
    showToast(option.name);
    showShare.value = false;
}
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