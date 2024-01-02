<template >
    <div class="flex-container">
        <div style="background: linear-gradient(to right, #2e99fa, #59b7fe); padding-top: 10px;">
            <!-- 用户信息 -->
            <van-row>
                <van-col span="6" offset="1">
                    <van-image round width="70px" height="70px"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                </van-col>
                <van-col span="8">
                    <div style="color: #fff;font-size: 12px;">
                        <h2>我的名字</h2>
                        <p>手机:15878576740</p>
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
                    <van-cell title="我的E币:8.65" value="立即充值" is-link :border="false"
                        style="color: #fff; background: linear-gradient(to right, #2e99fa, #59b7fe);" />
                    <van-cell-group :border="false" inset>
                        <van-cell title="开通E网会员" icon="diamond-o" size="large" center clickable
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
                    <van-grid-item icon="orders-o" text="审核中" />
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
                    <van-grid-item icon="chat-o" text="我的互动" />
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
                    <van-cell title="我的订单" value="全部订单" is-link />
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
import NavBottom from '@/views/navbottom.vue';

// 页面跳转
import { useRouter } from 'vue-router';
const router = useRouter();
//设置
const setting = () => router.push('/my/setting');
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
</style>