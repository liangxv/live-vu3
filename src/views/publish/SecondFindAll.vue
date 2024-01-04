
<template>
    <div>
        <van-nav-bar title="二手乷卖" left-text="返回" left-arrow>
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <van-tabs v-model:active="active" swipeable title-active-color="rgba(25, 137, 250, 0.8)">
            <van-tab title="出售">
                <van-tabs v-model:active="active">
                    <van-tab
                            v-for="item in TypeList"
                            :title="item.label"
                            :key="item.typeId"
                            :name="item.typeId">
                        内容{{item.label}}
                    </van-tab>
                </van-tabs >
            </van-tab>
            <van-tab title="求购">
                内容2
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import { reactive,ref } from 'vue';
        name: "SecondFindAll"
              const  active = ref(0);
     const TypeList =  reactive([
         {
             typeId:1,
             label:'推荐'
         },{
             typeId: 2,
             label: '数码'
         },{
             typeId: 3,
             label: '家具'
         },{
             typeId: 4,
             label: '家电'
         }
     ])
</script>

<style scoped>

</style>