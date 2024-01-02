<template>
    <van-nav-bar title="请选择发布类型信息" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-notice-bar left-icon="volume-o" text="禁止发布黄,赌,毒及相关有关国家禁令禁止的内容" />
    <van-grid :column-num="4" clickable :border="false" style="margin-top: 15px; margin-dw: 15px;">
        <van-grid-item icon="home-o" text="招聘求职" dot @click="show = true" />
        <van-grid-item icon="search" text="房屋租售" badge="99+" @click="housepublish()" />
        <van-grid-item icon="home-o" text="二手市场" dot />
        <van-grid-item icon="search" text="拼车租车" badge="99+" />
        <van-grid-item icon="home-o" text="本地商家" dot />
        <van-grid-item icon="search" text="生活服务" badge="99+" />
        <van-grid-item icon="home-o" text="相亲交友" dot />
        <van-grid-item icon="search" text="社区茶座" badge="99+" />
    </van-grid>
    <van-highlight :keywords="keywords" :source-string="text" highlight-class="custom-class" style="margin: 15px 15px;" />
    <div style="margin: 0 20px;">
        <van-button type="primary" size="large">立即充值</van-button>
    </div>
    <van-action-sheet v-model:show="show" title="请选择">
        <div class="content">
            <van-grid :column-num="2" clickable :border="false" square :gutter="10">
                <van-grid-item icon="home-o" text="我要招人" />
                <van-grid-item icon="search" text="我要找人" @click="show = true" />
            </van-grid>
        </div>
    </van-action-sheet>
    <NavBottom></NavBottom>
</template>
<script setup>
import { ref } from 'vue';
import NavBottom from '@/views/navbottom.vue';
// 返回
const onClickLeft = () => history.back();

// 弹窗
const show = ref(false);

//剩余E币
const text = `你的E币: 56.9`;
const keywords = '56.9';

// 页面跳转
import { useRouter } from 'vue-router';
const router = useRouter();
// 房屋发布
const housepublish = () => router.push('/publish/housepublish');
</script>
<style scoped>
.content {
    padding: 16px 16px 160px;
}

.custom-class {
    color: red;
}

.van-highlight {
    display: flex;
    justify-content: center;
    /* 在主轴上居中 */
}
</style>