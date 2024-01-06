<template>
    <div class="recharge">
        <van-field v-model="amount" label="充值金额" placeholder="请输入充值金额" type="number"></van-field>
        <van-cell-group>
            <van-cell title="支付方式" v-model="paymentMethod" @click="showPaymentMethods" clickable></van-cell>
        </van-cell-group>

        <!-- 支付方式弹窗 -->
        <van-popup v-model:show="showPaymentPopup" position="bottom">
            <van-picker
                    v-model="paymentMethods"
                    :columns="paymentMethods"
                    @cancel="closePaymentMethods"
                    @confirm="selectPaymentMethod"
            ></van-picker>
        </van-popup>

        <van-button type="primary" block @click="recharge">确认充值</van-button>
    </div>
</template>

<script setup>
    import { defineComponent, ref } from 'vue';
    import { Toast, Popup } from 'vant';
    import { recharge } from '@/api/recharge.js';

            const amount = ref('');
            const paymentMethod = ref(''); // 当前选择的支付方式
            const showPaymentPopup = ref(false); // 是否显示支付方式弹窗

            const paymentMethods = [{text:'微信支付',value:'1'},
                {text:'支付宝',value:'2'},
                {text:'银行卡',value:'3'}]; // 支付方式选项

            const showPaymentMethods = () => {
                showPaymentPopup.value = true;
            };

            const closePaymentMethods = () => {
                showPaymentPopup.value = false;
            };

            const selectPaymentMethod = (value) => {
                paymentMethod.value = value;
                closePaymentMethods();
            };

            //const recharged = () => {
                // if (amount.value === '') {
                //     return;
                // }
                //
                // if (paymentMethod.value === '') {
                //     return;
                // }

                // 执行充值逻辑
                const recharge = async () => {
                    await recharge(amount);
                };

            //     // 清空输入和选择
            //     amount.value = '';
            //     paymentMethod.value = '';
            // };

</script>

<style scoped>

</style>