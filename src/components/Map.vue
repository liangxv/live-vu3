<template>
    <div class="map-container">
        <div ref="map" class="map"></div>
    </div>
    <NavBottom></NavBottom>
</template>

<script>
import NavBottom from '@/views/navbottom.vue';
    export default {
        name: 'BaiduMap',
        data() {
            return {
                mapLoaded: false,
                map: null
            }
        },
        mounted() {
            const AK = 'njlMfm9VjrmXhraHqmPYqEj9SdKOGZ93';
            this.loadMapScript(AK).then(() => {
                // 在地图脚本加载完成后初始化地图
                this.initMap();
            });
        },
        methods: {
            loadMapScript(AK) {
                return new Promise((resolve, reject) => {
                    if (window.BMap) {
                        // 如果已经加载过，则直接返回
                        resolve();
                    } else {
                        // 否则添加地图脚本标签到页面
                        const script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = `https://api.map.baidu.com/api?v=3.0&ak=${AK}&callback=onMapLoaded`;
                        script.onerror = reject;
                        document.body.appendChild(script);

                        // 添加全局回调函数，以检测地图脚本是否加载完成
                        window.onMapLoaded = () => {
                            this.mapLoaded = true;
                            resolve();
                        };
                    }
                });
            },
            initMap() {
                // 使用百度地图API创建地图
                this.map = new BMap.Map(this.$refs.map);
                const point = new BMap.Point(113.406851 ,23.198169);
                this.map.centerAndZoom(point, 15);
            }
        },
        watch: {
            mapLoaded(val) {
                // 如果地图脚本已经加载完成，则初始化地图
                if (val) {
                    this.initMap();
                }
            }
        }
    }
</script>

<style scoped>
    .map-container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .map {
        width: 100vh;
        height: 100vh;
    }
</style>