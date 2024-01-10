<template>
    <van-nav-bar title="请选择发布类型信息" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-notice-bar left-icon="volume-o" text="禁止发布黄,赌,毒及相关有关国家禁令禁止的内容" />
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

    <div style="margin: 0 20px;">
        <van-button type="primary" size="large">立即充值</van-button>
    </div>
    <van-action-sheet v-model:show="show" title="请选择">
        <div class="content">
            <van-grid :column-num="2" clickable :border="false" square :gutter="10">
                <van-grid-item icon="home-o" text="我要招人" />
                <van-grid-item icon="search" text="我要找人" @click="show = true" />
            </van-grid>
        </div>
    </van-action-sheet>
    <NavBottom></NavBottom>
</template>
<script setup>
import { ref } from 'vue';
import NavBottom from '@/views/navbottom.vue';
// 返回
const onClickLeft = () => history.back();

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
        clickHandler: () => router.push('/publish/housepublish')
      },
      {
        text: "二手市场",
        dot: true,
        iconSrc: "src/assets/avg/secondhand.svg",
        clickHandler: () => router.push('/publish/SecondHandMarket')
      },
      {
        text: "拼车租车",
        dot: true,
        iconSrc: "src/assets/avg/car.svg",
        clickHandler: () => router.push('/publish/carpublish')
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