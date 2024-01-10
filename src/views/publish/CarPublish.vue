<template>
    <van-nav-bar title="发布拼车租车" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
        <van-field label="选择发布类别" :border="false" style="font-weight: bold"></van-field>
        <van-field v-model="formCarData.requireTypeId" name="requireTypeId">
            <template #input>
                <div>
                    <van-radio-group v-model="formCarData.requireTypeId" direction="horizontal">
                        <van-radio name=1>人找车</van-radio>
                        <van-radio name=2>车找人</van-radio>
                        <van-radio name=3>车找货</van-radio>
                        <van-radio name=4>货找车</van-radio>
                    </van-radio-group>
                </div>
            </template>
        </van-field>
        <van-field v-model="formCarData.departure" label="出发地点" placeholder="请输入"
                   style="font-weight: bold"></van-field>
        <van-field v-model="formCarData.destination" label="目的地点" placeholder="请输入"
                   style="font-weight: bold"></van-field>

<!--        <van-field v-model="formCarData.departureTime" label="乘车时间" placeholder="选择时间"-->
<!--                   style="font-weight: bold"></van-field>-->

        <van-field label="乘车时间" placeholder="选择时间" v-model="endTime"
                   style="font-weight: bold" readonly is-link @click="showPicker = true">
        </van-field>
        <van-popup v-model:show="showPicker" position="bottom">

            <van-picker-group
                    title="时间选择"
                    :tabs="['选择日期', '选择时间']"
                    @confirm="onConfirmDepartureTime"
                    @cancel="showPicker = false"
            >
                <van-date-picker
                        v-model="currentDate"
                        :min-date="minDate"
                        :max-date="maxDate"
                />
                <van-time-picker
                        v-model="currentTime"
                        :columns-type="columnsType"
                />
            </van-picker-group>

        </van-popup>

        <van-field v-model="formCarData.passengerNums" label="乘车人数"
                   style="font-weight: bold;">
            <template #input>
                <div>
                    <van-stepper v-model="formCarData.passengerNums"/>
                </div>
                &nbsp;&nbsp;人
            </template>
        </van-field>
        <van-field v-model="formCarData.requireRemarks" label="乘车说明" type="textarea" rows="3" autosize
                   placeholder="您可添加其他说明，500字内，请勿填写电话或微信等联系方式！"
                   style="font-weight: bold"/>
        <div style="margin: 16px;">
            <van-button block type="primary" native-type="submit">
                立即提交
            </van-button>
        </div>
    </van-form>

</template>

<script setup>
    import { ref } from 'vue';
    import { carAdd } from "@/api/car";
    import { useRouter } from 'vue-router';
    // import { datePickerProps } from 'vant/es/date-picker/style/index'

    const router = useRouter();
    const onClickLeft = () => history.back();

    const showPicker = ref(false);
    const currentDate = ref(["2023", "01", "11"]);
    const currentTime = ref(["09", "22", "34"]);
    const columnsType = ref(["hour", "minute", "second"]);
    const minDate = ref(new Date(2024, 0, 11));
    const maxDate = ref(new Date(2025, 11, 31));
    const endTime = ref("2023-01-11 09:22:34");

    const onSubmit = async () => {
        const response = await carAdd(formCarData.value);
        console.log(response);
        if (response.code === 200) {
            console.log("提交");
            router.push({ name: 'release', params: { id: response.data, typeId: 3 } });
        } else {
            console.log('提交失败');
        }
    };

    const formCarData = ref({
        requireTypeId: '',
        departure: '',
        destination: '',
        // departureTime: '',
        passengerNums: '',
        requireRemarks: '',

    });

    const onConfirmDepartureTime = () => {
        endTime.value = `${currentDate.value.join("-")} ${currentTime.value.join(":")}`;
        formCarData.value.departureTime = endTime;
        showPicker.value = false;
    };

</script>

<style scoped>

</style>