<template>
    <van-nav-bar title="登录哔哩哔哩" :right-text="getRightText()" @click-right="onClickRight" />
    <div class="flex-container" v-if="!isPhone">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="user.username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="user.password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="user.validateCode" name="验证码" label="验证码" placeholder="验证码" autosize
                    :rules="[{ required: true, message: '请填验证码' }]">
                    <template #right-icon>
                        <van-image src="http://localhost:8080/kaptcha/image"></van-image>
                    </template>
                </van-field>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
    <div class="flex-container" v-if="isPhone">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="user.tel" name="电话号码" label="电话号码" placeholder="电话号码"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="user.validateCode" name="验证码" label="验证码" placeholder="验证码" autosize
                    :rules="[{ required: true, message: '请填验证码' }]">
                    <template #button>
                        <van-button size="small" :disabled="isSend"  type="primary" @click="onSms()">发送验证码</van-button>
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
import { login, login2, sms } from '@/api/user';
import { useRouter } from 'vue-router';
const isPhone = ref(true)
const router = useRouter();
const user = ref({});
const onSubmit = async () => {
    let data = {};
    if (isPhone.value) {
        data = await login2(user.value);
    } else {
        data = await login(user.value);
    }
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

const onClickRight = () => {
    user.value = {}
    isPhone.value = !isPhone.value
}

const getRightText = () => {
    return isPhone.value ? '手机号码' : '账号';
}

const isSend = ref(false)
const onSms = async () => {
    let data = await sms(user.value.tel)
    if(data.code === 200){
        //按钮置灰60秒
        isSend.value = true
        setTimeout(() => {
            isSend.value = false
        }, 60000)
    }
}
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