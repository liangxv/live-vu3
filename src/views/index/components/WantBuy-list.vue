<template>
    <div>
        <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
            <van-row v-for="item in state.list" :key="item.id" style="border: 1px solid #f7f8f9;"
                @click="secondDetail(item.id)" class="van-haptics-feedback">

                <van-col span="16">
                    <van-tag plain type="primary" v-if="item.category = 1">二手出租</van-tag>
                    <van-tag plain type="warning" v-else>二手求购</van-tag>
                    <span class="van-ellipsis" style="font-size: 15px;">{{ item.title }}</span>
                </van-col>

                <span class="van-multi-ellipsis--l3" style="font-size: 15px;">{{ item.description }}</span>
                <van-col span="8">
                    <p style="font-size: 15px; text-align: left;">用户:某某以</p>
                </van-col>
                <van-col span="8">
                    <p style="font-size: 15px;">{{ item.createTime }}</p>
                </van-col>
                <van-col span="8">
                    <div style="font-size: 15px; text-align: right;  margin-right: auto">浏览量：{{ item.views }}</div>
                </van-col>
                <van-col span="8">
                    <div class="highlight">面议</div>
                </van-col>
            </van-row>
        </van-list>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { getData } from "../../../api/secondHand";
import { useRouter } from 'vue-router'

export default {
    props: {
        classification: Number,
        category: Number
    },

    setup(props) {
        //注册跳转组件
        const router = useRouter();
        const state = reactive({
            list: [],
            loading: false,
            finished: false,
            pageNumber: 1,
            pageSize: 5,
        });

        const onLoad = async () => {
            console.log("load");
            const params = {
                category: props.category,
                classification: props.classification,
                pageNum: state.pageNumber,
                pageSize: 5,
            };

            const { data } = await getData(params);
            const results = data.list;

            state.list.push(...results);

            state.loading = false;

            if (results.length > 0) {
                state.pageNumber++;
            } else {
                state.finished = true;
            }
        };
        //跳转到详情页
        const secondDetail = (id) => {
            router.push('/Second/findTitle/' + id);
        }
        const onClick = () => {
            router.push('/publish/SecondHandMarket')
        }
        return {
            state,
            onLoad,
            secondDetail,
            onClick,
        }
    }
}



</script>

<style scoped>
.highlight {
    font-size: 15px;
    text-align: right;
    margin-right: auto;
    color: red;
}
</style>