<template>
    <div class="recharge">
        <van-field v-model="amount" label="充值金额" placeholder="请输入充值金额" type="number"></van-field>
        <van-cell-group>
            <van-cell title="支付方式" :value="paymentMethod" @click="showPaymentMethods" clickable></van-cell>
        </van-cell-group>

        <!-- 支付方式弹窗 -->
        <van-popup v-model="showPaymentPopup" position="bottom">
            <van-picker
                    :columns="paymentMethods"
                    show-toolbar
                    @cancel="closePaymentMethods"
                    @confirm="selectPaymentMethod"
            ></van-picker>
        </van-popup>

        <van-button type="primary" block @click="recharge">确认充值</van-button>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    import { Toast, Popup } from 'vant';

    export default defineComponent({
        components: {
            [Toast.name]: Toast,
            [Popup.name]: Popup
        },
        setup() {
            const amount = ref('');
            const paymentMethod = ref(''); // 当前选择的支付方式
            const showPaymentPopup = ref(false); // 是否显示支付方式弹窗

            const paymentMethods = ['微信支付', '支付宝', '银行卡']; // 支付方式选项

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

            const recharge = () => {
                if (amount.value === '') {
                    Toast('请输入充值金额');
                    return;
                }

                if (paymentMethod.value === '') {
                    Toast('请选择支付方式');
                    return;
                }

                // 执行充值逻辑
                Toast('充值成功');

                // 清空输入和选择
                amount.value = '';
                paymentMethod.value = '';
            };

            return {
                amount,
                paymentMethod,
                showPaymentPopup,
                paymentMethods,
                showPaymentMethods,
                closePaymentMethods,
                selectPaymentMethod,
                recharge
            };
        }
    });
</script>

<style>
    .recharge {
        padding: 20px;
    }
</style>