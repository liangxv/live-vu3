<template>
    <van-nav-bar title="发布租房买房" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
        <van-field name="radio" label="请选择发布类型">
            <template #input>
                <van-radio-group v-model="checked" direction="horizontal">
                    <van-radio name="1">卖房</van-radio>
                    <van-radio name="2">出租</van-radio>
                    <van-radio name="2">求购</van-radio>
                    <van-radio name="2">求租</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field label="标题" placeholder="填写标题" />
        <van-field v-model="result" is-link readonly name="picker" label="房源状态" placeholder="请选择"
            @click="showPicker = true" />
        <van-popup v-model:show="showPicker" position="bottom">
            <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup>
import { ref } from 'vue';
const onClickLeft = () => history.back();

const checked = ref('1');

const result = ref('');
const showPicker = ref(false);
const columns = [
    { text: '新房', value: '1' },
    { text: '二手房', value: '2' },
    { text: '租房', value: '3' },
];

const onConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    showPicker.value = false;
};

</script>
<style scoped></style>