<template>
    <div>aaa</div>
</template>

<script setup>
    import { useRouter, ref } from 'vue-router';
    import { showToast } from 'vant';
    import { getDetail } from '@/api/house.js';
    import { getUser } from '@/api/user.js';

    const router = useRouter();
    const id = ref(0);
    const onClickLeft = () => history.back();
    const showShare = ref(false);

    // 获取车辆需求信息
    const carDetail = ref({});

    const details = async () => {
        let data = (await getDetail(id.value)).data;
        carDetail.value = data;
    };




</script>

<style scoped>

</style>