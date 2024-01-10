<template>

    <van-grid :column-num="4" clickable :border="false" style="margin-top: 15px; margin-dw: 15px;">
        <template v-for="item in gridItems" :key="item.text">
            <van-grid-item :icon="item.icon" :text="item.text" :badge="item.badge" :dot="item.dot"
                @click="item.clickHandler">
                <template #icon>
                    <img :src="item.iconSrc">
                </template>
            </van-grid-item>
        </template>
    </van-grid>

    <NavBottom></NavBottom>
</template>
<script setup>
import { ref } from 'vue';
import NavBottom from '@/views/navbottom.vue';


// 弹窗
const show = ref(false);


// 页面跳转
import { useRouter } from 'vue-router';
const router = useRouter();

const gridItems = [
      {
        text: "招聘求职",
        dot: true,
        iconSrc: "src/assets/avg/job.svg",
        clickHandler: () => {
          show.value = true;
        }
      },
      {
        text: "房屋租售",
        badge: "99+",
        iconSrc: "src/assets/avg/house.svg",
        clickHandler: () => router.push('/index/house'),
      },
      {
        text: "二手市场",
        dot: true,
        iconSrc: "src/assets/avg/secondhand.svg",
        clickHandler: () => router.push('publish/SecondFindAll'),
      },
      {
        text: "拼车租车",
        dot: true,
        iconSrc: "src/assets/avg/car.svg",
        clickHandler: () => {
          show.value = true;
        }
      },
      {
        text: "本地商家",
        dot: true,
        iconSrc: "src/assets/avg/merchant.svg",
        clickHandler: () => {
          show.value = true;
        }
      },
      {
        text: "生活服务",
        dot: true,
        iconSrc: "src/assets/avg/server.svg",
        clickHandler: () => {
          show.value = true;
        }
      },
      {
        text: "相亲交友",
        dot: true,
        iconSrc: "src/assets/avg/love.svg",
        clickHandler: () => {
          show.value = true;
        }
      },
      {
        text: "社区茶座",
        dot: true,
        iconSrc: "src/assets/avg/community.svg",
        clickHandler: () => {
          show.value = true;
        }
      },
    ];
</script>
<style scoped>
img {
    width: 28px;
}
</style>