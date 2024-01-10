<template>

    <van-list
            v-model:loading="state.loading"
            :finished="state.finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
        <van-row
                v-for="item in state.list"
                :key="item.id"
                style="border: 1px solid #f7f8f9;"
                @click="secondDetail(item.id)"
                class="van-haptics-feedback">

            <van-col span="8">
                <div style="margin: 5px; border-radius: 4px; overflow: hidden;">
                    <van-image width="130" height="100" fit="fill" :src="item.imagesrc"/>
                </div>
            </van-col>

            <van-col span="16">
                <van-tag plain type="warning" v-if="item.category == 1">二手求购</van-tag>
                <van-tag plain type="warning" v-else>二手求租</van-tag>
                <span class="van-ellipsis" style="font-size: 15px;">{{ item.title }}</span>
                <p style="ont-size: 14px;">￥{{ item.price }} | {{item.title}}
                </p>
            </van-col>

        </van-row>
    </van-list>
</template>

<script>
    import {ref,reactive} from 'vue';
    import {getData} from "../../../api/secondHand";
    import { useRouter } from 'vue-router';

    export default {
        props:{
            classification: Number,
            category: Number
        },
        setup(props){
            const router = useRouter();

            const state = reactive({
                list:[],
                loading: false,
                finished: false,
                pageNumber: 1,
                pageSize: 5,
            });
            //注册跳转组件


            const onLoad = async () => {
                console.log("load");
                const params = {
                    classification: props.classification,
                    category: props.category,
                    pageNum: state.pageNumber,
                    pageSize: 5,
                };
                const {data} = await getData(params);

                const results = data.list;

                state.list.push(...results);

                state.loading = false;

                if (results.length > 0){
                    state.pageNumber++;
                }else {
                    state.finished = true;
                }
            };
            //跳转详情页
            const secondDetail = (id) => {
                router.push('/Second/findTitle/' +id);
            }
            const onClick = () => {
                router.push('/publish/SecondHandMarket');
            }

            return {
                state,
                onLoad,
                onClick,
                secondDetail
            }; //return
        }, //setup
    }; // ex

</script>

<style>

    .cell-list {
        min-height: 100px;
    }
</style>
