<template>
    <div>
        <van-nav-bar title="发布二手产品" left-text="" left-arrow @click-left="onClickLeft" />

        <van-form required="auto">
            <van-cell-group inset>
                <van-field name="radio" label="请选择发布类别">
                    <template #input>
                        <van-radio-group v-model="products.category" direction="horizontal">
                            <van-radio name="1">二手出售</van-radio>
                            <van-radio name="2">二手求购</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="products.title" name="标题" label="标题" placeholder="请输入标题"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="classification" is-link readonly label="分类" required placeholder="请选择"
                    @click="showPicker = true" />
                <van-popup v-model:show="showPicker" round position="bottom">
                    <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
                </van-popup>
                <div class="input-row">
                    <van-field v-model="products.price" type="digit" label="价格" required />
                    <van-radio-group v-model="ches" direction="horizontal">
                        <van-radio class="van-radio" name="1">不限</van-radio>
                    </van-radio-group>

                </div>
                <van-field v-model="products.advantage" is-link readonly label="产品优点" required placeholder="请选择"
                    @click="showPicker = true" />

                <van-field v-model="products.description" autosize label="产品描述" type="textarea" required
                    placeholder="请说明物品名称,参数,或价格说明等信息,500字内,请勿填写电话/微信等联系方式！" />
                <div class="input-row">
                    <van-field v-model="products.imagesrc" type="digit" label="添加图片" />
                    <van-uploader :after-read="afterRead" /> <!--上传图片 -->
                </div>

                <van-field v-model="products.contacts" required clearable label="联系人" placeholder="请输入用户名" />
                <van-field v-model="products.contactinformation" required clearable label="联系方式" placeholder="请输入手机号" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" @click="add()">
                    立即提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getSecondAdd } from '@/api/secondHand.js';
//路由
import { useRouter } from 'vue-router';
const router = useRouter();
const onClickLeft = () => history.back();
const products = ref({
    classification: ""
});
const afterRead = (file) => {
    //此时文件可以自行将文件上传至服务器
    console.log(file);
};


const ches = ref('0');
const id = ref("");
const add = async () => {
    id.value = (await getSecondAdd(products.value)).data;
    router.push({ name: 'release', params: { id: id.value, typeId: 2 } });
}

const showPicker = ref(false);
const columns = [
    { text: '数码', value: 1 },
    { text: '家具', value: 2 },
    { text: '家电', value: 3 },
    { text: '办公', value: 4 },
];
const classification = ref("");

const onConfirm = ({ selectedOptions }) => {
    classification.value = selectedOptions[0]?.text;
    products.value.classification = selectedOptions[0]?.value;
    showPicker.value = false;
};
</script>
<style scoped>
.input-row {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.van-radio {
    transform: scale(0.8);
    text-align: center;
}
</style>