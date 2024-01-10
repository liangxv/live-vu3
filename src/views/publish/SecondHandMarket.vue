<template>
    <div>
        <van-nav-bar
                title="发布二手产品"
                left-text=""
                left-arrow
                @click-left="onClickLeft"/>

        <van-form @submit="onSubmit" required="auto">
            <van-cell-group inset>
                <van-field name="radio" label="请选择发布类别">
                    <template #input>
                        <van-radio-group v-model="checked" direction="horizontal">
                            <van-radio name="1">二手出售</van-radio>
                            <van-radio name="2">二手求购</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                        v-model="username"
                        name="标题"
                        label="标题"
                        placeholder="请输入标题"
                        :rules="[{ required: true, message: '请填写用户名' }]"/>
                <van-field
                        v-model="fieldValue"
                        is-link
                        readonly
                        label="分类"
                        required
                        placeholder="请选择"
                        @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" round position="bottom">
                    <van-picker
                            :columns="columns"
                            @cancel="showPicker = false"
                            @confirm="onConfirm"/>
                </van-popup>
                <div class="input-row">
                    <van-field v-model="digit" type="digit" label="价格" required/>
                    <van-radio-group v-model="ches" direction="horizontal">
                        <van-radio class="van-radio" name="1">不限</van-radio>
                    </van-radio-group>

                </div>
                <van-field
                        v-model="fieldValues"
                        is-link
                        readonly
                        label="产品优点"
                        required
                        placeholder="请选择"
                        @click="showPicker = true"
                />

                <van-field
                        v-model="message"
                        autosize
                        label="产品描述"
                        type="textarea"
                        required
                        placeholder="请说明物品名称,参数,或价格说明等信息,500字内,请勿填写电话/微信等联系方式！"
                />
                <div class="input-row">
                    <van-field v-model="digit" type="digit" label="添加图片" />
                    <van-uploader :after-read="afterRead" /> <!--上传图片 -->
                </div>

                <van-field
                        v-model="contacts"
                        required
                        clearable
                        label="联系人"
                        placeholder="请输入用户名"
                />
                <van-field
                        v-model="contactinformation"
                        required
                        clearable
                        label="联系方式"
                        placeholder="请输入手机号"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    立即提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    const afterRead = (file) => {
        //此时文件可以自行将文件上传至服务器
        console.log(file);
    };

    const active = ref(0);
    const checked = ref('1');
    const ches = ref('0');
    const columns = [
        {text: '杭州', value: 'Hangzhou'},
        {text: '宁波', value: 'Ningbo'},
        {text: '温州', value: 'Wenzhou'},
        {text: '绍兴', value: 'Shaoxing'},
        {text: '湖州', value: 'Huzhou'},
    ];
    const digit = ref('');

    const fieldValue = ref('');
    const showPicker = ref(false);
    const onConfirm = ({selectedOptions}) => {
        showPicker.value = false;
        fieldValue.value = selectedOptions[0].text;
        fieldValues.value = selectedOptions[0].text;
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