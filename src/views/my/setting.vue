<template>
    <div class="flex-container">
        <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-cell title="个人信息" is-link label="头像,昵称,出生日期"/>
            <van-cell title="账号管理" is-link label="修改密码,修改手机号,社交账号绑定等" />
            <van-cell title="我的收货地址" is-link to="/my/addresslist"/>
        </van-cell-group>

        <van-button type="primary" size="large" style="margin-top: 10px; " @click="onClick()">退出登录</van-button>
        
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const onClickLeft = () => history.back();
const onClick = () => {
    // 退出登录
    localStorage.clear();
    // 跳转到登录页面
    router.push('/login');
}
</script>
<style scoped>
.flex-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* 100% 视窗高度 */
    background: #f1f2f8;
}
</style>