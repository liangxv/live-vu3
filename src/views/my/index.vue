<template >
    <div class="flex-container">
        <div style="background: linear-gradient(to right, #2e99fa, #59b7fe); padding-top: 10px;">
            <!-- 用户信息 -->
            <van-row>
                <van-col span="6" offset="1">
                    <van-uploader :after-read="afterRead">
                        <van-image round width="70px" height="70px"
                        :src='user.avatar' />
                    </van-uploader>
                    
                </van-col>
                <van-col span="8">
                    <div style="color: #fff;font-size: 12px;">
                        <h2>{{user.nickname}}</h2>
                        <p>{{user.tel}}</p>
                    </div>
                </van-col>
                <van-col offset="4">
                    <van-space>
                        <van-button icon="setting-o" type="primary" size="small" round @click="setting()" />
                        <van-button icon="volume-o" type="primary" size="small" round />
                    </van-space>
                </van-col>
            </van-row>
            <!-- 我的E币 -->
            <van-row>
                <van-col span="24">
                    <van-cell value="立即充值" is-link :border="false"
                        style="color: #fff; background: linear-gradient(to right, #2e99fa, #59b7fe);" >
                        <template #title>
                            <span class="custom-title">我的E币:</span>
                            <span>{{user.accountBalance}}</span>
                        </template>
                    </van-cell>
                    <van-cell-group :border="false" inset>
                        <van-cell title="开通E网会员" icon="diamond" size="large" center clickable
                            style="background-color: #3a3534; color: #f3d7b1;">
                            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                            <template #right-icon>
                                <van-button round color="#f3d7b1" size="small">开通会员</van-button>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-col>
            </van-row>
        </div>
        <!-- 信息管理 -->
        <van-row>
            <van-col span="24">
                <van-cell-group>
                    <van-cell title="信息管理" value="全部信息" is-link />
                </van-cell-group>
                <van-grid clickable :column-num="4" :border="false">
                    <van-grid-item icon="edit" text="我的发布" to="/my/info"/>
                    <van-grid-item icon="back-top" text="我的顶置" />
                    <van-grid-item icon="chart-trending-o" text="我的推广" />
                    <van-grid-item text="审核中" >
                        <template #icon>
                            <img src="@/assets/avg/audit.svg">
                        </template>
                    </van-grid-item>
                </van-grid>
            </van-col>
        </van-row>
        <!-- 我的服务 -->
        <van-row>
            <van-col span="24">
                <van-cell-group>
                    <van-cell title="我的服务" />
                </van-cell-group>
                <van-grid clickable :column-num="4" :border="false">
                    <van-grid-item icon="wap-home-o" text="我的主页" />
                    <van-grid-item icon="back-top" text="优惠劵" />
                    <van-grid-item icon="chat-o" text="我的互动" >
                        <template #icon>
                            <img src="@/assets/avg/interaction.svg">
                        </template>
                    </van-grid-item>
                    <van-grid-item icon="star-o" text="我的收藏" />
                    <van-grid-item icon="orders-o" text="招聘管理" />
                    <van-grid-item icon="shop-o" text="店铺管理" />
                    <van-grid-item icon="friends-o" text="群管理" />
                    <van-grid-item icon="user-circle-o" text="后台管理" />
                </van-grid>
            </van-col>
        </van-row>
        <!-- 我的订单 -->
        <van-row>
            <van-col span="24">
                <van-cell-group>
                    <van-cell title="我的订单" value="全部订单" is-link to="/my/order"/>
                </van-cell-group>
                <van-grid clickable :column-num="4" :border="false">
                    <van-grid-item icon="balance-pay" icon-color="#57aff0" text="待付款" />
                    <van-grid-item icon="logistics" icon-color="#57aff0" text="待发货" />
                    <van-grid-item icon="chat-o" icon-color="#57aff0" text="待收货" />
                    <van-grid-item icon="flower-o" icon-color="#57aff0" text="掉评价" />
                </van-grid>
            </van-col>
        </van-row>
        <NavBottom></NavBottom>
    </div>
</template>
<script setup>
// 页面跳转
import NavBottom from '@/views/navbottom.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfoMassage ,avatar} from '@/api/user.js';
import { uplodad } from '@/api/secondHand.js';
const avatars = ref('');
const router = useRouter();
//设置
const setting = () => router.push('/my/setting');

//充值

//获取用户信息
const user = ref({});
const getUserInfo = async () => {
    let data = (await getUserInfoMassage()).data;
    user.value = data;
}

const afterRead = async (file) => {
    //此时文件可以自行将文件上传至服务器
    console.log(file);
    let data = await uplodad(file);
    if (data.code === 200) {
        avatars.value = data.data;
    }
    await avatar(avatars.value)
    getUserInfo();
   ;
};

onMounted(() => {
    getUserInfo();
})

</script>
<style scoped>
.van-row {
    padding: 5px 0;

}

.flex-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* 100% 视窗高度 */
    background: #f1f2f8;
}

img {
    width: 28px;
}
</style>