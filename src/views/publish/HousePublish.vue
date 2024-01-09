<template>
    <van-nav-bar title="发布租房买房" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-form @submit="onSubmit">

        <van-field v-model="formHouseData.releaseState" name="releaseState" label="请选择发布类型" style="white-space:nowrap;">
            <template #input>
                <van-radio-group v-model="formHouseData.releaseState" direction="horizontal">
                    <van-radio name=1>卖房</van-radio>
                    <van-radio name=2>出租</van-radio>
                    <van-radio name=3>求购</van-radio>
                    <van-radio name=4>求租</van-radio>
                </van-radio-group>
            </template>
        </van-field>

        <van-field v-model="formHouseData.title" label="标题" placeholder="填写标题"></van-field>

        <van-field v-model="result" is-link readonly name="houseState" label="房源状态" placeholder="请选择"
            @click="showPicker1 = true"></van-field>

        <van-popup v-model:show="showPicker1" position="bottom">
            <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker1 = false" />

        </van-popup>

        <van-field v-model="formHouseData.area" label="面积" placeholder="填写面积">

        </van-field>

        <div class="price-row">
            <van-field class="price-field" v-model="formHouseData.price" label="房源价格" placeholder="填写价格">
                <template #input>
                    <van-checkbox-group v-model="formHouseData.isNegotiable" direction="horizontal">
                        <van-checkbox name="面议" shape="square">面议</van-checkbox>
                    </van-checkbox-group>
                </template>
            </van-field>
            <div class="manual-price-field" v-if="!formHouseData.isNegotiable.includes('面议')">
                <van-field v-model="formHouseData.price" label="输入价格" placeholder="填写价格"></van-field>
            </div>
        </div>

        <van-field v-model="result2" name="renovationState" label="装修情况" placeholder="请选择" readonly is-link
            @click="showPicker2 = true" />

        <van-popup v-model:show="showPicker2" position="bottom">
            <van-picker :columns="renovationStateList" @confirm="onConfirmRenovationState" @cancel="showPicker2 = false" />
        </van-popup>

        <van-field v-model="formHouseData.houseAdvantage" name="advantages" label="房源优点" placeholder="例如：离学校近,地铁口附近,随时看房" />

        <van-field v-model="formHouseData.houseDescribe" name="description" label="房源描述" type="textarea" rows="3" autosize
            placeholder="请输入房源描述" />

        <van-field name="uploader" label="添加图片">
            <template #input>
                <van-uploader v-model="imagevalue" :after-read="afterRead" multiple />
            </template>
        </van-field>

        <van-field v-model="formHouseData.person" label="联系人" placeholder="请输入联系人姓名" />

        <van-field v-model="formHouseData.contact" label="电话" placeholder="请输入联系人电话" type="tel" />


        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<style>
.price-row {
    display: flex;
    align-items: center;
}

.price-field {
    flex: 1;
    margin-right: 10px;
}

.manual-price-field {
    flex: 1;
}
</style>

<script setup>
import { ref } from 'vue';
import { houseAdd } from "@/api/house";
import { useRouter } from 'vue-router';
import { uplodad } from '@/api/secondHand.js';
const router = useRouter();

const onClickLeft = () => history.back();

const areaValue = ref('120㎡一室一厅一卫');

const checked = ref('1');
const result = ref('');
const result2 = ref('');

const imagevalue = ref([
]);

const afterRead = async (file) => {
    //此时文件可以自行将文件上传至服务器
    console.log(file);
    let data = await uplodad(file);
    if (data.code === 200) {
        formHouseData.value.imgSrc = data.data;
    }
    console.log(value.value);
};

const formHouseData = ref({
    isNegotiable: [],
    price: '',
    releaseState: '',
    title: '',
    houseState: '',
    area: '',
    renovationState: '',
    houseAdvantage: '',
    houseDescribe: '',
    imgSrc: [],
    person: '',
    contact: '',
});

let showPicker1 = ref(false);
let showPicker2 = ref(false);

const columns = [
    { text: '新房', value: '1' },
    { text: '二手房', value: '2' },
    { text: '租房', value: '3' },
];

const renovationStateList = [
    { text: '简装修', value: '1' },
    { text: '精装修', value: '2' },
    { text: '毛坯房', value: '3' },
];


const onConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    formHouseData.value.houseState = selectedOptions[0].value;
    showPicker1.value = false;
};

const onConfirmRenovationState = ({ selectedOptions }) => {
    result2.value = selectedOptions[0]?.text
    formHouseData.value.releaseState = selectedOptions[0]?.value
    showPicker2.value = false;
};

const onSubmit = async () => {

    const response = await houseAdd(formHouseData.value);

    console.log(response);

    if (response.code === 200) {
        console.log("提交");
        router.push({ name: 'release', params: { id: response.data, typeId: 1 } });
    } else {
        console.log('提交失败');
    }

};

</script>
