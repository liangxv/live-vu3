<template>
    <van-nav-bar title="登录哔哩哔哩" />
    <div class="flex-container">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="user.username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="user.password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="user.validateCode"  name="验证码" label="验证码" placeholder="验证码" autosize
                    :rules="[{ required: true, message: '请填验证码' }]">
                    <template #right-icon>
                        <van-image src="http://192.168.1.78:8080/kaptcha/image"></van-image>
                    </template>
                </van-field>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/api/user'; 
import { useRouter  } from 'vue-router';
const router = useRouter();
const user = ref({});
const onSubmit = async () => {
    let data = await login(user.value);
    if (data.code === 200) {
        //保存touken到本地
        localStorage.setItem('token', data.data);
        // 登录成功
        router.push('/my');
    } else {
        // 登录失败
        console.log(data);
    }
};
</script>

<style scoped>
.flex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
}
</style>